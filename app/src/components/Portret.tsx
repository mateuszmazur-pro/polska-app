import { Image, Text, View, type ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
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
          style={{ position: 'absolute', width: img, height: img, left: size / 2 - (postac.twarz?.x ?? 0.45) * img, top: size / 2 - (postac.twarz?.y ?? 0.46) * img }}
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

/** Płynne przejście koloru tła w przezroczystość (do rozmywania krawędzi szkicu). */
export function Zanik({
  kierunek, kolor = PORTRET_BG, style, od = 0.5,
}: { kierunek: 'dol' | 'prawo'; kolor?: string; style: ViewStyle; od?: number }) {
  const id = `zanik-${kierunek}-${kolor.replace('#', '')}`;
  const pion = kierunek === 'dol';
  return (
    <Svg style={style} width="100%" height="100%" pointerEvents="none">
      <Defs>
        <LinearGradient id={id} x1="0" y1="0" x2={pion ? '0' : '1'} y2={pion ? '1' : '0'}>
          {pion ? (
            <>
              <Stop offset="0" stopColor={kolor} stopOpacity={0} />
              <Stop offset="0.45" stopColor={kolor} stopOpacity={0.55} />
              <Stop offset="0.9" stopColor={kolor} stopOpacity={1} />
            </>
          ) : (
            <>
              <Stop offset="0" stopColor={kolor} stopOpacity={1} />
              <Stop offset={String(od)} stopColor={kolor} stopOpacity={1} />
              <Stop offset="1" stopColor={kolor} stopOpacity={0} />
            </>
          )}
        </LinearGradient>
      </Defs>
      <Rect x="0" y="0" width="100%" height="100%" fill={`url(#${id})`} />
    </Svg>
  );
}
