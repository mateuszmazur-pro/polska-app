import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/Icon';
import { PORTRET_BG, Zanik } from '@/components/Portret';
import { Wkrotce } from '@/components/Wkrotce';
import { postacPoId } from '@/data/postacie';
import { F } from '@/theme/fonts';
import { useTheme } from '@/theme/ThemeProvider';

const ZAKLADKI = ['Życiorys', 'Kalendarium', 'Ciekawostki'] as const;

function OkraglyPrzycisk({ icon, label, onPress }: { icon: 'back' | 'bookmark' | 'share'; label: string; onPress?: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      hitSlop={4}
      style={({ pressed }) => ({
        width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center',
        backgroundColor: 'rgba(12,29,54,0.55)', borderWidth: 1, borderColor: 'rgba(246,242,232,0.18)', opacity: pressed ? 0.7 : 1,
      })}
    >
      <Icon name={icon} size={19} color="#F6F2E8" strokeWidth={icon === 'back' ? 2 : 1.9} />
    </Pressable>
  );
}

export default function PostacSzczegoly() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const postac = postacPoId(String(id));
  const { t } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { width: W } = useWindowDimensions();
  const [zakladka, setZakladka] = useState(0);

  if (!postac) return <Wkrotce wstecz nadtytul="Postacie" tytul="Nie znaleziono" opis="Tej postaci nie ma jeszcze w aplikacji." />;

  const naglowekH = Math.round(W * 1.385) + insets.top * 0.5;
  const portret = Math.round(W * 0.923);
  const [imie, ...reszta] = postac.imie.split(' ');
  const nazwisko = reszta.join(' ');

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 110 }}>
        {/* Nagłówek: szkic jako tło całej górnej części */}
        <View style={{ height: naglowekH, backgroundColor: PORTRET_BG, overflow: 'hidden' }}>
          {postac.portret ? (
            <Image
              source={postac.portret}
              accessibilityLabel={`Szkic portretu: ${postac.imie}`}
              style={{ position: 'absolute', width: portret, height: portret, left: (W - portret) / 2, top: insets.top + 30 }}
            />
          ) : (
            <Text style={{ position: 'absolute', top: naglowekH * 0.28, alignSelf: 'center', fontFamily: F.displayHeavy, fontSize: 120, color: '#1C3166' }}>
              {postac.inicjaly}
            </Text>
          )}
          <Zanik kierunek="dol" kolor={t.bg} style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 260 }} />

          <View style={{ position: 'absolute', left: 20, right: 20, top: insets.top + 8, flexDirection: 'row', justifyContent: 'space-between' }}>
            <OkraglyPrzycisk icon="back" label="Wróć" onPress={() => router.back()} />
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <OkraglyPrzycisk icon="bookmark" label="Zapisz" />
              <OkraglyPrzycisk icon="share" label="Udostępnij" />
            </View>
          </View>

          <View style={{ position: 'absolute', left: 20, right: 20, bottom: 4 }}>
            <Text style={{ fontFamily: F.bodyHeavy, fontSize: 11, letterSpacing: 1.8, color: t.accentText }}>{postac.lata.replace('–', ' – ')}</Text>
            <View accessible accessibilityRole="header" accessibilityLabel={postac.imie} style={{ marginTop: 8 }}>
              <Text style={{ fontFamily: F.display, fontSize: 34, lineHeight: 34, color: t.text }}>{nazwisko ? imie : ''}</Text>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.6}
                style={{ fontFamily: F.display, fontSize: 40, lineHeight: 42, marginTop: -2, color: t.accentText }}
              >
                {nazwisko || imie}
              </Text>
            </View>
          </View>
        </View>

        <Text style={{ marginTop: 2, marginHorizontal: 20, fontFamily: F.body, fontSize: 14, color: t.textMuted }}>{postac.opis ?? postac.rola}</Text>

        {/* Zakładki */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 8, marginTop: 20 }} accessibilityRole="tablist">
          {ZAKLADKI.map((z, i) => {
            const on = i === zakladka;
            return (
              <Pressable
                key={z}
                accessibilityRole="tab"
                accessibilityState={{ selected: on }}
                onPress={() => setZakladka(i)}
                style={{ height: 40, paddingHorizontal: 16, borderRadius: 20, justifyContent: 'center', backgroundColor: on ? t.chipOnBg : t.surface }}
              >
                <Text style={{ fontFamily: on ? F.bodyHeavy : F.bodySemi, fontSize: 13, color: on ? t.chipOnText : t.textSoft }}>{z}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={{ paddingHorizontal: 20, marginTop: 14 }}>
          {zakladka === 0 && (
            <Text style={{ marginTop: 4, fontFamily: F.body, fontSize: 15, lineHeight: 25, color: t.textSoft }}>
              {postac.zyciorys ?? 'Życiorys tej postaci pojawi się wkrótce.'}
            </Text>
          )}
          {zakladka === 1 &&
            (postac.kalendarium?.length ? (
              postac.kalendarium.map((e) => (
                <View key={e.rok + e.tekst} style={{ flexDirection: 'row', gap: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: t.border }}>
                  <Text style={{ width: 48, fontFamily: F.display, fontSize: 17, color: t.accentText }}>{e.rok}</Text>
                  <Text style={{ flex: 1, fontFamily: F.body, fontSize: 14, lineHeight: 21, color: t.textSoft }}>{e.tekst}</Text>
                </View>
              ))
            ) : (
              <Text style={{ fontFamily: F.body, fontSize: 15, color: t.textMuted }}>Kalendarium pojawi się wkrótce.</Text>
            ))}
          {zakladka === 2 &&
            (postac.ciekawostki?.length ? (
              postac.ciekawostki.map((c) => (
                <Text key={c} style={{ marginTop: 4, marginBottom: 10, fontFamily: F.body, fontSize: 15, lineHeight: 25, color: t.textSoft }}>{c}</Text>
              ))
            ) : (
              <Text style={{ fontFamily: F.body, fontSize: 15, color: t.textMuted }}>Ciekawostki pojawią się wkrótce.</Text>
            ))}
        </View>
      </ScrollView>

      {/* Pływający przycisk quizu */}
      <Pressable
        accessibilityRole="button"
        onPress={() => router.push('/quiz')}
        style={({ pressed }) => ({
          position: 'absolute', left: 20, right: 20, bottom: Math.max(insets.bottom, 12) + 12, height: 56, borderRadius: 28,
          backgroundColor: t.red, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
          shadowColor: '#000', shadowOpacity: 0.35, shadowRadius: 18, shadowOffset: { width: 0, height: 10 }, elevation: 10,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        })}
      >
        <Icon name="quiz" size={20} color={t.onRed} strokeWidth={1.9} />
        <Text style={{ fontFamily: F.bodyHeavy, fontSize: 15, color: t.onRed }}>Quiz: {postac.imie.split(' ').slice(-1)[0]}</Text>
      </Pressable>
    </View>
  );
}
