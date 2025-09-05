import { useEffect, useRef } from 'react';
import { ActivityIndicator, Animated, Easing } from 'react-native';
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

  const nNotRead = useSelector((state) => state.app.notificationsNotReadCount);
  const isLoading = useSelector((state) => state.app.notificationsNotReadCountLoading);

  // Animação do badge
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!isLoading) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.3,
          duration: 120,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 120,
          useNativeDriver: true,
          easing: Easing.in(Easing.ease),
        })
      ]).start();
    }
  }, [nNotRead, isLoading]);

  const countNotRead = () => {
    dispatch({ type: 'GET_NOTIFICATIONS_NOT_READ_COUNT', payload: {} });
  }

  useEffect(() => {
    countNotRead();
  }, []);

  return (
    <TouchableOpacity
    onPress={()=>{
      navigate.navigate('Notificacoes');
    }}
    >
      <View style={{position: 'relative'}}>
        <Icon name="notifications" size={24} color={'#fff'} />
        <Animated.View style={[themedStyles.notificationBadge, { transform: [{ scale: scaleAnim }] }]}> 
          <AppText style={themedStyles.badgeText}>{nNotRead}</AppText>
        </Animated.View>

      </View>
    </TouchableOpacity>
  );
};

const styles = (theme) => StyleSheet.create({  
  notificationBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: theme.colors.textSecondary,
    borderRadius: 10,
    //padding: 4,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  }
});

export default NotificationIcon;
