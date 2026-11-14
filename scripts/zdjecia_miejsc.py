"""Dobiera do każdego miejsca do 3 zdjęć z Wikimedia Commons (tylko wolne licencje) z autorem i licencją.
Uruchamiane na GitHubie (workflow „Zdjęcia miejsc”). Wynik: app/src/data/zdjeciaMiejsc.json."""
import json, re, time, urllib.parse, urllib.request, html

UA = {'User-Agent': 'PolskaMojaOjczyzna/0.2 (aplikacja edukacyjna; github.com/mateuszmazur-pro/polska-app)'}
ZLE = re.compile(r'(map|mapa|herb|coat|logo|plan|flag|flaga|svg|diagram|schemat|location|lokalizacja|pieczęć|seal|signature|podpis)', re.I)

def get(url, params=None):
    if params: url += '?' + urllib.parse.urlencode(params)
    for proba in range(3):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30) as r:
                return json.load(r)
        except Exception as e:
            if proba == 2: print('  błąd', url[:120], e); return None
            time.sleep(2)

def bez_html(s): return html.unescape(re.sub(r'<[^>]+>', '', s or '')).strip()

def licencja_ok(skrot):
    s = (skrot or '').lower()
    if 'nc' in s.replace('-', ' ').split() or 'nd' in s.replace('-', ' ').split(): return False
    return s.startswith('cc by') or s.startswith('cc0') or 'public domain' in s or s.startswith('pd')

def tytul_z_url(url):
    host = url.split('/')[2]; t = urllib.parse.unquote(url.split('/wiki/')[1])
    return host, t

def szukaj(nazwa, miasto):
    d = get('https://pl.wikipedia.org/w/api.php', {'action': 'query', 'list': 'search', 'srsearch': f'{nazwa} {miasto}', 'srlimit': 1, 'format': 'json'})
    hits = (d or {}).get('query', {}).get('search', [])
    return ('pl.wikipedia.org', hits[0]['title']) if hits else None

def zdjecia(host, tytul):
    d = get(f'https://{host}/api/rest_v1/page/media-list/' + urllib.parse.quote(tytul.replace(' ', '_'), safe=''))
    if not d: return None
    pliki = [i['title'] for i in d.get('items', []) if i.get('type') == 'image']
    return pliki

def info(plik):
    nazwa = plik.split(':', 1)[1]
    d = get('https://commons.wikimedia.org/w/api.php', {'action': 'query', 'titles': 'File:' + nazwa, 'prop': 'imageinfo',
            'iiprop': 'url|extmetadata|size|mime', 'iiurlwidth': 900, 'format': 'json'})
    try:
        p = next(iter(d['query']['pages'].values())); ii = p['imageinfo'][0]
    except Exception:
        return None
    if ii.get('mime') != 'image/jpeg' or ii.get('width', 0) < 800: return None
    m = ii.get('extmetadata', {})
    lic = m.get('LicenseShortName', {}).get('value', '')
    if not licencja_ok(lic): return None
    autor = bez_html(m.get('Artist', {}).get('value', '')) or 'nieznany autor'
    return {'url': ii.get('thumburl') or ii['url'], 'autor': autor[:80], 'licencja': lic,
            'licencjaUrl': m.get('LicenseUrl', {}).get('value', ''), 'strona': ii.get('descriptionurl', '')}

wynik, braki = {}, []
for m in json.load(open('scripts/miejsca_wiki.json', encoding='utf-8')):
    cel = tytul_z_url(m['wiki']) if m['wiki'] else None
    pliki = zdjecia(*cel) if cel else None
    if not pliki:
        cel = szukaj(m['nazwa'], m['miasto']); pliki = zdjecia(*cel) if cel else None
    lista = []
    for plik in (pliki or [])[:12]:
        if ZLE.search(plik): continue
        z = info(plik)
        if z: lista.append(z)
        if len(lista) == 3: break
        time.sleep(0.2)
    print(m['id'], cel and cel[1], len(lista))
    if lista: wynik[m['id']] = lista
    else: braki.append(m['id'])
json.dump(wynik, open('app/src/data/zdjeciaMiejsc.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('miejsc ze zdjęciami:', len(wynik), '· bez zdjęć:', braki)
