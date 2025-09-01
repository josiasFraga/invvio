import { useNavigation } from '@react-navigation/native';
import { Avatar, Icon, useTheme } from '@rneui/themed';
import {  StyleSheet, TouchableOpacity, View } from 'react-native';

import globalStyles from '@styles/globalStyles';

import { useDispatch } from 'react-redux';
import { useMemo, useState } from 'react';
import useFetch from '@hooks/useFetch';

import LoaderList from '@components/LoaderList';
import AppText from '@components/Typography/AppText';
import NoItems from '@components/NoItems';

const Results = ({formik, search}) => {
    const { theme } = useTheme();
    const GlobalStyle = globalStyles(theme);
    const themedStyles = styles(theme);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // Memoize the options object
    const options = useMemo(() => ({ params: { query: search } }), [search]);

    const {
        data,
        loading,
        error,
        refetch,
    } = useFetch('/users/search/', options, true);

    return (
        <View style={themedStyles.container}>
            {loading && <LoaderList avatar length={3} />}
            {!loading && data && data.map(user => (
                <TouchableOpacity
                 key={user.id}
                 onPress={() => {
                    if ( user.id === formik.values.toUserId ) {
                        formik.setFieldValue('toUserId', '')
                    } else {
                        formik.setFieldValue('toUserId', user.id)
                    }
                 }}
                >
                <View style={themedStyles.userRow}>
                    <Avatar
                        source={user.photoUrl ? {uri: user.photoUrl} : theme.images.noImage  }
                        rounded
                        size="medium"
                    />
                    <View style={themedStyles.userInfo}>
                        <AppText style={themedStyles.userName}>{user.nickname}</AppText>
                        <AppText style={themedStyles.userWallet}>{user.wallet}</AppText>
                    </View>
                    {user.id === formik.values.toUserId &&
                    <Icon
                        name="check-circle"
                        type="feather"
                        color={theme.colors.textPrimary}
                    />
                    }
                </View>
                </TouchableOpacity>
            ))}
            {!loading && data.length === 0 && search.length > 0 && (
                <NoItems
                    message="Nenhum usuário encontrado!"
                />
            )}
            {!loading && search.length === 0 && (
                <View>
                    <AppText>Digite algo para buscar</AppText>
                </View>
            )}
        </View>
    );
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    userRow: {
        flexDirection: 'row',
        backgroundColor: theme.colors.backgroundTerciary,
        borderRadius: theme.borderRadius.borderRadius,
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginBottom: 5,
        alignItems: 'center'
    },
    userInfo: {
        marginLeft: 12,
        justifyContent: 'center',
        flex: 1
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 16
    },
    userWallet: {
        color: theme.colors.textSecondary
    },
});

export default Results;