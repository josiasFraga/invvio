import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon, useTheme } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { formatNumber } from '@utils/stringUtils';
import { useNavigation } from '@react-navigation/native';
import AppText from '@components/Typography/AppText';

const NotificationIcon = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  const navigate = useNavigation();

  const myBalance = useSelector((state) => state.app.myBalance);

  const getBalance = () => {
    //dispatch({ type: 'GET_MY_BALANCE', payload: { } });
  }

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <TouchableOpacity
    onPress={()=>{
      //navigate.navigate('Transferencias');
    }}
    >
        <Icon name="notifications" size={24} color={theme.colors.textPrimary} />
    </TouchableOpacity>
  );
};

const styles = (theme) => StyleSheet.create({  
});

export default NotificationIcon;
