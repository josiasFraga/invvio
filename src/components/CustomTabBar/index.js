import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Animated, Dimensions, Platform } from 'react-native';
import { Icon, Text, useTheme } from '@rneui/themed';
import { useSelector } from 'react-redux';
import globalStyles from '@styles/globalStyles';

const screenWidth = Dimensions.get('window').width;

const CustomTabBar = ({ state, descriptors, navigation }) => {
	const { theme } = useTheme();
	const GlobalStyle = globalStyles(theme);

	const isVisible = useSelector(state => state.app.tabBarVisible);

	const focusedOptions = descriptors[state.routes[state.index].key].options;

	const linePosition = useRef(new Animated.Value(0)).current;
	const translateY = useRef(new Animated.Value(0)).current; // Controle do movimento vertical

	if (focusedOptions.tabBarVisible === false) {
		return null;
	}

	const totalTabs = state.routes.length;
	const tabWidth = screenWidth / totalTabs;

	useEffect(() => {
		Animated.spring(linePosition, {
		toValue: state.index * tabWidth,
		useNativeDriver: true,
		speed: 20,
		}).start();
	}, [state.index, tabWidth]);

	useEffect(() => {
		Animated.timing(translateY, {
		toValue: isVisible ? 0 : 100, // Move a barra para fora da tela quando invisível
		duration: 200,
		useNativeDriver: true,
		}).start();
	}, [isVisible]);

	const translateX = linePosition;

	return (
		<>
		<Animated.View
			style={[
			GlobalStyle.TabBar.tabBar,
			{
				transform: [{ translateY }], // Move a barra verticalmente
				position: 'absolute', // Torna a barra independente da ocupação do layout
				bottom: 0, // Fixa a barra na parte inferior
				width: '100%', // Garante que ocupe toda a largura da tela
				paddingBottom: Platform.OS === 'ios' ? 20 : 10,
			},
			]}
		>
			<Animated.View
			style={[
				GlobalStyle.TabBar.activeIndicator,
				{
				width: tabWidth - 20,
				transform: [{ translateX }],
				},
			]}
			/>
			{state.routes.map((route, index) => {
			const { options } = descriptors[route.key];
			const isFocused = state.index === index;

			const label =
				options.tabBarLabel !== undefined
				? options.tabBarLabel
				: options.title !== undefined
				? options.title
				: route.name;

			const onPress = () => {
				const event = navigation.emit({
				type: 'tabPress',
				target: route.key,
				canPreventDefault: true,
				});

				if (!isFocused && !event.defaultPrevented) {
				navigation.navigate(route.name); // Corrigido para usar navigation prop
				}
			};

			const onLongPress = () => {
				navigation.emit({
				type: 'tabLongPress',
				target: route.key,
				});
			};

			return (
				<TouchableOpacity
				key={route.name}
				accessibilityRole="button"
				accessibilityState={isFocused ? { selected: true } : {}}
				accessibilityLabel={options.tabBarAccessibilityLabel}
				testID={options.tabBarTestID}
				onPress={onPress}
				onLongPress={onLongPress}
				style={GlobalStyle.TabBar.tabButton}
				>
				<Icon
					name={options.tabBarIcon}
					type={options.tabBarType}
					size={options.tabBarSize || 26}
					color={isFocused ? theme.colors.tabBarLabelActive : theme.colors.tabBarLabel}
				/>
				<Text
					style={[
					GlobalStyle.TabBar.tabLabel,
					isFocused && GlobalStyle.TabBar.tabLabelFocused,
					]}
				>
					{label}
				</Text>
				</TouchableOpacity>
			);
			})}
		</Animated.View>
		</>
	);
};

export default CustomTabBar;
