import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@rneui/themed';
import { useMemo, useState } from 'react';
import { Keyboard, StatusBar, StyleSheet, View } from 'react-native';
import AppText from '@components/Typography/AppText';
import Header from '@components/Header';
import CustomSafeAreaView from '@components/SafeAreaView';
import FieldTextInputNew from '@components/Forms/Fields/FieldTextInputNew';
import Wizard from '@components/Wizard';

import * as yup from 'yup';
import { useFormik } from 'formik';
import FlashMessage from '@components/FlashMessages';
import globalStyles from '@styles/globalStyles';

import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import AppTitle from '@components/Typography/AppTitle';
import { useCountdown } from '@hooks/useCountdown';
import ConfirmButton from '@components/Buttons/ConfirmButton';
import { useAuthHelpers } from '@hooks/useAuthHelpers';


const CenaCadastro = () => {
    const { theme } = useTheme();
    const GlobalStyle = globalStyles(theme);
    const themedStyles = styles(theme);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const {
        storeToken,
        getMeCallBack,
    } = useAuthHelpers();

    const [initialValues, setInitialValues] = useState({
        nickname: '',
        email: '',
        code: '',
        password: '',
        password_repeat: '',
    });
    const [targetTime, setTargetTime] = useState(null);

    const addTwoMinutes = () => Date.now() + 2 * 60 * 1000;

    const steps = useMemo(
        () => [
            {
                title: 'Como gostaria de ser chamado no app?',
                component: ({formik, registerFieldRef, setFocusToFieldName, pageIndex}) => (
                    <View style={{flex: 1}}>

                        <View>
                            <FieldTextInputNew
                            formik={formik}
                            name="nickname"
                            labelText="Este será seu nickname"
                            placeholder="ex fulanoFulaninho"
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyType="next"
                            referencia={(r) => {
                                registerFieldRef("nickname", pageIndex, r);
                            }}
                            forwardRef={true}
                            />
                        </View>
                    
                    </View>
                ),
                autoFocusField: 'nickname',
            },

            {
                title: 'Digite seu email',
                component: ({formik, registerFieldRef, setFocusToFieldName, pageIndex}) => (
                    <View style={{flex: 1}}>

                        <View>
                        <FieldTextInputNew
                            formik={formik}
                            name="email"
                            labelText="Email (será seu login no Invvio)"
                            placeholder="ex: fulano@email.com"
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="email-address"
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                //setFocusToFieldName('telefone');
                            }}
                            referencia={(r) => {
                                registerFieldRef("email", pageIndex, r);
                            }}
                            forwardRef={true}
                        />
                        </View>

                        
                    </View>
                ),
                beforeNext: () =>
                    new Promise((res) => sendCode(formik.values.email, res)),
                autoFocusField: 'email',
            },

            {
                id: `verify-${targetTime || 0}`,
                title: 'Digite o código enviado para o seu email',
                component: ({ formik, registerFieldRef, pageIndex }) => {
                    const countdown = useCountdown(targetTime, () => {}); // hook retorna {minutes, seconds}
                    const disabled =
                    !targetTime || countdown.minutes + countdown.seconds > 0;
                    return (
                        <>
                        <FieldTextInputNew
                            name="code"
                            formik={formik}
                            placeholder="Código de 6 dígitos"
                            keyboardType="number-pad"
                            maxLength={6}
                            forwardRef
                            referencia={(r) => registerFieldRef('code', pageIndex, r)}
                            onChangeCallback={(text) => {                    
                                // se chegou em 6 dígitos, esconde o teclado
                                if (text.length === 6) {
                                    Keyboard.dismiss();
                                }
                            }}
                        />

                        <View>
                        {targetTime && (
                            <AppText style={{ marginVertical: 8, textAlign: 'center', color: theme.colors.textSecondary }}>
                            {disabled
                                ? `Não recebeu o códgio? \nVocê pode reenviar em ${String(countdown.minutes).padStart(2, '0')}:${String(
                                    countdown.seconds,
                                ).padStart(2, '0')}`
                                : 'Você pode reenviar um novo código agora.'}
                            </AppText>
                        )}
                        <ConfirmButton
                            buttonTitle="Reenviar código"
                            disabled={disabled || formik.isSubmitting}
                            onPress={() => sendCode(formik.values.email)}
                        />
                        </View>


                        </>
                    );
                },
                beforeNext: () =>
                    new Promise((res) => validateCode(formik.values.email, formik.values.code, res)),
                autoFocusField: 'code',
            },
            
            {
                title: 'Senha de acesso ao app',
                component: ({formik, registerFieldRef, setFocusToFieldName, pageIndex}) => (
                <View>

                    <View>
                    <FieldTextInputNew
                    name={'password'}
                    formik={formik}
                    placeholder="Senha para acesso ao Invvio"
                    labelText="Senha para acesso ao Invvio"
                    secureTextEntry
                    keyboardType="default"
                    maxLength={20}
                    multiline={false}
                    returnKeyType="next"
                    forwardRef={true}
                    referencia={(r) => {
                        registerFieldRef("password", pageIndex, r);
                    }}
                    onSubmitEditing={() => {
                        setFocusToFieldName('password_repeat')
                    }}
                    />
                    </View>
            
                    <View>
                    <FieldTextInputNew
                    name={'password_repeat'}
                    formik={formik}
                    placeholder="Repita a senha digitada acima"
                    labelText="Repita a senha digitada acima"
                    secureTextEntry
                    keyboardType="default"
                    maxLength={20}
                    multiline={false}
                    returnKeyType="done"
                    forwardRef={true}
                    referencia={(r) => {
                        registerFieldRef("password_repeat", pageIndex, r);
                    }}
                    />
                    </View>
                </View>
                ),
                autoFocusField: 'password',
            },
            
            {
                title: 'Confirme seus dados antes de concluir',
                component: ({formik}) => (
                    <View style={{flex: 1}}>
                        <AppTitle style={themedStyles.title}>Confira seus dados</AppTitle>
                        <View style={{marginBottom: 16, backgroundColor: theme.colors.backgroundTerciary, padding: 10, borderRadius: theme.borderRadius.borderRadius}}>
                            <AppText style={themedStyles.text}><AppText style={themedStyles.bold}>Nick:</AppText> {formik.values.nickname}</AppText>
                            <AppText style={themedStyles.text}><AppText style={themedStyles.bold}>Email:</AppText> {formik.values.email}</AppText>
                        </View>
  
                        <FlashMessage
                        message='Se alguma informação estiver incorreta, volte e corrija antes de concluir.'
                        type='info'
                        />
                    </View>
                ),
            },
        ]
    )

    const validationSchemas = [
        yup.object({
            nickname: yup.string().required('Informe seu nickname'),
        }),
        yup.object({
            email: yup.string().email('Email inválido').required('Informe o email'),
        }),
        yup.object({
            code: yup.string()
                .required('Informe o código enviado para o email')
                .length(6, 'O código deve ter 6 dígitos'),
        }),
        yup.object({
            password: yup.string().required().min(8, 'A senha deve ter no mínimo 8 caracteres'),
            password_repeat: yup.string().required()
                .oneOf([yup.ref('password'), null], 'As senhas devem ser idênticas!'),
        }),
    ];

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema: validationSchemas[0],
        onSubmit: values => {
            dispatch({
                type: 'REGISTER_USER',
                payload: {
                    values: {
                        ...values,
                    },
                    callbackSuccess: async (response) => {

                        console.log('REGISTER_USER callbackSuccess', response);

                        await storeToken(response.accessToken);
                        getMeCallBack();
                    },
                    callbackError: (response) => {
                        formik.setSubmitting(false);

                        Toast.show({
                            type: 'error',
                            text1: 'Erro ao criar a conta',
                            text2: response.errorData?.message || response.errorData || 'Erro desconhecido',
                            position: 'bottom'
                        });
                    },
                    callbackFinally: (response) => {
                        formik.setSubmitting(false);

                        if ( response.status && response.message ) {
                            Toast.show({
                                type: response.status,
                                text1: response.status === 'success' ? 'Seu cadastro foi feito com sucesso!' : null,
                                text2: response.message,
                                position: 'bottom'
                            });

                        }
                    },
                },
            });
        },
    });

    /* envia ou reenviar código */
    const sendCode = (email, resolve) => {
      formik.setSubmitting(true);
      dispatch({
        type: 'SEND_EMAIL_VALIDATION_CODE',
        payload: {
          values: { email },
          callbackSuccess: () => {
            Toast.show({ type: 'success', text1: 'Código enviado!', position: 'bottom' });
            setTargetTime(addTwoMinutes());
            resolve && resolve(true);
          },
          callbackError: (err) => {
            Toast.show({
              type: 'error',
              text1: 'Falha ao enviar código',
              text2: err?.errorData?.message || 'Erro desconhecido',
              position: 'bottom',
            });
            resolve && resolve(false);
          },
          callbackFinally: () => formik.setSubmitting(false),
        },
      });
    };

    /* valida o código */
    const validateCode = (email, code, resolve) => {
      formik.setSubmitting(true);
      dispatch({
        type: 'VALIDATE_EMAIL_VALIDATION_CODE',
        payload: {
          values: { email, code },
          callbackSuccess: () => {
            Toast.show({ type: 'success', text1: 'Código validado!', position: 'bottom' });
            resolve && resolve(true);
          },
          callbackError: (err) => {
            Toast.show({
              type: 'error',
              text1: 'Falha ao validar código',
              text2: err?.errorData?.message || 'Erro desconhecido',
              position: 'bottom',
            });
            resolve && resolve(false);
          },
          callbackFinally: () => formik.setSubmitting(false),
        },
      });
    };

    return (
        <View style={themedStyles.container}>
            <CustomSafeAreaView />
            <StatusBar
                barStyle={theme.statusBarStyle}
                backgroundColor={'transparent'}
                translucent={true}
            />
            <Header
                backButton={true}
                titulo={''}
            />
            <View style={themedStyles.container}>
                <Wizard
                steps={steps}
                validationSchemas={validationSchemas}
                formik={formik}
                />
                <CustomSafeAreaView style={{backgroundColor: theme.colors.background}} />
            </View>
        </View>
    );
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    title: {
        fontSize: 22,
        marginBottom: 20,
        textAlign: 'center',
    },
    section: {
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        //backgroundColor: theme.colors.backgroundTerciary,
    },
    text: {
        textAlign: 'justify',
        marginTop: 10,
        fontSize: 16,
    },
    bulletList: {
        marginTop: 10,
    },
    bullet: {
        textAlign: 'left',
        marginVertical: 4,
        fontSize: 16,
    },
    bold: {
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        height: 180,
        marginVertical: 20,
    },
});

export default CenaCadastro;