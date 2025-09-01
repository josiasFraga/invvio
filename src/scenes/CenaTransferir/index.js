import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@rneui/themed';
import { useMemo, useState, useRef, useEffect } from 'react';
import { Alert, Keyboard, StatusBar, StyleSheet, View } from 'react-native';
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

import SearchUser from './components/SearchUser';


const CenaTransferir = () => {
    const { theme } = useTheme();
    const GlobalStyle = globalStyles(theme);
    const themedStyles = styles(theme);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const wizardRef = useRef(null);

    const {
        storeToken,
        getMeCallBack,
    } = useAuthHelpers();

    const [initialValues, setInitialValues] = useState({
        search: '',
        toUserId: '',
        amount: 0,
    });
    const [targetTime, setTargetTime] = useState(null);

    const addTwoMinutes = () => Date.now() + 2 * 60 * 1000;

    const steps = useMemo(
        () => [
            {
                title: 'Pra quem você deseja transferir?',
                component: ({formik, registerFieldRef, setFocusToFieldName, pageIndex}) => (
                    <View style={{flex: 1}}>

                        <SearchUser
                        formik={formik}
                        registerFieldRef={registerFieldRef}
                        pageIndex={pageIndex}
                        />
                    
                    </View>
                ),
                autoFocusField: 'search'
            },

            {
                title: 'Qual será o valor da transferência?',
                component: ({formik, registerFieldRef, setFocusToFieldName, pageIndex}) => (
                    <View style={{flex: 1}}>

                        <View>
                        <FieldTextInputNew
                            formik={formik}
                            name="amount"
                            mask="decimal"
                            labelText="Valor"
                            placeholder="ex: 100.35"
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                //setFocusToFieldName('telefone');
                            }}
                            referencia={(r) => {
                                registerFieldRef("amount", pageIndex, r);
                            }}
                            forwardRef={true}
                        />
                        </View>

                        <View><AppText>Se saldo é de 0,00</AppText></View>

                    </View>
                ),
                autoFocusField: 'amount',
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
            toUserId: yup.string().required('Informe o usuário destinatário'),
        }),
        yup.object({
            amount: yup.string().required('Informe o valor da transferência'),
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

    useEffect(() => {
        wizardRef.current?.next();
    }, [formik.values.toUserId]);

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
                ref={wizardRef}
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

export default CenaTransferir;