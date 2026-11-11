import { Tabs } from 'expo-router';
import { Icon, type IconName } from '@/components/Icon';
import { F } from '@/theme/fonts';
import { useTheme } from '@/theme/ThemeProvider';

const TABS: { name: string; title: string; icon: IconName }[] = [
  { name: 'index', title: 'Start', icon: 'home' },
  { name: 'odkrywaj', title: 'Odkrywaj', icon: 'compass' },
  { name: 'os-czasu', title: 'Oś czasu', icon: 'timeline' },
  { name: 'mapa', title: 'Mapa', icon: 'pin' },
  { name: 'wyzwania', title: 'Wyzwania', icon: 'trophy' },
];

export default function TabsLayout() {
  const { t } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: t.active,
        tabBarInactiveTintColor: t.textMuted,
        tabBarStyle: { backgroundColor: t.tabBar, borderTopColor: t.border, borderTopWidth: 1 },
        tabBarLabelStyle: { fontFamily: F.bodyBold, fontSize: 11 },
        sceneStyle: { backgroundColor: t.bg },
      }}
    >
      {TABS.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color }) => <Icon name={tab.icon} color={color} size={22} />,
          }}
        />
      ))}
    </Tabs>
  );
}
