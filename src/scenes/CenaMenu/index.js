import React from 'react';
import { Pressable, StatusBar, View } from 'react-native';
import { useTheme } from '@rneui/themed';
import CustomSafeAreaView from '@components/SafeAreaView';
import useLogout from '@hooks/useLogout';
import AppText from '@components/Typography/AppText';

const CenaMenu = () => {
  const { theme } = useTheme();
  const logout = useLogout();

  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle={theme.statusBarStyle}
      />
      <CustomSafeAreaView style={{ backgroundColor: theme.colors.background }} />

      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <AppText style={{color: theme.colors.primary, fontSize: 22, fontWeight: '700'}}>Perfil</AppText>
        <AppText style={{color: theme.colors.text, marginTop: 8}}>E-mail: aaa</AppText>
        <AppText style={{color: theme.colors.text, marginTop: 4}}>Apelido: aaaa</AppText>

        <Pressable onPress={() => logout()} style={{marginTop: 20, backgroundColor: theme.colors.primary, padding: 12, borderRadius: 10, alignItems: 'center'}}>
          <AppText style={{color: '#fff', fontWeight: '700'}}>Sair</AppText>
        </Pressable>
      </View>

    </>
  );
};

export default CenaMenu;
