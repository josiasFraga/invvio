import { Formik } from 'formik';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { useTheme } from '@rneui/themed';
import * as yup from 'yup';
import { pt } from 'yup-locale-pt';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import ConfirmButton from '@components/Buttons/ConfirmButton';
import { useAuthHelpers } from '@hooks/useAuthHelpers';

import FieldTextInputNew from '@components/Forms/Fields/FieldTextInputNew';
import globalStyles from '@styles/globalStyles';
import { useRef } from 'react';

yup.setLocale(pt);

const FormLogin = () => {

	const fieldEmail = useRef(null);
	const fieldPassword = useRef(null);

	const dispatch = useDispatch();
	const navigation = useNavigation();

	const { theme } = useTheme();
	const themedStyles = styles(theme);
    const GlobalStyle = globalStyles(theme);

	const {
		storeToken,
		getMeCallBack,
	} = useAuthHelpers();

	const submit = (values, {setSubmitting}) => {
		dispatch({
		type: 'LOGIN',
		payload: {
			values: values,
			callbackSuccess: async (response) => {
				//console.log(response);
				await storeToken(response.accessToken);
				getMeCallBack();
			},
			callbackError: () => {
				setSubmitting(false);
			},
			callbackFinally: (response) => {
				setSubmitting(false);
				if ( response && response.statusCode === 401 ) {
					Toast.show({
						type: 'error',
						text1: 'Credenciais inválidas',
						position: 'bottom',
					});
				}
			},
		}
		});
	};


	const complementDataSchema = yup.object().shape({
		email: yup.string().email().required(),
		password: yup.string().required(),
	});

	return (
		<>
			<Formik
				initialValues={{ email: '', password: ''}}
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

							referencia={componentRef => (fieldEmail.current = componentRef)}
							forwardRef={true}
							returnKeyType="next"
							onEnter={() => {
								fieldPassword.current && fieldPassword.current.focus();
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

							referencia={componentRef => (fieldPassword.current = componentRef)}
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
						loading={formik.isSubmitting}
						disabled={formik.isSubmitting}
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