import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Image, View, type ViewStyle } from 'react-native';
import { ornamenty } from '@/data/ornamenty';
import { useTheme } from '@/theme/ThemeProvider';

const POKAZ_MS = 6000;
const PRZEJSCIE_MS = 1400;

/** Tło z ornamentami ludowymi: kolejne wzory płynnie się przenikają. Bez ornamentów — nic nie rysuje. */
export function Ornamenty({ style }: { style: ViewStyle }) {
  const { t } = useTheme();
  const [i, setI] = useState(0);
  const krycie = useRef(new Animated.Value(1)).current;
  const [bezRuchu, setBezRuchu] = useState(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setBezRuchu).catch(() => {});
  }, []);

  useEffect(() => {
    if (ornamenty.length < 2 || bezRuchu) return;
    const id = setInterval(() => {
      Animated.timing(krycie, { toValue: 0, duration: PRZEJSCIE_MS / 2, useNativeDriver: true }).start(() => {
        setI((x) => (x + 1) % ornamenty.length);
        Animated.timing(krycie, { toValue: 1, duration: PRZEJSCIE_MS / 2, useNativeDriver: true }).start();
      });
    }, POKAZ_MS);
    return () => clearInterval(id);
  }, [bezRuchu, krycie]);

  if (ornamenty.length === 0) return null;
  const o = ornamenty[i];
  const kolorWzoru = t.statusBar === 'light' ? '#1B3A6B' : '#E9DFCC';

  return (
    <View style={style} pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no">
      <Animated.View style={{ flex: 1, opacity: krycie }}>
        <Image
          source={o.src}
          resizeMode="cover"
          style={{ width: '100%', height: '100%', opacity: o.jednobarwny ? 1 : 0.14, tintColor: o.jednobarwny ? kolorWzoru : undefined }}
        />
      </Animated.View>
    </View>
  );
}
