import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Badge, useTheme, Icon } from '@rneui/themed';
import globalStyles from '@styles/globalStyles';
import { StyleSheet } from 'react-native';
import AppText from '@components/Typography/AppText';

// Omiti a definição de Props pois não foi fornecida anteriormente, mas você pode adicionar se estiver usando TypeScript ou precisar especificar os tipos de propriedades.
const MenuItem = ({ item, index }) => {
  const { theme } = useTheme();
  const GlobalStyle = globalStyles(theme);
  const themedStyles = styles(theme);
  return (
    <TouchableOpacity
      key={index}
      onPress={item.onPress}
    >
    <View style={[themedStyles.container, GlobalStyle.row]}>
      {item.icon && (
      <Icon
        name={item.icon}
        type={item.iconType || 'font-awesome'}
        size={item.iconSize || 20}
        color={theme.colors.textPrimary}
        containerStyle={{ marginRight: 10 }}
      />)}
  
      <View style={{flex: 1}}>
        <AppText style={themedStyles.title}>{item.name}</AppText>
      </View>
      <Icon
        name="chevron-right"
        type="font-awesome"
        size={10}
        color={theme.colors.textSecondary}
        containerStyle={{ marginLeft: 10 }}
      />
    </View>
    </TouchableOpacity>
  );
}

const styles = (theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundTerciary,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: theme.borderRadius.borderRadius,
    marginBottom: 10
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
  }
});

export default MenuItem;
