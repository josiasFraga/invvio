import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from '@rneui/themed';
import AppText from '@components/Typography/AppText';
import { useTheme } from '@rneui/themed';

const FlashMessage = ({ type, message }) => {
    const { theme } = useTheme();
    const themedStyles = styles(theme);
    const getIconName = () => {
        switch (type) {
            case 'success':
                return 'check-circle';
            case 'error':
                return 'error';
            case 'warning':
                return 'warning';
            case 'info':
                return 'info';
            default:
                return 'info';
        }
    };

    return (
        <View style={[themedStyles.container, themedStyles[type]]}>
            <Icon name={getIconName()} color={theme.colors[type + 'Text']} />
            <View style={{ flex: 1 }}>
            <AppText style={[themedStyles.message, {color: theme.colors[type + 'Text']}]}>{message}</AppText>
            </View>
        </View>
    );
};

const styles = (theme) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: theme.borderRadius.borderRadius,
        overflow: 'hidden',
    },
    message: {
        marginLeft: 10,
    },
    success: {
        backgroundColor: theme.colors.success,
        borderColor: '#c3e6cb',
    },
    error: {
        backgroundColor: theme.colors.error,
        borderColor: '#f5c6cb',
    },
    warning: {
        backgroundColor: theme.colors.warning,
        borderColor: '#ffeeba',
    },
    info: {
        backgroundColor: theme.colors.info,
        borderColor: '#bee5eb',
    },
});

export default FlashMessage;