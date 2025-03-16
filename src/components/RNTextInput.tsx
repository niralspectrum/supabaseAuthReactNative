import React, {useState} from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  Text,
  Pressable,
  StyleProp,
  TextStyle,
} from 'react-native';
import {Eye, EyeOff} from 'lucide-react-native';
import FormError from './FormError';

interface CustomTextInputProps extends TextInputProps {
  label: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  value: string;
  onChangeText: (text: string) => void;
}

export const RNTextInput: React.FC<CustomTextInputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  value,
  onChangeText,
  secureTextEntry,
  style,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Border color based on state
  const getBorderColor = () => {
    if (error) return styles.error.color;
    if (isFocused) return '#007AFF';
    return '#E1E1E1';
  };

  // Properly handle input styles
  const getInputStyles = (): StyleProp<TextStyle> => {
    const inputStyles: StyleProp<TextStyle>[] = [styles.input];

    if (leftIcon) {
      inputStyles.push(styles.inputWithLeftIcon);
    }

    if (rightIcon || secureTextEntry) {
      inputStyles.push(styles.inputWithRightIcon);
    }

    if (style) {
      inputStyles.push(style);
    }

    return inputStyles;
  };

  return (
    <View style={styles.container}>
      {/* Label */}
      <Text style={styles.label}>{label}</Text>

      {/* Input container */}
      <View
        style={[
          styles.inputContainer,
          {borderColor: getBorderColor()},
          isFocused && styles.focused,
        ]}>
        {/* Left icon - only shown if provided */}
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}

        {/* TextInput */}
        <TextInput
          style={getInputStyles()}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          placeholderTextColor="#999"
          {...props}
        />

        {/* Right icon or password toggle */}
        {(rightIcon || secureTextEntry) && (
          <Pressable
            onPress={secureTextEntry ? togglePasswordVisibility : undefined}
            style={styles.iconContainer}>
            {secureTextEntry ? (
              isPasswordVisible ? (
                <Eye size={20} color="#666" />
              ) : (
                <EyeOff size={20} color="#666" />
              )
            ) : (
              rightIcon
            )}
          </Pressable>
        )}
      </View>

      {/* Error message */}
      <FormError error={error ? error : undefined} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
  },
  inputContainer: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 12,
    color: '#000',
  },
  inputWithLeftIcon: {
    paddingLeft: 0,
  },
  inputWithRightIcon: {
    paddingRight: 0,
  },
  iconContainer: {
    width: 40,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  focused: {
    borderWidth: 2,
  },
  error: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  },
});
