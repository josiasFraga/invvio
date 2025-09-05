import { StyleSheet, View, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from '@rneui/themed';
import Header from '@components/Header'
import SafeAreaView from '@components/SafeAreaView';
import FlatListPaginated from '@components/FlatListPaginated';
import Item from './components/Item';

const CenaNotificacoes = () => {
	const { theme } = useTheme();
    const themedStyles = styles(theme);
    const dispatch = useDispatch();

    const notifications = useSelector(state => state.app.notifications);
    const notificationsLoading = useSelector(state => state.app.notificationsLoading);

    /* ---------- função que o componente genérico vai chamar ---------- */
    const fetchPage = async (offset) => {


        const payload = {
            limit: 15,
            offset,
        };

        // dispatch retorna uma Promise na maioria dos middlewares (redux-thunk, saga…)
        dispatch({
        type: 'GET_NOTIFICATIONS',
        payload,
        });
    };

    return (
        <View style={themedStyles.container}>
            <SafeAreaView />
            <StatusBar translucent backgroundColor={'transparent'} barStyle={theme.statusBarStyle} />
            <Header
            backButton
            titulo="Notificações"
            />
            <View style={themedStyles.container}>
            <FlatListPaginated
            fetchPage={fetchPage}
            limit={15}
            loading={notificationsLoading}
            items={notifications}
            keyExtractor={item => `notification-${item.id}`}
            renderItem={({ item }) =>
                <Item item={item} />
            }
            resetItemsReducer={() => dispatch({ type: 'RESET_NOTIFICATIONS' })}
            initialNumToRender={10}
            windowSize={10}
            style={{ backgroundColor: theme.colors.background }}
            noItemsText={'Nenhuma notificação encontrada.'}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            />
            </View>
        </View>
    );
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
});


export default CenaNotificacoes;
