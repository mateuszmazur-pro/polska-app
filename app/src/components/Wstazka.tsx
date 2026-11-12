import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type Props = {
  width: number;
  height: number;
  /** Szerokość wstążki w px */
  grubosc?: number;
  /** Czy wstążka ma powiewać (wyłączane automatycznie przy „ogranicz ruch”) */
  animuj?: boolean;
  bialy?: string;
  czerwony?: string;
};

const KROKI = 72;

/**
 * Biało-czerwona wstążka rysowana wektorowo.
 * Środek faluje, a szerokość zmienia znak — w tych miejscach wstążka „przekręca się”
 * i kolory zamieniają się stronami, jak prawdziwa szarfa na wietrze.
 */
export function Wstazka({ width, height, grubosc = 16, animuj = true, bialy = '#F6F2E8', czerwony = '#C8102E' }: Props) {
  const [t, setT] = useState(0);
  const [bezRuchu, setBezRuchu] = useState(false);
  const start = useRef(Date.now());

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setBezRuchu).catch(() => {});
  }, []);

  useEffect(() => {
    if (!animuj || bezRuchu) return;
    let raf = 0;
    let ostatnio = 0;
    const klatka = (teraz: number) => {
      if (teraz - ostatnio > 33) {
        // ~30 klatek/s wystarczy do spokojnego falowania
        ostatnio = teraz;
        setT((Date.now() - start.current) / 1000);
      }
      raf = requestAnimationFrame(klatka);
    };
    raf = requestAnimationFrame(klatka);
    return () => cancelAnimationFrame(raf);
  }, [animuj, bezRuchu]);

  const gora: string[] = [];
  const srodek: string[] = [];
  const dol: string[] = [];
  const amp = height * 0.26;
  for (let i = 0; i <= KROKI; i++) {
    const u = i / KROKI;
    const x = -8 + u * (width + 16);
    // linia środka: dwie nałożone fale + lekkie wznoszenie w prawo
    const y =
      height * 0.58 -
      u * height * 0.16 +
      amp * Math.sin(2 * Math.PI * u * 1.15 + t * 0.9) +
      amp * 0.35 * Math.sin(2 * Math.PI * u * 0.45 - t * 0.55);
    // skręt: połowa szerokości zmienia znak
    const h = (grubosc / 2) * Math.cos(2 * Math.PI * u * 1.7 + t * 1.2 + 0.6);
    gora.push(`${x.toFixed(1)},${(y - h).toFixed(1)}`);
    srodek.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    dol.push(`${x.toFixed(1)},${(y + h).toFixed(1)}`);
  }
  const bialaCzesc = `M${gora.join(' L')} L${[...srodek].reverse().join(' L')} Z`;
  const czerwonaCzesc = `M${srodek.join(' L')} L${[...dol].reverse().join(' L')} Z`;

  return (
    <Svg width={width} height={height} accessibilityElementsHidden importantForAccessibility="no">
      <Path d={czerwonaCzesc} fill={czerwony} />
      <Path d={bialaCzesc} fill={bialy} />
    </Svg>
  );
}
