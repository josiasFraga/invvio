import { useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Icon, useTheme } from '@rneui/themed';
import CustomSafeAreaView from '@components/SafeAreaView';
import useLogout from '@hooks/useLogout';
import AppText from '@components/Typography/AppText';
import AppTitle from '@components/Typography/AppTitle';
import { useDispatch, useSelector } from 'react-redux';
import ThemeSelector from './components/ThemeSelector';
import globalStyles from '@styles/globalStyles'
import MenuItem from './components/MenuItem';
import { useNavigation } from '@react-navigation/native';

const CenaMenu = () => {
  const { theme } = useTheme();
  const logout = useLogout();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const themedStyles = styles(theme);
  const GlobalStyle = globalStyles(theme);

  const me = useSelector((state) => state.app.me);

  const getUserInfo = () => {
    dispatch({ type: 'GET_ME', payload: { } });
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  let list = [
    {
      name: 'Alterar Foto',
      icon: 'camera',
      iconType: 'font-awesome',
      iconSize: 19,
      onPress: () => {
        //openChooseModal();
      }
    },
    {
      name: 'Alterar Senha',
      icon: 'lock',
      iconType: 'font-awesome',
      iconSize: 21,
      onPress: () => {
        navigation.navigate('MudarSenha');
      }
    },
    {
      name: 'Sair',
      icon: 'sign-out',
      iconType: 'font-awesome',
      iconSize: 18,
      onPress: () => {
        logout();
      }
    }
  ];

  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle={theme.statusBarStyle}
      />
      <CustomSafeAreaView style={{ backgroundColor: theme.colors.background }} />

      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>


        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
        
          <View style={themedStyles.avatar}>
            <Icon name="person" type="material" size={64} color={theme.colors.textPrimary} />
          </View>
          <AppTitle style={{marginTop: 8}}>{me?.nickname}</AppTitle>        
          <AppText style={{color: theme.colors.textSecondary, marginTop: 0}}>{me?.email}</AppText>

        </View>

        <View style={GlobalStyle.secureMargin}>
          <AppText style={{fontWeight: 700, color: theme.colors.textSecondary, marginBottom: 10}}>Tema</AppText>
        </View>
        <ThemeSelector />

        <View style={GlobalStyle.secureMargin}>
          <AppText style={{fontWeight: 700, color: theme.colors.textSecondary, marginBottom: 10}}>Perfil</AppText>
          {list.map((item, index) => <MenuItem item={item} key={"menu_" + index} />)}          
        </View>


      </View>

    </>
  );
};

const styles = (theme) => StyleSheet.create({
  avatar: { width: 84, height: 84, borderRadius: 42, backgroundColor: theme.colors.backgroundTerciary, justifyContent: 'center', alignItems: 'center' },
});

export default CenaMenu;
