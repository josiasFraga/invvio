import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon, useTheme } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { formatNumber } from '@utils/stringUtils';
import { useNavigation } from '@react-navigation/native';

const Balance = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  const navigate = useNavigation();

  const myBalance = useSelector((state) => state.app.myBalance);
  const myBalanceLoading = useSelector((state) => state.app.myBalanceLoading);
  const showBalance = useSelector((state) => state.app.showBalance);

  const getBalance = () => {
    dispatch({ type: 'GET_MY_BALANCE', payload: { } });
  }

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <TouchableOpacity
    onPress={()=>{
      navigate.navigate('Transferencias');
    }}
    >
    <View style={themedStyles.moneyBox}>
      <View style={{flex: 1}}>
        <Text style={themedStyles.accountLabel}>Saldo em conta</Text>
        {showBalance && <Text style={themedStyles.moneyText}>{myBalanceLoading ? 'Carregando...' : formatNumber(myBalance)}</Text>}
        {!showBalance && <Text style={themedStyles.moneyText}>********</Text>}
      </View>
      <Icon name="chevron-right" size={24} color={theme.colors.textPrimary} />
    </View>
    </TouchableOpacity>
  );
};

const styles = (p) => StyleSheet.create({
  moneyBox: { marginVertical: 30, paddingHorizontal: 15, flexDirection: 'row' },
  accountLabel: { color: p.textPrimary, fontSize: 18, fontWeight: '500' },
  moneyText: { color: p.textPrimary, fontSize: 28, fontWeight: '700', marginTop: 5 },
  
});

export default Balance;
