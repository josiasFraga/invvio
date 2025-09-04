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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { OneSignal } from 'react-native-onesignal';

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
		const saveNotificationsID = async () => {
		console.log('[saveNotificationsID]');
		const id = await OneSignal.User.pushSubscription.getIdAsync();
		console.log('-> notification_id - ' + id);
		await AsyncStorage.setItem('notifications', id);
	};

	useEffect(() => {
		console.log('[Component did Mount]');

		OneSignal.initialize("a3b1329d-9f12-48ca-85e4-8cdccb7cbf64");
		OneSignal.Notifications.requestPermission(true);

		const handleNotificationClick = (notification:any) => {
			console.log("OneSignal: notification opened:", notification);
			const additionalData = notification.notification.additionalData;
			const notificationId = notification.notification.notificationId;
			
			/*store.dispatch({
				type: 'CHECK_NOTIFICATION',
				payload: { 
					id: notificationId
				}
			});

			setTimeout(()=>{
				store.dispatch({ type: 'GET_NUMBER_NOTIFICATIONS_NOT_READ' });
			},1000);*/

			if ( additionalData.motivo === 'agendamento_empresa' ) {

				/*const params = {
					id: additionalData.registro_id,
					appointment_time: additionalData.agendamento_horario
				};
				console.log('-> Indo para tela de agendamentos');
				console.log(params);
				const uniqueKey = `MeusAgendamentos-${Date.now()}`;
				setTimeout(()=>{
					navigate('MeusAgendamentos', { ...params, key: uniqueKey });
				}, delay_open_notification)*/
			} 

		};

		OneSignal.Notifications.addEventListener('click', handleNotificationClick);
		OneSignal.Notifications.addEventListener('foregroundWillDisplay', (event) => {
			event.preventDefault();
			event.getNotification().display();
			//store.dispatch({ type: 'GET_NUMBER_NOTIFICATIONS_NOT_READ' });
		});
		OneSignal.Notifications.addEventListener('permissionChange', (granted) => {
			console.log('OneSignal: permission changed:', granted);
			if (granted) {
				saveNotificationsID();
			}
		});

		saveNotificationsID();

		return () => {
			//OneSignal.clearHandlers();
		};
	}, []);

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
