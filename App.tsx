import { StatusBar, StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { useSelector, Provider } from 'react-redux';
import store from './store';
import { lightTheme, darkTheme } from '@constants/themes';
import { ThemeProvider } from '@rneui/themed';
import {SheetProvider} from 'react-native-actions-sheet';
import Toast from 'react-native-toast-message';
import ToastConfig from '@constants/toastConfig';
import Routes from '@constants/routes';
import '@components/Sheets';

const ThemedApp = () => {
	const currentTheme = useSelector((state) => state.theme.currentTheme);
	const theme = currentTheme === 'dark' ? darkTheme : lightTheme;
	return (
		<ThemeProvider theme={theme}>
			<SheetProvider>
			<KeyboardAvoidingView
				style={{ flex: 1, backgroundColor: theme.colors.background }}
				behavior={Platform.OS === 'ios' ? 'padding' : undefined} // Ajuste o comportamento para iOS e Android
				keyboardVerticalOffset={0}
			>
			<Routes />
			</KeyboardAvoidingView>
			<Toast config={ToastConfig(theme)} />
			</SheetProvider>
		</ThemeProvider>
	);
};

function App() {
  return (
		<View style={styles.container}>
		<Provider store={store}>
		<ThemedApp />
		</Provider>
		</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
