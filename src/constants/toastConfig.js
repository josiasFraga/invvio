import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { BaseToast, ErrorToast } from 'react-native-toast-message';
import { Icon } from '@rneui/themed';
import AppText from '@components/Typography/AppText';

const { width } = Dimensions.get('window');

/**
 * Retorna a configuração de toasts baseada no tema.
 * @param {Object} theme - Objeto de tema (lightTheme ou darkTheme)
 */
export default function ToastConfig(theme) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      borderRadius: 8,
      marginVertical: 4,
      padding: 10,
      width: width * 0.8, // 80% da largura da tela
      marginHorizontal: '10%', // Deixa o toast centralizado na tela
      backgroundColor: theme.colors.background,
      borderLeftWidth: 0, // BaseToast cria borda esquerda; definimos manualmente
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 1,
      elevation: 1,
      zIndex: 9999,
    },
    iconContainer: {
      marginRight: 10,
    },
    textContainer: {
      flex: 1,
    },
    text1: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.textPrimary,
      marginBottom: 3,
    },
    text2: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
  });

  /**
   * Layout base para toasts customizados:
   * Você pode reutilizar este componente e apenas trocar a cor do ícone,
   * texto, etc., dependendo do tipo (success, error, warning, info).
   */
  const CustomToastLayout = ({ iconName, iconColor, text1, text2 }) => (
    <View style={styles.container}>
      {/* Ícone à esquerda */}
      <View style={styles.iconContainer}>
        <Icon name={iconName} type="feather" size={24} color={iconColor} />
      </View>

      {/* Texto */}
      <View style={styles.textContainer}>
        {text1 ? <AppText numberOfLines={2} style={styles.text1}>{text1}</AppText> : null}
        {text2 ? <AppText numberOfLines={2} style={styles.text2}>{text2}</AppText> : null}
      </View>
    </View>
  );

  return {
    /**
     * Toast de Sucesso
     */
    success: ({ text1, text2 }) => (
      <CustomToastLayout
        iconName="check-circle"
        iconColor={theme.colors.successText}
        text1={text1}
        text2={text2}
      />
    ),

    /**
     * Toast de Erro
     * Aqui usamos ErrorToast do pacote, mas personalizamos estilo e cores.
     * Se preferir, pode usar CustomToastLayout como acima.
     */
    error: (props) => (
      <ErrorToast
        {...props}
        style={[
          {
            zIndex: 9999,
            borderLeftColor: theme.colors.error,
            backgroundColor: theme.colors.background,
            borderRadius: 8,
            marginVertical: 4,
            shadowColor: '#000',
            width: width * 0.8, // 80% da largura da tela
            marginHorizontal: '10%', // Deixa o toast centralizado na tela
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 3,
          },
        ]}
        text1Style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: theme.colors.textPrimary,
        }}
        text2Style={{
          fontSize: 14,
          color: theme.colors.textSecondary,
        }}
        text2NumberOfLines={3}
      />
    ),

    /**
     * Toast de Aviso (Warning)
     * Usamos layout customizado com ícone de alerta.
     */
    warning: ({ text1, text2 }) => (
      <CustomToastLayout
        iconName="alert-triangle"
        iconColor={theme.colors.warning}
        text1={text1}
        text2={text2}
      />
    ),

    /**
     * Toast de Informação (Info)
     * Exemplo usando layout customizado com ícone "info".
     */
    info: ({ text1, text2 }) => (
      <CustomToastLayout
        iconName="info"
        iconColor={theme.colors.info}
        text1={text1}
        text2={text2}
      />
    ),
  };
}
