"""Dobiera do każdego miejsca do 3 zdjęć z Wikimedia Commons (tylko wolne licencje) z autorem i licencją.
Uruchamiane na GitHubie (workflow „Zdjęcia miejsc”). Wynik: app/src/data/zdjeciaMiejsc.json.

Zapytania zbiorcze (do 50 tytułów naraz) i przerwy między nimi, żeby nie przekroczyć limitów Wikimedia."""
import json, re, time, urllib.parse, urllib.request, urllib.error, html

UA = {'User-Agent': 'PolskaMojaOjczyzna/0.2 (aplikacja edukacyjna; https://github.com/mateuszmazur-pro/polska-app)'}
ZLE = re.compile(r'(map|mapa|herb|coat|logo|plan|flag|flaga|\.svg|diagram|schemat|location|lokalizacja|pieczęć|seal|signature|podpis|icon|ikona|commons-logo|wiki)', re.I)

def get(url, params):
    url += '?' + urllib.parse.urlencode(params)
    for proba in range(6):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=40) as r:
                time.sleep(1.0)
                return json.load(r)
        except urllib.error.HTTPError as e:
            czekaj = int(e.headers.get('Retry-After') or 0) or 10 * (proba + 1)
            print('  HTTP', e.code, '— czekam', czekaj, 's'); time.sleep(czekaj)
        except Exception as e:
            print('  błąd', e); time.sleep(5)
    return {}

def bez_html(s): return html.unescape(re.sub(r'<[^>]+>', '', s or '')).strip()

def licencja_ok(skrot):
    s = (skrot or '').lower().replace('-', ' ')
    if ' nc' in s or ' nd' in s: return False
    return s.startswith('cc by') or s.startswith('cc0') or 'public domain' in s or s.startswith('pd')

def paczki(lista, n=50):
    for i in range(0, len(lista), n): yield lista[i:i + n]

def strony(host, tytuly):
    """tytuł → (lead image, lista plików) dla jednej wiki, zbiorczo."""
    wynik = {}
    for p in paczki(tytuly):
        d = get(f'https://{host}/w/api.php', {'action': 'query', 'titles': '|'.join(p), 'redirects': 1, 'prop': 'images|pageimages',
                                              'imlimit': 'max', 'piprop': 'name', 'format': 'json', 'formatversion': 2})
        q = d.get('query', {})
        mapa = {t: t for t in p}
        for n in q.get('normalized', []) + q.get('redirects', []):
            for k, v in list(mapa.items()):
                if v == n['from']: mapa[k] = n['to']
        po = {s.get('title'): s for s in q.get('pages', [])}
        for orig, kon in mapa.items():
            s = po.get(kon)
            if not s or s.get('missing'): continue
            pliki = [i['title'].split(':', 1)[1] for i in s.get('images', []) if 'title' in i]
            lead = s.get('pageimage')
            if lead:
                lead = lead.replace('_', ' ')
                pliki = [lead] + [f for f in pliki if f != lead]
            wynik[orig] = pliki
    return wynik

def szukaj(nazwa, miasto):
    d = get('https://pl.wikipedia.org/w/api.php', {'action': 'query', 'list': 'search', 'srsearch': f'{nazwa} {miasto}', 'srlimit': 1, 'format': 'json'})
    hits = d.get('query', {}).get('search', [])
    return hits[0]['title'] if hits else None

miejsca = json.load(open('scripts/miejsca_wiki.json', encoding='utf-8'))
cel = {}
for m in miejsca:
    if m['wiki']:
        host = m['wiki'].split('/')[2]; t = urllib.parse.unquote(m['wiki'].split('/wiki/')[1]).replace('_', ' ')
        cel[m['id']] = (host, t)

pliki_miejsca = {}
for host in {h for h, _ in cel.values()}:
    tyt = [t for h, t in cel.values() if h == host]
    s = strony(host, tyt)
    for mid, (h, t) in cel.items():
        if h == host and s.get(t): pliki_miejsca[mid] = s[t]

# brakujące strony: wyszukiwarka pl.wikipedii
for m in miejsca:
    if m['id'] in pliki_miejsca: continue
    t = szukaj(m['nazwa'], m['miasto'])
    if t:
        s = strony('pl.wikipedia.org', [t])
        if s.get(t): pliki_miejsca[m['id']] = s[t]
    print('wyszukane:', m['id'], '→', t)

kandydaci = {mid: [f for f in fl if not ZLE.search(f) and f.lower().endswith(('.jpg', '.jpeg'))][:10] for mid, fl in pliki_miejsca.items()}
wszystkie = sorted({f for fl in kandydaci.values() for f in fl})
info = {}
for p in paczki(wszystkie):
    d = get('https://commons.wikimedia.org/w/api.php', {'action': 'query', 'titles': '|'.join('File:' + f for f in p), 'prop': 'imageinfo',
            'iiprop': 'url|extmetadata|size|mime', 'iiurlwidth': 900, 'format': 'json', 'formatversion': 2})
    for s in d.get('query', {}).get('pages', []):
        ii = (s.get('imageinfo') or [None])[0]
        if not ii or ii.get('mime') != 'image/jpeg' or ii.get('width', 0) < 800: continue
        meta = ii.get('extmetadata', {})
        lic = meta.get('LicenseShortName', {}).get('value', '')
        if not licencja_ok(lic): continue
        nazwa = s['title'].split(':', 1)[1]
        info[nazwa] = {'url': ii.get('thumburl') or ii['url'], 'autor': (bez_html(meta.get('Artist', {}).get('value', '')) or 'nieznany autor')[:80],
                       'licencja': lic, 'licencjaUrl': meta.get('LicenseUrl', {}).get('value', ''), 'strona': ii.get('descriptionurl', '')}

wynik, braki = {}, []
for m in miejsca:
    lista = [info[f] for f in kandydaci.get(m['id'], []) if f in info][:3]
    if lista: wynik[m['id']] = lista
    else: braki.append(m['id'])
json.dump(wynik, open('app/src/data/zdjeciaMiejsc.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('miejsc ze zdjęciami:', len(wynik), '/', len(miejsca), '· bez zdjęć:', braki)
