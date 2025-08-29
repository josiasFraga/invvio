import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import FormLogin from '@components/Forms/FormLogin';
import Header from '@components/Header';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@rneui/themed';
import CustomSafeAreaView from '@components/SafeAreaView';
import AppTitle from '@components/Typography/AppTitle';
import AppText from '@components/Typography/AppText';
import globalStyles from '@styles/globalStyles';

const CenaLogin = () => {

  const { theme } = useTheme();
  const GlobalStyle = globalStyles(theme);
  const themedStyles = styles(theme);

  const navigation = useNavigation();
  const shouldShowBackButton = navigation.canGoBack();

  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={theme.statusBarStyle}
      />
      <CustomSafeAreaView style={{backgroundColor: theme.colors.background}} />
      
      <Header 
        backButton={shouldShowBackButton}
        titulo={''}
      />

      <ScrollView contentContainerStyle={themedStyles.contentContainer} style={{flex: 1}}>
        <View style={[themedStyles.formContainer, GlobalStyle.secureMargin]}>
          <AppTitle style={themedStyles.loginText}>Olá</AppTitle>
          <AppText style={[GlobalStyle.textMedium, themedStyles.welcomeText]}>Bem-vindo de volta!</AppText>
          <FormLogin />
        </View>

        <View style={[GlobalStyle.row, {justifyContent: 'center', alignContent: 'center', alignItems: 'center'}]}>
          <AppText style={themedStyles.registerPreText}>Ainda não tem cadastro? </AppText>
          <TouchableOpacity style={themedStyles.registerButton} onPress={() => navigation.navigate('PreCadastro')}>
            <AppText style={themedStyles.registerText}>cadastre-se</AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = (theme) => StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: theme.colors.background
  },
  formContainer: {
    padding: 20
  },
  loginText: {
    textAlign: 'center',
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 35,
    marginBottom: 15
  },
  welcomeText: {
    marginBottom: 20,
    fontSize: 17,
    color: theme.colors.textSecondary,
    textAlign: 'center'
  },
  registerButton: {
    marginVertical: 20,
    alignItems: 'center',
  },
  registerPreText: {
    fontSize: 15,
    color: theme.colors.textSecondary,
  },
  registerText: {
    color: theme.colors.textSecondary,
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default CenaLogin;
