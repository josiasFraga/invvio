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

const CenaDepositar = () => {
    const { theme } = useTheme();
    const GlobalStyle = globalStyles(theme);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const themedStyles = styles(theme);

    const validationSchema = useMemo(() => {
        return yup.object().shape({
            amount: yup
                .string()
                .required('O valor é obrigatório')
                .test('is-valid-br-number', 'Digite um valor numérico válido', value => {
                    if (!value) return false;
                    // Remove pontos de milhar e troca vírgula por ponto
                    const normalized = value.replace(/\./g, '').replace(',', '.');
                    return !isNaN(Number(normalized));
                })
                .test('min', 'O valor mínimo para depósito é 10,00', value => {
                    if (!value) return false;
                    const normalized = value.replace(/\./g, '').replace(',', '.');
                    return Number(normalized) >= 10;
                }),
        });
    }, []);

    const formik = useFormik({
        validationSchema,
        initialValues: {
            amount: '',
        },
        onSubmit: (values) => {
            // Normaliza o valor para número antes de enviar
            const normalizedAmount = Number(String(values.amount).replace(/\./g, '').replace(',', '.'));
            dispatch({
                type: 'DEPOSIT_MONEY', // coloque sua saga/action real aqui
                payload: { ...values, amount: normalizedAmount },
                payload: {
                    values: {
                        amount: values.amount,
                    },
                    callbackSuccess: () => {
                        Toast.show({
                            type: 'success',
                            text1: 'Tudo Certo',
                            text2: 'Depósito realizado com sucesso!',
                            position: 'bottom',
                        });

                        dispatch({ type: 'GET_MY_BALANCE', payload: {} });
                        navigation.goBack();
                    },
                    callbackError: (response) => {
                        Toast.show({
                            type: 'error',
                            text1: response.message || 'Erro ao realizar depósito',
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
                            Depositar
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
                    name="amount"
                    mask="money_two"
                    labelText="Valor"
                    placeholder="ex: 100.35"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="numeric"
                    returnKeyType="next"
                    onSubmitEditing={() => {
                        //setFocusToFieldName('telefone');
                    }}
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

export default CenaDepositar;
