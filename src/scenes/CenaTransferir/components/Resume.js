import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@rneui/themed';
import {  StyleSheet, View } from 'react-native';
import AppText from '@components/Typography/AppText';

import FlashMessage from '@components/FlashMessages';
import globalStyles from '@styles/globalStyles';

import { useDispatch } from 'react-redux';
import AppTitle from '@components/Typography/AppTitle';
import { useEffect, useMemo } from 'react';
import useFetch from '@hooks/useFetch';

const Resume = ({ toUserId, transferAmount }) => {
    const { theme } = useTheme();
    const GlobalStyle = globalStyles(theme);
    const themedStyles = styles(theme);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const options = useMemo(() => ({ params: {  userId: toUserId } }), [toUserId]);

     const {
        data,
        loading,
        error,
        refetch,
    } = useFetch('/users/data/', options, !!toUserId && toUserId !== "");


    useEffect(() => {
        if ( toUserId && toUserId !== "" ) {
            refetch();
        }
    }, [toUserId]);

    return (
    <View style={{flex: 1}}>
        <AppTitle style={themedStyles.title}>Confira os dados da transferência</AppTitle>
        <View style={{marginBottom: 16, backgroundColor: theme.colors.backgroundTerciary, padding: 10, borderRadius: theme.borderRadius.borderRadius}}>
            <AppText style={themedStyles.text}><AppText style={themedStyles.bold}>Para:</AppText> {loading ? 'Carregando...' : data?.nickname}</AppText>
            <AppText style={themedStyles.text}><AppText style={themedStyles.bold}>Valor:</AppText> {transferAmount}</AppText>
        </View>

        <FlashMessage
        message='Se alguma informação estiver incorreta, volte e corrija antes de concluir.'
        type='info'
        />
    </View>
    );
};

const styles = (theme) => StyleSheet.create({
    
});

export default Resume;