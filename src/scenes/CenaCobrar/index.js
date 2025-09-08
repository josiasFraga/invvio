import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@rneui/themed';
import { useMemo, useState, useRef, useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Header from '@components/Header';
import CustomSafeAreaView from '@components/SafeAreaView';
import FieldTextInputNew from '@components/Forms/Fields/FieldTextInputNew';
import Wizard from '@components/Wizard';

import * as yup from 'yup';
import { useFormik } from 'formik';
import globalStyles from '@styles/globalStyles';

import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';

import SearchUser from '../CenaTransferir/components/SearchUser';
import Resume from '../CenaTransferir/components/Resume';

const CenaCobrar = () => {
    const { theme } = useTheme();
    const GlobalStyle = globalStyles(theme);
    const themedStyles = styles(theme);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const wizardRef = useRef(null);

    const [initialValues, setInitialValues] = useState({
        search: '',
        toUserId: '',
        amount: 0,
    });

    const steps = useMemo(
        () => [
            {
                title: 'Quem você deseja cobrar?',
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
                title: 'Quanto você deseja cobrar?',
                component: ({formik, registerFieldRef, setFocusToFieldName, pageIndex}) => (
                    <View style={{flex: 1}}>

                        <View>
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
                            referencia={(r) => {
                                registerFieldRef("amount", pageIndex, r);
                            }}
                            forwardRef={true}
                        />
                        </View>

                    </View>
                ),
                autoFocusField: 'amount',
            },

            {
                title: 'Confira as informações antes de concluir',
                component: ({formik}) => {
                    return (
                    <Resume toUserId={formik.values.toUserId} transferAmount={formik.values.amount} />
                    );
                },
            }
        ]
    )

    const validationSchemas = [
        yup.object({
            toUserId: yup.string().required('Informe o usuário a ser cobrado'),
        }),
        yup.object({
            amount: yup.string().required('Informe o valor da cobrança'),
        }),
    ];

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema: validationSchemas[0],
        onSubmit: values => {
            dispatch({
                type: 'DO_CHARGE',
                payload: {
                    values: {
                        toUserId: values.toUserId,
                        amount: values.amount,
                    },
                    callbackSuccess: async (response) => {
                        Toast.show({
                            type: 'success',
                            text1: 'Tudo certo',
                            text2: 'Cobrança realizada com sucesso!',
                            position: 'bottom'
                        });
                        dispatch({ type: 'RESET_CHARGES' });
                        navigation.goBack();
                    },
                    callbackError: (response) => {
                        formik.setSubmitting(false);

                        Toast.show({
                            type: 'error',
                            text1: 'Erro ao criar a cobrança',
                            text2: response.errorData?.message || response.errorData || 'Erro desconhecido',
                            position: 'bottom'
                        });
                    },
                    callbackFinally: (response) => {
                        formik.setSubmitting(false);

                        if ( response.status && response.message ) {
                            Toast.show({
                                type: response.status,
                                text1: response.status === 'success' ? 'Cobrança criada com sucesso!' : null,
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
});

export default CenaCobrar;