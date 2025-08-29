import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Icon, useTheme } from '@rneui/themed';
import AppText from '@components/Typography/AppText';

const IconButton = ({ iconName, iconFamily, iconColor = null, onPress, title, active, disabled = false, isLoading = false }) => {

    const { theme } = useTheme();
    const themedStyles = styles(theme);

    return (
        <View style={[themedStyles.circleButtonWrapper, disabled && { opacity: 0.5 }]}>
            <TouchableOpacity style={active ? themedStyles.circleButtonActive : themedStyles.circleButton} onPress={onPress}>
                {!isLoading && <Icon 
                    name={iconName} 
                    size={24} 
                    color={iconColor ? iconColor : active ? theme.colors.buttonText : theme.colors.textPrimary} 
                    type={iconFamily}
                />}
                {isLoading &&
                <ActivityIndicator 
                    size="small" 
                    color={iconColor ? iconColor : active ? theme.colors.buttonText : theme.colors.textPrimary}
                />
                }
            </TouchableOpacity>
            <AppText style={themedStyles.circleButtonText}>{title}</AppText>
        </View>
    );
};

const styles = (theme) => StyleSheet.create({
    circleButtonWrapper: { alignItems: 'center', marginRight: 15 },
    circleButton: { backgroundColor: theme.colors.backgroundQuaternary, borderRadius: 30, width: 60, height: 60, justifyContent: 'center', alignItems: 'center', borderColor: theme.colors.borderColor, borderWidth: 1 },
    circleButtonActive: { backgroundColor: theme.colors.buttonBackground, borderRadius: 30, width: 60, height: 60, justifyContent: 'center', alignItems: 'center' },
    circleButtonText: { fontSize: 12, color: theme.colors.textPrimary, fontWeight: 'bold', marginTop: 5, textAlign: 'center' },
});

export default IconButton;
