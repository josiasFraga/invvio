import React from 'react';
import { Icon, useTheme } from '@rneui/themed';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

const BackButton = ({ backScene, iconColor }) => {
	const { theme } = useTheme();
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const cenaToOpen = backScene;

	const handlePress = () => {
		if (cenaToOpen === 'pop') {
			navigation.goBack();
		} else {
			navigation.dispatch(
				CommonActions.navigate({
					name: cenaToOpen,
				})
			);
		}
		dispatch({
			type: 'SET_TAB_BAR_VISIBLE',
			payload: true,
		})
	};

	if ( !navigation.canGoBack() ) {
		return null;
	}

	return (
		<Icon
			raised
			name="chevron-small-left"
			type="entypo"
			color={iconColor ? iconColor : theme.colors.textPrimary}
			size={20}
			onPress={handlePress}
			containerStyle={{ backgroundColor: theme.colors.backgroundTerciary }}
		/>
	);
};

export default BackButton;
