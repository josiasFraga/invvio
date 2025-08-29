import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { Icon, useTheme } from '@rneui/themed';
import * as yup from 'yup';
import { pt } from 'yup-locale-pt';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import ConfirmButton from '@components/Buttons/ConfirmButton';
import { useAuthHelpers } from '@hooks/useAuthHelpers';

import FieldTextInputNew from '@components/Forms/Fields/FieldTextInputNew';
import globalStyles from '@styles/globalStyles';

yup.setLocale(pt);

const FormLogin = () => {

	const dispatch = useDispatch();
	const route = useRoute();
	const navigation = useNavigation();
	const isRequesting = useSelector(state => state.appReducer.is_requesting);

	const { theme } = useTheme();
	const themedStyles = styles(theme);
    const GlobalStyle = globalStyles(theme);
	
	const [isBiometricAuthEnableInDevice, setIsBiometricAuthEnableInDevice] = useState(false);

	const {
		storeToken,
		storeLegacyToken,
		getMeCallBack,
		biometricAuth,
	} = useAuthHelpers();

	const showAlert = (message) =>
		Alert.alert(
		  'Atenção!',
		  message,
		  [
			{
			  text: 'OK',
			  //onPress: () => Alert.alert('Cancel Pressed'),
			  style: 'cancel',
			},
		  ],
		  {
			cancelable: true
		  },
	);

	useEffect(() => {
		const checkBiometricAuthEnabled = async () => {
			const isEnabled = await AsyncStorage.getItem('biometricAuthEnableInDevice');
			if (!isEnabled || isEnabled === 'false') {
				setIsBiometricAuthEnableInDevice(false);
			} else {
				setIsBiometricAuthEnableInDevice(true);
			}
		};
		checkBiometricAuthEnabled();
	}, []);

  	const emailParam = route.params?.email || '';

	const submit = values => {
		dispatch({
		type: 'LOGIN_V2',
		payload: {
			values: values,
			callbackSuccess: async (response) => {
				await loginLegacy(values);
				await storeToken(response.access_token);
				biometricAuth(values.email, response.access_token);
			},
			callbackFinally: (response) => {
				if ( response && response.statusCode === 401 ) {
					Toast.show({
						type: 'error',
						text1: response.message,
						position: 'bottom',
					});
				}
			},
		}
		});
	};

	const loginLegacy = async values => {
		dispatch({
		type: 'LOGIN_TRIGGER',
		payload: {
			values: values,		
			callbackSuccess: async (response) => {
				await storeLegacyToken(response.legacy_token.token);
				getMeCallBack();
				setModalVisible(true);
			},
		},
		});
	};

	const complementDataSchema = yup.object().shape({
		email: yup.string().email().required(),
		password: yup.string().required(),
	});

    const setModalVisible = (visible) => {
        dispatch({
            type: 'SET_BIOMETRIC_MODAL_VISIBLE',
            payload: visible
        });
    }

	return (
		<>
			<Formik
				initialValues={{ email: emailParam, password: ''}}
				onSubmit={submit}
				validationSchema={complementDataSchema}
			>
			{(formik) => (
				<ScrollView>

					<View style={GlobalStyle.spaceSmall} />
					<View style={{flex: 1}}>
						<FieldTextInputNew
							formik={formik}
							name={`email`}
							keyboardType="email-address"
							placeholder="Digite seu e-mail"
							labelText="Email"
							leftIcon={{ type: 'material', name: 'email', color: theme.colors.textSecondary, size: 20 }}
							autoCapitalize={'none'}
							autoCorrect={false}

							referencia={componentRef => (fieldEmail = componentRef)}
							forwardRef={true}
							returnKeyType="next"
							onEnter={() => {
								fieldPassword.focus()
							}}
						/>
					</View>
					<View style={{flex: 1}}>
						<FieldTextInputNew
							formik={formik}
							name={`password`}
							keyboardType="default"
							placeholder="Digite sua senha"
							labelText="Senha"
							leftIcon={{ type: 'material', name: 'lock', color: theme.colors.textSecondary, size: 20 }}
							autoCapitalize={'none'}
							autoCorrect={false}
							maxLength={20}
							secureTextEntry={true}

							referencia={componentRef => (fieldPassword = componentRef)}
							forwardRef={true}
							returnKeyType="done"
						/>
						<View style={{alignItems: 'flex-end'}}>
							<TouchableOpacity onPress={() => {
							navigation.navigate('RecuperarSenha'); // Atualizado para usar o hook navigation
							}}>
							<Text style={themedStyles.esqueciAsenhaText}>esqueceu sua senha?</Text>
							</TouchableOpacity>
						</View>
					</View>

					<View style={GlobalStyle.spaceSmall} />

					<ConfirmButton
						buttonTitle={'Entrar'}
						onPress={formik.handleSubmit}
						loading={isRequesting}
						disabled={isRequesting}
					/>

					</ScrollView>
			)}
			</Formik>
		</>
	);
};

const styles = (theme) => StyleSheet.create({
	esqueciAsenhaText: {
		color: theme.colors.textSecondary,
		alignSelf: 'center',
		fontWeight: 900,
		fontSize: 15,
		marginBottom: 10
	},
});

export default FormLogin;