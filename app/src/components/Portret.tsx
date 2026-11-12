import { Image, Text, View, type ViewStyle } from 'react-native';
import type { Postac } from '@/data/postacie';
import { F } from '@/theme/fonts';
import { useTheme } from '@/theme/ThemeProvider';

/** Tło szkiców — to samo we wszystkich motywach („okno do muzeum”). */
export const PORTRET_BG = '#0C1D36';
const ZLOTO_JASNE = '#E2C47A';

/**
 * Okrągły „profilowy” wycięty z szkicu (twarz + włosy).
 * Kadr szkicu jest stały, więc wystarczy przeskalować i przesunąć ten sam plik.
 */
export function PortretAvatar({ postac, size = 52 }: { postac: Postac; size?: number }) {
  const { t } = useTheme();
  const img = size * 1.4; // kadr: cała twarz z włosami i odrobiną tła
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no"
      style={{ width: size, height: size, borderRadius: size / 2, overflow: 'hidden', backgroundColor: PORTRET_BG, borderWidth: 1.5, borderColor: t.name === 'biel' ? 'rgba(92,97,112,0.28)' : 'rgba(201,207,218,0.28)', alignItems: 'center', justifyContent: 'center' }}
    >
      {postac.portret ? (
        <Image
          source={postac.portret}
          style={{ position: 'absolute', opacity: 0.78, width: img, height: img, left: size / 2 - (postac.twarz?.x ?? 0.45) * img, top: size / 2 - (postac.twarz?.y ?? 0.46) * img }}
        />
      ) : (
        <Text style={{ fontFamily: F.display, fontSize: size * 0.33, color: ZLOTO_JASNE }}>{postac.inicjaly}</Text>
      )}
    </View>
  );
}

/** Portret w prostokątnej karcie: postać przy prawej krawędzi, ramiona ucięte dołem. */
export function PortretWKarcie({ postac, width, height }: { postac: Postac; width: number; height: number }) {
  const size = height * 1.0;
  if (!postac.portret) {
    return (
      <View
        style={{ position: 'absolute', right: 20, bottom: 0, width: height * 0.68, height: height * 0.82, borderTopLeftRadius: height, borderTopRightRadius: height, borderWidth: 1.5, borderBottomWidth: 0, borderColor: '#3A4A78', borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center' }}
      >
        <Text style={{ fontFamily: F.display, fontSize: 36, color: '#5E6C8F' }}>{postac.inicjaly}</Text>
      </View>
    );
  }
  return (
    <>
      <Image source={postac.portret} style={{ position: 'absolute', width: size, height: size, left: width - size * 0.93, top: height * 0.04 }} />
      <Zanik kierunek="prawo" style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: width * 0.45 }} />
    </>
  );
}

/**
 * Płynne przejście koloru tła w przezroczystość (do rozmywania krawędzi szkicu).
 * Zbudowane z cienkich pasków o rosnącym kryciu — działa jednakowo na Androidzie i iOS.
 */
export function Zanik({
  kierunek, kolor = PORTRET_BG, style, od = 0.5,
}: { kierunek: 'dol' | 'prawo'; kolor?: string; style: ViewStyle; od?: number }) {
  const N = 24;
  const pion = kierunek === 'dol';
  const paski = Array.from({ length: N }, (_, i) => {
    const t = (i + 0.5) / N; // 0 → 1 wzdłuż kierunku
    let krycie: number;
    if (pion) {
      // od góry przezroczyście, na dole pełny kolor
      krycie = t < 0.9 ? Math.pow(t / 0.9, 1.6) : 1;
    } else {
      // od lewej pełny kolor, do „od” pełny, potem zanika do zera
      krycie = t <= od ? 1 : Math.pow(1 - (t - od) / (1 - od), 1.4);
    }
    return krycie;
  });
  return (
    <View style={[style, { flexDirection: pion ? 'column' : 'row' }]} pointerEvents="none">
      {paski.map((k, i) => (
        <View key={i} style={{ flex: 1, backgroundColor: kolor, opacity: k }} />
      ))}
    </View>
  );
}
