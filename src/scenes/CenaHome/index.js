import { StyleSheet, View, StatusBar } from 'react-native';
import { Icon, Image, useTheme } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';

import Header from '@components/Header';
import IMAGES from '@constants/images';
import CustomSafeAreaView from '@components/SafeAreaView';
import ConfirmButton from '@components/Buttons/ConfirmButton';
import globalStyles from '@styles/globalStyles';

const CenaHome = ({ navigation, route }) => {
  const { theme } = useTheme();
  const GlobalStyle = globalStyles(theme)
  const { showVisitantButton } = route?.params || {};
  const s = styles(theme);

  return (
    <LinearGradient
      colors={
        theme.mode === 'dark'
          ? [theme.colors.backgroundSecondary, theme.colors.backgroundSecondary, '#555']
          : [theme.colors.background, theme.colors.backgroundTerciary]
      }
      style={s.gradient}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle={theme.statusBarStyle} />

      {showVisitantButton !== undefined && !showVisitantButton && (
        <>
          <CustomSafeAreaView />
          <Header backButton titulo="Login" styles={{ backgroundColor: 'transparent' }} />
        </>
      )}

      <View style={s.logoBox}>
        <Image
          source={theme.mode === 'dark' ? IMAGES.LOGO : IMAGES.LOGO}
          style={s.logo}
          resizeMode="contain"
        />
      </View>

      <View style={s.buttonsBox}>
        <Btn
          title="ENTRAR COM SEU E-MAIL"
          icon={<EmailIcon color={theme.colors.buttonText} />}
          onPress={() => navigation.navigate('Login')}
        />

		<View style={GlobalStyle.spaceSmall} />
        <Btn
          title="CRIAR UMA CONTA"
          icon={<PlusIcon color={theme.colors.buttonText} />}
          onPress={() => navigation.navigate('Cadastro')}
        />
      </View>

      <CustomSafeAreaView style={{backgroundColor: 'transparent'}} />
    </LinearGradient>
  );
};

const Btn = ({ title, icon, onPress }) => (
  <ConfirmButton
    type="solid"
    icon={<View style={{ marginRight: 18 }}>{icon}</View>}
    buttonTitle={title}
    onPress={onPress}
  />
);

/* --- Ícones isolados p/ legibilidade ------------------------------ */
const EmailIcon   = ({ color }) => <Icon name="email"       type="entypo"        size={18}  iconStyle={{ color }} />;
const PlusIcon    = ({ color }) => <Icon name="user-plus"   type="font-awesome"  size={20}  iconStyle={{ color }} />;

/* --- Styles ------------------------------------------------------- */
const styles = (theme) => StyleSheet.create({
  gradient: { flex: 1 },
  logoBox: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 240,
    height: 160,
  },
  buttonsBox: {
    paddingHorizontal: 15,
    flex: 2,
    justifyContent: 'flex-end',
  },
});

export default CenaHome;
