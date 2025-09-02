import { Icon, useTheme } from '@rneui/themed';
import { useMemo } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppTitle from '@components/Typography/AppTitle';
import CustomSafeAreaView from '@components/SafeAreaView';
import Header from '@components/Header';
import globalStyles from '@styles/globalStyles';
import FieldTextInputNew from '@components/Forms/Fields/FieldTextInputNew';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import HeaderRightButton from '@components/Buttons/HeaderRightButton';

const CenaMudarSenha = () => {
    const { theme } = useTheme();
    const GlobalStyle = globalStyles(theme);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const themedStyles = styles(theme);

    const validationSchema = useMemo(() => {
        return yup.object().shape({
            password: yup.string()
                .required('Senha obrigatória')
                .min(8, 'A senha deve ter no mínimo 8 caracteres')
                .max(20, 'A senha deve ter no máximo 20 caracteres'),

            confirmPassword: yup.string()
                .required('Confirme sua senha')
                .oneOf([yup.ref('password')], 'As senhas não coincidem'),
        });
    }, []);

    const formik = useFormik({
        validationSchema,
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        onSubmit: (values) => {
            dispatch({
                type: 'CHANGE_PASSWORD', // coloque sua saga/action real aqui
                payload: {
                    values: {
                        password: values.password,
                    },
                    callbackSuccess: () => {
                        Toast.show({
                            type: 'success',
                            text1: 'Tudo Certo',
                            text2: 'Senha alterada com sucesso!',
                            position: 'bottom',
                        });
                        navigation.pop();
                    },
                    callbackError: (response) => {
                        Toast.show({
                            type: 'error',
                            text1: response.message || 'Erro ao atualizar senha',
                            position: 'bottom',
                        });
                    },
                    callbackFinally: (response) => {
                        formik.setSubmitting(false);
                        if (response.status && response.message) {
                            Toast.show({
                                type: response.status,
                                text1: response.message,
                                position: 'bottom',
                            });
                        }
                    },
                },
            });
        },
    });

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <CustomSafeAreaView />
            <Header 
                titleLeftComponent={() => (
                    <View style={[GlobalStyle.row, { alignItems: 'center', marginLeft: 15 }]}>
                        <TouchableOpacity onPress={() => navigation.pop()}>
                            <Icon name="arrow-back" type="material" color={theme.colors.textSecondary} size={24} />
                        </TouchableOpacity>
                        <AppTitle style={{ marginLeft: 10, fontSize: 20 }}>
                            Alterar Senha
                        </AppTitle>
                    </View>
                )}
                rightElement={() => (
                    <HeaderRightButton
                    buttonTitle="Confirmar"
                    onPress={() => formik.handleSubmit()}
                    iconRight={true}
                    size="sm"
                    disabled={formik.isSubmitting || !formik.isValid}
                    icon={{
                        name: 'check-circle',
                        type: 'font-awesome',
                        color: '#FFF',
                        size: 15,
                    }}
                    />
                )}
            />
            <ScrollView style={[themedStyles.container, GlobalStyle.secureMargin]} bounces={false}>

                <View style={GlobalStyle.spaceSmall} />
                
                <FieldTextInputNew
                    formik={formik}
                    name="password"
                    keyboardType="default"
                    placeholder="Digite sua nova senha"
                    labelText="Nova senha"
                    leftIcon={{ type: 'material', name: 'lock', color: theme.colors.textSecondary, size: 20 }}
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={20}
                    autoFocus
                    secureTextEntry
                    returnKeyType="next"
                />
                <FieldTextInputNew
                    formik={formik}
                    name="confirmPassword"
                    keyboardType="default"
                    placeholder="Confirme sua nova senha"
                    labelText="Confirme a senha"
                    leftIcon={{ type: 'material', name: 'lock', color: theme.colors.textSecondary, size: 20 }}
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={20}
                    secureTextEntry
                    returnKeyType="done"
                />

            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
});

export default CenaMudarSenha;
