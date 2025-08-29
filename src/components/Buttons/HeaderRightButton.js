import React from 'react';
import { Button } from '@rneui/themed';
import useTheme from '@hooks/useTheme';
import getButtonStyles from './buttonStyles';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const HeaderRightButton = ({ onPress, size = 'sm', type = 'solid', isLoading = false, disabled = false, buttonTitle = 'Confirmar', icon = null, iconRight, containerStyle = {} }) => { 
    const theme = useTheme(state => state.theme);
    const themedStyles = getButtonStyles(theme, size, type);

    const handlePress = () => {
        onPress();
    };

    return (
        <View style={[{ marginRight: 15, flex: 1, alignItems: 'flex-end', justifyContent: 'center' }, containerStyle]}>
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
            accessibilityLabel="Criar um novo voucher"
            accessibilityHint="Cria um novo voucher"
            // Outras props do Button conforme necessário
        />
        </View>
    );
};

HeaderRightButton.propTypes = {
    isLoading: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
    size: PropTypes.oneOf(['xs', 'sm', 'md']),
    buttonTitle: PropTypes.string,
    type: PropTypes.oneOf(['solid', 'clear']),
    iconRight: PropTypes.bool,
    containerStyle: PropTypes.object,
};

export default HeaderRightButton;
