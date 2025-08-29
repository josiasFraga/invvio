import { useDispatch } from 'react-redux';
import { CommonActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import useLogout from '@hooks/useLogout';

export const useAuthHelpers = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const logout = useLogout();

    const storeToken = async (token) => {
        await AsyncStorage.setItem('bearerToken', token);
    };

    const getMeCallBack = () => {
        dispatch({
        type: 'GET_ME',
        payload: {
            callbackSuccess: async (me) => {
                console.log(`[SWITCH ACCOUNT] -> Dados do usuário obtidos com sucesso!`, me);
                await AsyncStorage.setItem('user', JSON.stringify(me));
                
                console.log(`[SWITCH ACCOUNT] -> Redirecionando para as tabs de usuário...`);
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'TabsScreenUser' }],
                    })
                );            
            },
            callbackError: async () => {
                console.error(`[SWITCH ACCOUNT] -> Erro ao buscar dados do usuário, redirecionando para o login...`);
                Toast.show({
                    type: 'error',
                    text1: 'Erro',
                    text2: 'Ocorreu um erro ao buscar seus dados',
                    position: 'bottom',
                });
                await logout({ email: me?.email });
                return;
            },
            callbackFinally: () => {
                console.log(`[SWITCH ACCOUNT] -> Finalizando a busca dos dados do usuário...`);
            },
        },
        });
    };

    const checkIsLoggedIn = async () => {
        console.log('[checkIsLoggedIn] start');
        try {
            const token = await AsyncStorage.getItem('bearerToken');

            const res = {
                isLoggedIn: Boolean(token),
                token,
            };
            console.log('[checkIsLoggedIn] done:', res);
            return res;
        } catch (e) {
            console.error('[checkIsLoggedIn] error:', e);
            return { isLoggedIn: false, token: null };
        }
    };

    return {
        storeToken,
        getMeCallBack,
        checkIsLoggedIn,
    };
};
