import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, StatusBar, Animated } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import useLogout from '@hooks/useLogout'; // Importa o hook

import IMAGES from '@constants/images';
import Toast from 'react-native-toast-message';
import { useTheme } from '@rneui/themed';
import { useAuthHelpers } from '@hooks/useAuthHelpers';

const CenaSplash = ({ navigation }) => {
	const { theme } = useTheme();
    const dispatch = useDispatch();
	const logout = useLogout();

    const {
        getMeCallBack,
    } = useAuthHelpers();

	const fadeAnim = useRef(new Animated.Value(0)).current; // Opacidade inicial 0
    const scaleAnim = useRef(new Animated.Value(0.5)).current; // Escala inicial 0.5
    const rotateAnim = useRef(new Animated.Value(0)).current; // Rotação inicial 0deg

    useEffect(() => {
        // Sequência da animação: Rotação, Fade-In e Zoom-In
        Animated.parallel([
            Animated.timing(rotateAnim, {
                toValue: 1, // Rotação até 360°
                duration: 1000, // Tempo da rotação
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1, // Alcança opacidade 1
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1, // Escala até o tamanho original
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim, scaleAnim, rotateAnim]);

    // Interpolação da rotação
    const rotateInterpolation = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'], // Gira de 0° a 360°
    });

	const buscarTemaArmazenado = async () => {
		dispatch({
			type: 'GET_STORED_THEME',
			payload: {}
		});
	}

    useEffect(() => {
        const initialize = async () => {

			buscarTemaArmazenado();
            let token = await AsyncStorage.getItem("bearerToken");
            if (!token) {
                console.log('O usuário está deslogado, redirecionando para tela HOME.');
                navigateAfterDelay('Home');
            }
			else {
				console.log('O usuário possui um token no storage, verificando validade.');
                await getMeCallBack();
			}
        };


        const navigateAfterDelay = (routeName, delay = 2000) => {
            setTimeout(() => {
                navigation.dispatch(CommonActions.reset({
                    index: 0,
                    routes: [{ name: routeName }],
                }));
            }, delay);
        };

        initialize();
    }, [navigation, dispatch]);

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor={'transparent'} barStyle={'light-content'} />
            
                <View style={styles.imageContainer}>
                    {/* Animação da logo */}
                    <Animated.Image
                        source={IMAGES.LOGO}
                        style={[
                            styles.logo,
                            {
                                opacity: fadeAnim,
                                transform: [
                                    { scale: scaleAnim },
                                    { rotate: rotateInterpolation }, // Aplica rotação
                                ],
                            },
                        ]}
                    />
                </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e0d30'
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    logo: {
        width: 280,
        height: 114,
    }
});


export default CenaSplash;
