import { useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Avatar, Icon, useTheme } from '@rneui/themed';
import CustomSafeAreaView from '@components/SafeAreaView';
import useLogout from '@hooks/useLogout';
import AppText from '@components/Typography/AppText';
import AppTitle from '@components/Typography/AppTitle';
import { useDispatch, useSelector } from 'react-redux';
import ThemeSelector from './components/ThemeSelector';
import globalStyles from '@styles/globalStyles'
import MenuItem from './components/MenuItem';
import { useNavigation } from '@react-navigation/native';
import { SheetManager } from 'react-native-actions-sheet';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';

const options = {
  mediaType: 'photo',
  quality: 0.4,
};

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

  const sendImage = (source) => {
    dispatch({ 
      type: 'CHANGE_PROFILE_IMAGE', 
      payload: { 
        photo: source,
        callbackSuccess: (response) => {
          Toast.show({
            type: 'success',
            text1: 'Tudo Certo',
            text2: 'Foto de perfil alterada com sucesso',
            position: 'bottom',
          });
          getUserInfo();
        },
        callbackError: (response) => {
          Toast.show({
            type: 'error',
            text1: 'Erro',
            text2: response.errorData?.message || response.errorData || 'Erro desconhecido',
            position: 'bottom',
          });
        },
        callbackFinally: () => {
          console.log('Finalizando alteração de foto de perfil');
        }
      }
    });
  }

  const chooseImage = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const { fileName, type, uri } = response.assets[0];
        const source = { uri, type, name: fileName };
        sendImage(source);
      }
    });
  }

  const pickImage = () => {
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera picker');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        const { fileName, type, uri } = response.assets[0];
        const source = { uri, type, name: fileName };
        sendImage(source);
      }
    });
  }

  let list = [
    {
      name: 'Alterar Foto',
      icon: 'camera',
      iconType: 'font-awesome',
      iconSize: 19,
      onPress: () => {
        SheetManager.show('choose-image-sheet', { payload: { chooseImageFunc: chooseImage, pickImageFunc: pickImage } })
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

          {!me?.photoUrl ? 
            <View style={themedStyles.avatar}><Icon name="person" type="material" size={64} color={theme.colors.textPrimary} /></View> : 
            <Avatar source={{ uri: me.photoUrl }} size={64} rounded />
          }

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
