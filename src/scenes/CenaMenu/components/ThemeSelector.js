import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, useTheme } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import globalStyles from '@styles/globalStyles';
import PickerTheme from '@components/Pickers/PickerTheme';
import AppText from '@components/Typography/AppText';

const ThemeSelector = () => {
    const { theme } = useTheme();
    const themedStyles = styles(theme);
    const GlobalStyle = globalStyles(theme);

    const currentTheme = useSelector((state) => state.theme.currentTheme);

    return (
        <PickerTheme customComponent={() => <View style={GlobalStyle.secureMargin}>
        <View style={[themedStyles.container, GlobalStyle.row]}>
            <Icon
                name="palette"
                type="material-community"
                size={20}
                color={theme.colors.textPrimary}
                containerStyle={{ marginRight: 10 }}
            />
            <View style={{flex: 1}}>
                <AppText style={themedStyles.title}>Tema</AppText>
                <AppText style={{color: theme.colors.textSecondary}}>{currentTheme === 'dark' ? 'Escuro' : 'Claro'}</AppText>
            </View>
            <Icon
            name="chevron-right"
            type="font-awesome"
            size={10}
            color={theme.colors.textSecondary}
            containerStyle={{ marginLeft: 10 }}
            />
        </View>
        </View>} />
    );
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
    },
    container: {
        backgroundColor: theme.colors.backgroundTerciary,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: theme.borderRadius.borderRadius,
        marginBottom: 10
    },
    title: {
        fontSize: 16,
        fontWeight: 500,
    }
});

export default ThemeSelector;