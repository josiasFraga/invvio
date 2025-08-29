import { StyleSheet } from 'react-native';

const getButtonStyles = (theme, size = 'md', type = 'solid') => {
  let buttonPaddingVertical;
  let buttonPaddingHorizontal;
  let titleFontSize;

  switch (size) {
    case 'xs':
      buttonPaddingVertical = 3;
      buttonPaddingHorizontal = 6;
      titleFontSize = 13;
      break;
    case 'sm':
      buttonPaddingVertical = 6;
      buttonPaddingHorizontal = 12;
      titleFontSize = 14;
      break;
    case 'lg':
      buttonPaddingVertical = 14;
      buttonPaddingHorizontal = 28;
      titleFontSize = 18;
      break;
    case 'md':
    default:
      buttonPaddingVertical = 10;
      buttonPaddingHorizontal = 20;
      titleFontSize = 16;
      break;
  }

  return StyleSheet.create({
    button: {
      backgroundColor: type != 'clear' ? theme.colors.buttonBackground : 'transparent',
      paddingVertical: buttonPaddingVertical,
      paddingHorizontal: buttonPaddingHorizontal,
      borderRadius: 20,
    },
    secondaryButton: {
      backgroundColor: theme.colors.secondaryButtonBackground,
      paddingVertical: buttonPaddingVertical,
      paddingHorizontal: buttonPaddingHorizontal,
      borderRadius: 20,
    },
    title: {
      color: type != 'clear' ? theme.colors.buttonText : theme.colors.textPrimary,
      fontSize: titleFontSize,
      fontWeight: 'bold',
    },
    secondaryTitle: {
      color: theme.colors.secondaryButtonText,
      fontSize: titleFontSize,
      fontWeight: 'bold',
    },
  });
};

export default getButtonStyles;
