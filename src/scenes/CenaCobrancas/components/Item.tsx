import React, { useMemo, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTheme, Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import AppText from '@components/Typography/AppText';
import moment from 'moment';

type User = {
  id: string;
  nickname: string;
  photoUrl: string | null;
};

type CobrancaItem = {
  id: string;
  amount: string;
  expiresAt: string;
  createdAt: string;
  creatorUser: User;
  targetUser: User;
  type: 'received' | 'sent';
};

const Item = ({ item }: { item: CobrancaItem }) => {
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  const navigation = useNavigation();


  // Decide qual usuário mostrar conforme o tipo
  const userToShow = item.type === 'received' ? item.creatorUser : item.targetUser;
  const initials = (userToShow?.nickname || '')
    .split(' ')
    .map((p: string) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'U';

  const avatar = userToShow?.photoUrl ? (
    <Icon
      name="account-circle"
      type="material-community"
      size={36}
      color={theme.colors.secondary}
    />
  ) : (
    <AppText style={themedStyles.avatarText}>{initials}</AppText>
  );

  const createdAt = moment(item.createdAt).format('DD/MM/YYYY HH:mm');
  const expiresAt = moment(item.expiresAt).format('DD/MM/YYYY');
  const formattedAmount = Number(item.amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <TouchableOpacity onPress={() => { navigation.navigate('PagarCobranca', { id: item.id })}} disabled={item.type === 'sent'}>
    <View style={themedStyles.container}>
      <View style={themedStyles.row}>
        <View style={themedStyles.avatar}>{avatar}</View>
        <View style={themedStyles.mainCol}>
          <AppText style={themedStyles.title} numberOfLines={1}>{userToShow.nickname}</AppText>
          <AppText style={themedStyles.amount}>{formattedAmount}</AppText>
          <View style={themedStyles.subRow}>
            <AppText style={themedStyles.metaText}>Criada em: {createdAt}</AppText>
            <AppText style={themedStyles.dot}>•</AppText>
            <AppText style={themedStyles.metaText}>Expira em: {expiresAt}</AppText>
            <AppText style={themedStyles.dot}>•</AppText>
            <AppText style={themedStyles.metaText}>{item.type === 'received' ? 'Recebida' : 'Enviada'}</AppText>
          </View>
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
