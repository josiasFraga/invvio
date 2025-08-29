import React from 'react';
import { Icon, useTheme } from '@rneui/themed';
import { CommonActions, useNavigation } from '@react-navigation/native';

const FilterButton = ({ filterScene, iconColor, onPress }) => {

  const navigation = useNavigation();
  const { theme } = useTheme();

	const handlePress = () => {
		if (filterScene) {
			navigation.dispatch(
				CommonActions.navigate({
					name: filterScene,
				})
			);
		} else if (onPress) {
			onPress();
		}
	};

	return (
		<Icon
			raised
			name="filter"
			type="antdesign"
			color={iconColor ? iconColor : theme.colors.textPrimary}
			size={20}
			onPress={handlePress}
			containerStyle={{ backgroundColor: theme.colors.backgroundTerciary }}
		/>
	);
};

export default FilterButton;
