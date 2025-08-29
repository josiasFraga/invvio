import React from 'react';
import { Button } from '@rneui/themed';
import useTheme from '@hooks/useTheme';
import getButtonStyles from './buttonStyles';
import PropTypes from 'prop-types';

const ConfirmButton = ({ onPress, size = 'md', type = 'solid', isLoading = false, disabled = false, buttonTitle = 'Confirmar', icon = null, iconRight }) => { 
	const theme = useTheme(state => state.theme);
	const themedStyles = getButtonStyles(theme, size, type);

	const handlePress = () => {
		onPress();
	};

	return (
		<Button
			onPress={handlePress}
			title={buttonTitle}
			loading={isLoading}
			disabled={isLoading || disabled}
			buttonStyle={themedStyles.button}
			disabledTitleStyle={{color: theme.colors.textSecondary}}
			disabledStyle={[themedStyles.button, {opacity: 0.5}]}
			titleStyle={themedStyles.title}
			icon={icon}
			iconRight={iconRight}
			// Outras props do Button conforme necessário
		/>
	);
};

ConfirmButton.propTypes = {
    isLoading: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
	size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
    buttonTitle: PropTypes.string,
	type: PropTypes.oneOf(['solid', 'clear']),
	iconRight: PropTypes.bool,
};

export default ConfirmButton;
