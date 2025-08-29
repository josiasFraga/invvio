import { useDispatch } from 'react-redux';
import { CommonActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useLogout = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const logout = async (redirect = true, params = {}) => {
    try {

      // Resetar o estado global Redux
      dispatch({
        type: 'RESET_REDUCER_STORE',
        payload: {},
      });

      // Limpar dados do AsyncStorage
      await AsyncStorage.multiRemove([
        'usuario',
        'bearerToken',
      ]);

      if ( redirect ) {
        // Redirecionar para a tela Home
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login', params: params }],
          })
        );
      }
    } catch (error) {
      console.error('Erro ao realizar logout:', error);
    }
  };

  return logout; // Retorna a função logout
};

export default useLogout;
