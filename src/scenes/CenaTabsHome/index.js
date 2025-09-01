import { useEffect, useMemo } from 'react';
import { FlatList, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useTheme, Icon } from '@rneui/themed';
import CustomSafeAreaView from '@components/SafeAreaView';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@components/Buttons/IconButton';
import { useNavigation } from '@react-navigation/native';

const CenaTabsHome = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { theme } = useTheme();

  const me = useSelector((state) => state.app.me);

  const palette = useMemo(() => ({
    background: theme.colors?.background ?? '#FFFFFF',
    primary: theme.colors?.primary ?? '#0a6265',
    secondary: theme.colors?.secondary ?? '#FFFFFF',
    ternary: theme.colors?.grey5 ?? '#F3F4F6',
    textPrimary: theme.colors?.black ?? '#1F2937',
    textSecondary: theme.colors?.grey2 ?? '#4B5563',
  }), [theme.colors]);

  const styled = useMemo(() => styles(palette), [palette]);

  const itens = [
    { id: 2, name: 'Pagar', icon: { name: 'payment', type: 'material' } },
    { id: 3, name: 'Transferir', icon: { name: 'swap-horiz', type: 'material' } },
    { id: 4, name: 'Depositar', icon: { name: 'account-balance', type: 'material' } },
    { id: 6, name: 'Cobrar', icon: { name: 'request-quote', type: 'material' } },
  ];

  const dataInfo = [{ id: 1 }, { id: 2 }];

  const getUserInfo = () => {
    dispatch({ type: 'GET_ME', payload: { } });
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  console.log('ME:', me);

  return (
    <View style={styled.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle={'light-content'} />
      <CustomSafeAreaView style={{ backgroundColor: palette.primary }} />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}>
        {/* TOP */}
        <View style={styled.top}>
          <View style={styled.topInner}>
            <View style={styled.iconsRow}>
              <View style={styled.avatar}>
                <Icon name="person" type="material" size={32} color="#fff" />
              </View>
              <View style={styled.iconGroup}>
                <Icon name="visibility-off" type="material" color="#fff" />
              </View>
            </View>
            <Text style={styled.welcomeText}>Olá, {me?.nickname}</Text>
          </View>
        </View>

        {/* MAIN */}
        <View style={styled.main}>

          <View>
            {/* Saldo */}
            <View style={styled.moneyBox}>
              <Text style={styled.accountLabel}>Saldo em conta</Text>
              <Text style={styled.moneyText}>{me?.balance}</Text>
            </View>

            {/* Menu horizontal */}
            <FlatList
              data={itens}
              keyExtractor={(item) => String(item.id)}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styled.horizontalContent}
              renderItem={({ item }) => (
                <IconButton 
                onPress={() => {
                  navigation.navigate(item.name);
                }}
                title={item.name}
                iconName={item.icon.name}
                iconFamily={item.icon.type}
                  
                />
              )}
            />

            <View style={styled.divider} />

          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = (p) => StyleSheet.create({
  container: { flex: 1, backgroundColor: p.background },
  top: { paddingBottom: 30, backgroundColor: p.primary },
  topInner: { paddingHorizontal: 15 },
  iconsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  avatar: { width: 52, height: 52, borderRadius: 50, backgroundColor: 'rgba(255,255,255,0.13)', justifyContent: 'center', alignItems: 'center' },
  iconGroup: { flexDirection: 'row', justifyContent: 'space-between' },
  welcomeText: { color: '#fff', fontSize: 18, fontWeight: '700', marginTop: 40 },
  main: { flex: 1, backgroundColor: p.backgroundTerciary },
  moneyBox: { marginVertical: 30, paddingHorizontal: 15 },
  accountLabel: { color: p.textPrimary, fontSize: 18, fontWeight: '500' },
  moneyText: { color: p.textPrimary, fontSize: 28, fontWeight: '700', marginTop: 5 },
  horizontalContent: { paddingHorizontal: 16, gap: 12 },
  cardRow: { width: '100%', height: 70, marginTop: 30, justifyContent: 'center', alignItems: 'center' },
  cardInner: { backgroundColor: p.ternary, width: '84%', height: '100%', flexDirection: 'row', alignItems: 'center', borderRadius: 12, paddingLeft: 12 },
  cardText: { fontSize: 16, fontWeight: '500', marginLeft: 6, color: p.textPrimary },
  divider: { marginVertical: 30, width: '100%', height: 2, backgroundColor: p.ternary },
  creditCardBox: { marginHorizontal: 30, marginBottom: 30 },
  creditTitle: { fontSize: 24, fontWeight: '600', marginTop: 8, marginBottom: 14, color: p.textPrimary },
  creditDesc: { fontSize: 14, fontWeight: '500', marginBottom: 14, width: '78%', color: p.textSecondary },
  discoverTitle: { fontSize: 18, fontWeight: '700', marginLeft: 30, color: p.textPrimary },
});

export default CenaTabsHome;
