import { useTheme } from '@rneui/themed';
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import globalStyles from '@styles/globalStyles';
import AppText from '@components/Typography/AppText';
import { Icon } from 'react-native-elements';

const ButtonSearch = ({onPress, label}) => {
    const { theme } = useTheme();
    const themedStyles = styles(theme);
    const GlobalStyle = globalStyles(theme);

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[themedStyles.searchContainer, GlobalStyle.secureMargin]}>
                <View style={themedStyles.search}>
                    <View style={GlobalStyle.row}>
                        <Icon name="search" type="ionicon" size={20} color={theme.colors.textSecondary} />
                        <AppText style={themedStyles.searchLabel}>{label}</AppText>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = (theme) => StyleSheet.create({
    searchContainer: {
        paddingBottom: 10,
        backgroundColor: theme.colors.background
    },
    search: {
        backgroundColor: theme.colors.backgroundTerciary,
        padding: 10,
        borderRadius: 15
    },
    searchLabel: {
        color: theme.colors.textSecondary,
        marginLeft: 10
    }
});

export default ButtonSearch;