import { View } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';

/**
 * Tło co drugiego wiersza listy: cień przy lewej krawędzi, zanikający w prawo
 * (wariant F). Zbudowany z pasków — działa tak samo na Androidzie i iOS.
 */
export function PasekListy() {
  const { t } = useTheme();
  const N = 20;
  return (
    <View pointerEvents="none" style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, flexDirection: 'row' }}>
      {Array.from({ length: N }, (_, i) => {
        const x = (i + 0.5) / N;
        const k = x >= 0.85 ? 0 : t.pasekKrycie * Math.pow(1 - x / 0.85, 1.2);
        return <View key={i} style={{ flex: 1, backgroundColor: t.pasek, opacity: k }} />;
      })}
    </View>
  );
}
