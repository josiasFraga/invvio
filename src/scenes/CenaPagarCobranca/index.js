import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '@rneui/themed';
import { useState, useEffect, useMemo } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Header from '@components/Header';
import CustomSafeAreaView from '@components/SafeAreaView';
import { formatNumber } from '@utils/stringUtils';

import * as yup from 'yup';
import { useFormik } from 'formik';
import globalStyles from '@styles/globalStyles';

import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import HeaderRightButton from '@components/Buttons/HeaderRightButton';
import LoaderList from '@components/LoaderList';
import NoItems from '@components/NoItems';

import Resume from '../CenaTransferir/components/Resume';
import useFetch from '@hooks/useFetch';

const CenaPagarCobranca = () => {
    const { theme } = useTheme();
    const GlobalStyle = globalStyles(theme);
    const themedStyles = styles(theme);
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();

    const id = route.params?.id;
    
    const options = useMemo(() => ({ params: {  } }), [id]);

    const {
        data,
        loading,
        error,
        refetch,
    } = useFetch('/charges/' + id, options, true);

    const [initialValues, setInitialValues] = useState({
        toUserId: '',
        amount: 0,
    });

    const validationSchemas = [
        yup.object({
            toUserId: yup.string().required('Informe o usuário destinatário'),
        }),
        yup.object({
            amount: yup.string().required('Informe o valor da transferência'),
        }),
    ];

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema: validationSchemas[0],
        onSubmit: values => {
            dispatch({
                type: 'DO_TRANSFER',
                payload: {
                    values: {
                        toUserId: values.toUserId,
                        amount: values.amount,
                        chargeId: id,
                    },
                    callbackSuccess: async (response) => {

                        Toast.show({
                            type: 'success',
                            text1: 'Tudo certo',
                            text2: 'Transferência realizada com sucesso!',
                            position: 'bottom'
                        });

                        dispatch({ type: 'GET_MY_BALANCE', payload: {} });
                        dispatch({ type: 'RESET_CHARGES' })
                        navigation.goBack();
                    },
                    callbackError: (response) => {
                        formik.setSubmitting(false);

                        Toast.show({
                            type: 'error',
                            text1: 'Erro ao fazer a transferência',
                            text2: response.errorData?.message || response.errorData || 'Erro desconhecido',
                            position: 'bottom'
                        });
                    },
                    callbackFinally: (response) => {
                        formik.setSubmitting(false);

                        if ( response.status && response.message ) {
                            Toast.show({
                                type: response.status,
                                text1: response.status === 'success' ? 'Transferência realizada com sucesso!' : null,
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
        if ( id && id !== "" && data ) {
            setInitialValues({
                toUserId: data.creatorUser.id,
                amount: formatNumber(data.amount),
            });
        }
    }, [id, data]);

    return (
        <View style={[themedStyles.container, GlobalStyle.secureMargin]}>
            <CustomSafeAreaView />
            <StatusBar
                barStyle={theme.statusBarStyle}
                backgroundColor={'transparent'}
                translucent={true}
            />
            <Header
                backButton={true}
                titulo={''}
                rightElement={() => (
                    <HeaderRightButton
                    buttonTitle="Pagar"
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
            <View style={themedStyles.container}>
                {loading && <LoaderList />}
                {!loading && data && <Resume toUserId={formik.values.toUserId} transferAmount={formik.values.amount} showInfo={false} />}
                {!loading && !data && <NoItems message="Cobrança não encontrada." />}
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

export default CenaPagarCobranca;