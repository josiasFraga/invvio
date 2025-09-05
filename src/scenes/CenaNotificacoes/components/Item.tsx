import React, { useMemo, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTheme, Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import AppText from '@components/Typography/AppText';
import moment from 'moment';

type NotificationOriginUser = {
  id: string;
  nickname: string;
  photoUrl: string | null;
};

type NotificationMotive = {
  id: string;
  motive: string;
} | null;

type NotificationItem = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  message: string;
  read: boolean;
  readAt: string | null;
  originUser: NotificationOriginUser;
  notificationMotive?: NotificationMotive;
};

const Item = ({ item }: { item: NotificationItem }) => {
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [read, setRead] = useState(item.read);

  // Avatar: foto ou iniciais
  const initials = (item.originUser?.nickname || '')
    .split(' ')
    .map((p: string) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'U';

  const avatar = item.originUser?.photoUrl ? (
    <Icon
      name="account-circle"
      type="material-community"
      size={36}
      color={theme.colors.textSecondary}
    />
  ) : (
    <AppText style={themedStyles.avatarText}>{initials}</AppText>
  );

  const when = moment(item.createdAt).format('DD/MM/YYYY HH:mm');

  const handlePress = (id: string) => {
    if (item.notificationMotive && item.notificationMotive.motive === 'transfer_received') {
      navigation.navigate('Transferencias');
    }

    setRead(true);
    dispatch({ type: 'MARK_NOTIFICATION_AS_READ', payload: { id } });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => handlePress(item.id)}
      style={[themedStyles.container, read ? {} : { borderLeftColor: theme.colors.primary, backgroundColor: theme.colors.backgroundTerciary }]}
    >
      <View style={themedStyles.row}>
        <View style={themedStyles.avatar}>
          {avatar}
        </View>
        <View style={themedStyles.mainCol}>
          <View style={{flex: 1}}><AppText style={themedStyles.title} numberOfLines={1}>{item.title}</AppText></View>
          <View style={{flex: 1}}><AppText style={themedStyles.message} numberOfLines={2}>{item.message}</AppText></View>
          <View style={themedStyles.subRow}>
            <AppText style={themedStyles.metaText}>{item.originUser?.nickname}</AppText>
            <AppText style={themedStyles.dot}>•</AppText>
            <AppText style={themedStyles.metaText}>{when}</AppText>
            {!read && (
              <View style={themedStyles.unreadDot} />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.backgroundSecondary,
      borderRadius: theme.borderRadius?.borderRadius ?? 10,
      paddingVertical: 12,
      paddingHorizontal: 14,
      //marginHorizontal: 12,
      marginVertical: 6,
      borderLeftWidth: 4,
      ...theme.boxShadow,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    avatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
      marginRight: 12,
    },
    avatarText: {
      fontSize: 12,
      fontWeight: '700',
      color: theme.colors.textSecondary,
    },
    mainCol: {
      flex: 1,
      gap: 2,
    },
    amount: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.colors.textPrimary,
    },
    subRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 6,
    },
    metaText: {
      fontSize: 12,
      color: theme.colors.tabBarLabel,
    },
    metaStrong: {
      fontSize: 12,
      fontWeight: '700',
      color: theme.colors.textSecondary,
    },
    dot: {
      fontSize: 12,
      color: theme.colors.tabBarLabel,
      marginHorizontal: 4,
    },
    statusPill: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 999,
      marginLeft: 10,
      alignSelf: 'flex-start',
    },
    statusText: {
      fontSize: 11,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 0.3,
    },
  });

export default Item;
