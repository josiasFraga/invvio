import React from 'react';
import CONFIG from '@constants/configs';
import { View, Platform } from 'react-native';

const SafeAreaViewAndroid = (props) => {
  // Se o sistema operacional for iOS, não retorna nada (ou null).
  if (Platform.OS === 'ios') {
    return null;
  }

  // Define o estilo base e mescla com qualquer estilo adicional passado através das props.
  let style = { height: CONFIG.STATUSBAR_HEIGHT };
  if (props.style) {
    style = { ...style, ...props.style };
  }

  return <View style={style} />;
};

export default SafeAreaViewAndroid;
