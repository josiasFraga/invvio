import { useTheme } from '@rneui/themed';
import {  StyleSheet, View } from 'react-native';
import AppText from '@components/Typography/AppText';

import FlashMessage from '@components/FlashMessages';
import AppTitle from '@components/Typography/AppTitle';
import { useEffect, useMemo } from 'react';
import useFetch from '@hooks/useFetch';

const Resume = ({ toUserId, transferAmount, showInfo = true }) => {
    const { theme } = useTheme();
    const themedStyles = styles(theme);

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
        <View style={{marginBottom: 16, backgroundColor: theme.colors.backgroundTerciary, paddingVertical: 10, paddingHorizontal: 15, borderRadius: theme.borderRadius.borderRadius}}>
            <AppText style={themedStyles.text}><AppText style={themedStyles.bold}>Para:</AppText> {loading ? 'Carregando...' : data?.nickname}</AppText>
            <AppText style={themedStyles.text}><AppText style={themedStyles.bold}>Valor:</AppText> {transferAmount}</AppText>
        </View>

        { showInfo && (
            <FlashMessage
                message='Se alguma informação estiver incorreta, volte e corrija antes de concluir.'
                type='info'
            />
        )}
    </View>
    );
};

const styles = (theme) => StyleSheet.create({
    text: {
        fontSize: 16,
        color: theme.colors.textPrimary,
    }
    
});

export default Resume;