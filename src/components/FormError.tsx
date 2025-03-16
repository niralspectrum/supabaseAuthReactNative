import {StyleSheet} from 'react-native';
import React from 'react';
import Animated, {
  withTiming,
  useAnimatedStyle,
  withSequence,
} from 'react-native-reanimated';

interface FormErrorProps {
  error: string | undefined;
}

const FormError = ({error}: FormErrorProps) => {
  // Animated error message
  const errorAnimation = useAnimatedStyle(() => {
    return {
      opacity: withSequence(
        withTiming(error ? 1 : 0, {duration: 150}),
        withTiming(error ? 1 : 0, {duration: 150}),
      ),
    };
  });
  return error ? (
    <Animated.Text style={[styles.error, errorAnimation]}>
      {error}
    </Animated.Text>
  ) : null;
};

export default FormError;

const styles = StyleSheet.create({
  error: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  },
});
