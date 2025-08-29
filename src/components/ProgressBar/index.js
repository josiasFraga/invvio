import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const ProgressBar = ({
  value = 0, // de 0 a 1
  variant = 'determinate', // ou 'indeterminate'
  color = '#1e0d30',
  style = {},
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const indeterminateTranslate = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (variant === 'determinate') {
      const clamped = Math.max(0, Math.min(1, parseFloat(Number(value).toFixed(2))));
      Animated.timing(animatedValue, {
        toValue: clamped,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      indeterminateTranslate.setValue(-100);
      Animated.loop(
        Animated.timing(indeterminateTranslate, {
          toValue: 100,
          duration: 1500,
          useNativeDriver: true,
        }),
      ).start();
    }
  }, [value, variant]);

  return (
    <View style={[styles.container, style]}>
      {variant === 'determinate' ? (
        <Animated.View
          style={[
            styles.bar,
            {
              backgroundColor: color,
              width: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      ) : (
        <Animated.View
          style={[
            styles.bar,
            {
              backgroundColor: color,
              width: '50%',
              transform: [
                {
                  translateX: indeterminateTranslate.interpolate({
                    inputRange: [-100, 100],
                    outputRange: ['-100%', '100%'],
                  }),
                },
              ],
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  bar: {
    height: 6,
    borderRadius: 3,
  },
});

export default ProgressBar;
