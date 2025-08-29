import React from 'react';
import { Button } from '@rneui/themed';
import useTheme from '@hooks/useTheme';
import getButtonStyles from './buttonStyles';
import PropTypes from 'prop-types';

const SecondaryButton = ({ onPress, size = 'md', isLoading = false, disabled = false, buttonTitle = 'Alterar', icon = null }) => { 
	const theme = useTheme(state => state.theme);
	const themedStyles = getButtonStyles(theme, size);

	const handlePress = () => {
		onPress();
	};

	return (
		<Button
			onPress={handlePress}
			title={buttonTitle}
			loading={isLoading}
			disabled={isLoading || disabled}
            buttonStyle={themedStyles.secondaryButton}
            titleStyle={themedStyles.secondaryTitle}
			icon={icon}
			disabledTitleStyle={{color: theme.colors.textSecondary}}
			disabledStyle={[themedStyles.secondaryButton, {opacity: 0.5}]}
		/>
	);
};

SecondaryButton.propTypes = {
    isLoading: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
	size: PropTypes.oneOf(['sm', 'md', 'lg']),
    buttonTitle: PropTypes.string,
	icon: PropTypes.func,
};

export default SecondaryButton;
