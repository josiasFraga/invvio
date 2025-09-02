import { StyleSheet, View, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from '@rneui/themed';
import Header from '@components/Header'
import SafeAreaView from '@components/SafeAreaView';
import { useEffect } from 'react';
import LoaderList from '@components/LoaderList';
import FlatListPaginated from '@components/FlatListPaginated';
import NoItems from '@components/NoItems';
import { useNavigation } from '@react-navigation/native';
import Item from './components/Item';

const CenaTransferencias = () => {
	const { theme } = useTheme();
    const navigation = useNavigation();
    const themedStyles = styles(theme);
    const dispatch = useDispatch();

    const transfers = useSelector(state => state.app.transfers);
    const transfersLoading = useSelector(state => state.app.transfersLoading);

    /* ---------- função que o componente genérico vai chamar ---------- */
    const fetchPage = async (offset) => {


        const payload = {
            limit: 15,
            offset,
        };

        // dispatch retorna uma Promise na maioria dos middlewares (redux-thunk, saga…)
        dispatch({
        type: 'GET_TRANSFERS',
        payload,
        });
    };

    return (
        <View style={themedStyles.container}>
            <SafeAreaView />
            <StatusBar translucent backgroundColor={'transparent'} barStyle={theme.statusBarStyle} />
            <Header
            backButton
            titulo="Transferências"
            />
            <View style={themedStyles.container}>
            <FlatListPaginated
            fetchPage={fetchPage}
            limit={15}
            loading={transfersLoading}
            items={transfers}
            keyExtractor={item => `transfer-${item.id}`} 
            renderItem={({ item }) =>
                <Item item={item} />
            }
            resetItemsReducer={() => dispatch({ type: 'RESET_TRANSFERS' })}
            initialNumToRender={10}
            windowSize={10}
            style={{ backgroundColor: theme.colors.background }}
            noItemsText={'Nenhuma transferência encontrada.'}
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


export default CenaTransferencias;
