import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { formatNumber } from '@utils/stringUtils';

const Balance = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const themedStyles = styles(theme);

  const myBalance = useSelector((state) => state.app.myBalance);
  const myBalanceLoading = useSelector((state) => state.app.myBalanceLoading);

  const getBalance = () => {
    dispatch({ type: 'GET_MY_BALANCE', payload: { } });
  }

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <View style={themedStyles.moneyBox}>
        <Text style={themedStyles.accountLabel}>Saldo em conta</Text>
        <Text style={themedStyles.moneyText}>{myBalanceLoading ? 'Carregando...' : formatNumber(myBalance)}</Text>
    </View>
  );
};

const styles = (p) => StyleSheet.create({
  moneyBox: { marginVertical: 30, paddingHorizontal: 15 },
  accountLabel: { color: p.textPrimary, fontSize: 18, fontWeight: '500' },
  moneyText: { color: p.textPrimary, fontSize: 28, fontWeight: '700', marginTop: 5 },
  
});

export default Balance;
