import { useTheme } from '@rneui/themed';
import {  StyleSheet, View } from 'react-native';

import globalStyles from '@styles/globalStyles';

import AppText from '@components/Typography/AppText';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const Balance = () => {
    const { theme } = useTheme();
    const GlobalStyle = globalStyles(theme);
    const themedStyles = styles(theme);
    const dispatch = useDispatch();

    const myBalance = useSelector(state => state.app.myBalance);
    const myBalanceLoading = useSelector(state => state.app.myBalanceLoading);

    return (
        <View style={themedStyles.container}>
            {myBalanceLoading && <AppText>Carregando saldo...</AppText>}
            {!myBalanceLoading && <AppText>Se saldo atual é de: 
                {new Intl.NumberFormat('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    }).format(myBalance)}</AppText>}
        </View>
    );
};

const styles = (theme) => StyleSheet.create({
    container: {
    },
});

export default Balance;