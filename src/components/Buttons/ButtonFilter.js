import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Icon, useTheme } from '@rneui/themed';

const ButtonFilter = ({ onPress, title, active, disabled, iconName, iconFamily }) => {

    const { theme } = useTheme();
    const themedStyles = styles(theme); 

    return (
        <TouchableOpacity onPress={onPress} disabled={disabled}>
        <View style={[themedStyles.circleButtonWrapper, active ? themedStyles.circleButtonWrapperActive : {}]}>
            {iconName && iconFamily && <Icon
                name={iconName}
                type={iconFamily}
                color={active ? '#f7f7f7' : theme.colors.primary}
                containerStyle={{marginRight: 5}}
                size={13}
            />}
            <Text style={[themedStyles.circleButtonText, active ? themedStyles.circleButtonTextActive : {}]}>{title}</Text>
        </View>
        </TouchableOpacity>
    );
};

const styles = (theme) => StyleSheet.create({
    circleButtonWrapper: { alignItems: 'center', marginRight: 15, backgroundColor: theme.colors.inativeButtonBackground, paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20, flexDirection: 'row' },
    circleButtonWrapperActive: { backgroundColor: theme.colors.buttonBackground },
    circleButtonText: { fontSize: 14, color: theme.colors.inativeButtonText, textAlign: 'center' },
    circleButtonTextActive: { color: theme.colors.buttonText },
});

export default ButtonFilter;
