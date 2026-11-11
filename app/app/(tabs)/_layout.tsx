import { Tabs } from 'expo-router';
import { FloatingTabBar, TAB_META } from '@/components/FloatingTabBar';
import { useTheme } from '@/theme/ThemeProvider';

export default function TabsLayout() {
  const { t } = useTheme();
  return (
    <Tabs
      tabBar={(props) => <FloatingTabBar state={props.state} />}
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: t.bg } }}
    >
      {Object.entries(TAB_META).map(([name, meta]) => (
        <Tabs.Screen key={name} name={name} options={{ title: meta.title }} />
      ))}
    </Tabs>
  );
}
