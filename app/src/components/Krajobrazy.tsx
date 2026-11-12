import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Image, Text, View } from 'react-native';
import { krajobrazy } from '@/data/krajobrazy';
import { F } from '@/theme/fonts';

const POKAZ_MS = 7000;
const PRZEJSCIE_MS = 1600;
const CIEN = Array.from({ length: 16 }, (_, i) => 0.82 * Math.pow((i + 1) / 16, 1.6));

/**
 * Zdjęcie krajobrazu dopasowane do kafla (kadr wg ogniskowej) + przyciemniony dół pod napis.
 * Przy kilku zdjęciach — płynnie się zmieniają.
 */
export function Krajobrazy({ width, height, tlo }: { width: number; height: number; tlo: string }) {
  const [i, setI] = useState(0);
  const krycie = useRef(new Animated.Value(1)).current;
  const [bezRuchu, setBezRuchu] = useState(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setBezRuchu).catch(() => {});
  }, []);

  useEffect(() => {
    if (krajobrazy.length < 2 || bezRuchu) return;
    const id = setInterval(() => {
      Animated.timing(krycie, { toValue: 0, duration: PRZEJSCIE_MS / 2, useNativeDriver: true }).start(() => {
        setI((x) => (x + 1) % krajobrazy.length);
        Animated.timing(krycie, { toValue: 1, duration: PRZEJSCIE_MS / 2, useNativeDriver: true }).start();
      });
    }, POKAZ_MS);
    return () => clearInterval(id);
  }, [bezRuchu, krycie]);

  if (!krajobrazy.length || !width) return null;
  const k = krajobrazy[i];
  // „cover” z kadrem w pionie wg ogniskowej
  const skala = Math.max(width / (height * k.proporcje), 1);
  const imgW = width * skala;
  const imgH = imgW / k.proporcje;
  const top = Math.min(0, Math.max(height - imgH, height / 2 - (k.ogniskowa ?? 0.5) * imgH));

  return (
    <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }} pointerEvents="none">
      <Animated.View style={{ flex: 1, opacity: krycie }}>
        <Image source={k.src} style={{ position: 'absolute', width: imgW, height: imgH, left: (width - imgW) / 2, top }} />
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '65%' }}>
          {CIEN.map((o, j) => (
            <View key={j} style={{ flex: 1, backgroundColor: tlo, opacity: o }} />
          ))}
        </View>
        <Text style={{ position: 'absolute', right: 14, bottom: 12, fontFamily: F.bodySemi, fontSize: 10, color: 'rgba(246,242,232,0.7)' }}>{k.podpis}</Text>
      </Animated.View>
    </View>
  );
}
