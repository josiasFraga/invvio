// src/components/Transfers/Item.tsx
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTheme, Icon } from '@rneui/themed';
import AppText from '@components/Typography/AppText';
import moment from 'moment';

type UserMini = {
  id: string;
  nickname: string | null;
  photoUrl: string | null;
  wallet: string | null;
};

type TxItem = {
  id: string;
  amount: string;
  createdAt: string;
  senderUser: UserMini;
  receiverUser: UserMini;
  type: 'received' | 'sended';
  status?: 'SUCCESS' | 'PENDING' | 'FAILED' | string; // opcional, se vier no futuro
};

const Item = ({ item }: { item: TxItem }) => {
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  const dispatch = useDispatch();

  const meta = useMemo(() => {
    const isReceived = item.type === 'received';
    const counterparty: UserMini = isReceived ? item.senderUser : item.receiverUser;
    const counterpartyName = counterparty?.nickname || 'usuário';
    const counterpartyWallet = counterparty?.wallet || '';

    const num = Number(item.amount);
    const formatted = num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const signed = `${isReceived ? '+' : '-'} ${formatted}`;

    const when = moment(item.createdAt).format('DD/MM/YYYY HH:mm');

    const iconName = isReceived ? 'arrow-bottom-left' : 'arrow-top-right';
    const iconType: any = 'material-community';

    const border = isReceived ? theme.colors.successText : theme.colors.textSecondary || theme.colors.secondary;

    // pill de status (usa defaults se não vier status)
    const status = (item as any).status || 'SUCCESS';
    const bgPill =
      status === 'SUCCESS'
        ? theme.colors.success
        : status === 'PENDING'
        ? theme.colors.warning
        : theme.colors.error;
    const textPill =
      status === 'SUCCESS'
        ? theme.colors.successText
        : status === 'PENDING'
        ? theme.colors.warningText
        : theme.colors.errorText;

    return {
      isReceived,
      counterpartyName,
      counterpartyWallet,
      signed,
      when,
      iconName,
      iconType,
      border,
      status,
      bgPill,
      textPill,
    };
  }, [item, theme]);

  // avatar simples por iniciais
  const initials =
    (meta.counterpartyName || '')
      .split(' ')
      .map((p: string) => p[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'U';

  return (
    <View style={[themedStyles.container, { borderLeftColor: meta.border }]}>
      <View style={themedStyles.row}>
        <View style={themedStyles.avatar}>
          <AppText style={themedStyles.avatarText}>{initials}</AppText>
        </View>

        <View style={themedStyles.mainCol}>
          <AppText style={themedStyles.amount} numberOfLines={1}>
            {meta.signed}
          </AppText>

          <View style={themedStyles.subRow}>
            <Icon name={meta.iconName} type={meta.iconType} size={16} color={theme.colors.tabBarLabel} />
            <AppText style={themedStyles.metaText}>
              {meta.isReceived ? 'De' : 'Para'}{' '}
              <AppText style={themedStyles.metaStrong}>{meta.counterpartyName}</AppText>
            </AppText>
            {!!meta.counterpartyWallet && (
              <>
                <AppText style={themedStyles.dot}>•</AppText>
                <AppText style={themedStyles.metaText}>carteira: {meta.counterpartyWallet}</AppText>
              </>
            )}
            <AppText style={themedStyles.dot}>•</AppText>
            <AppText style={themedStyles.metaText}>{meta.when}</AppText>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.backgroundTerciary || theme.colors.background,
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
    },
    avatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.backgroundQuaternary,
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
