import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

interface RNButton {
  disabled?: boolean;
  label: string;
  showLoader?: boolean;
  onPress: () => void;
}

const RNButton = ({disabled, label, showLoader = true, onPress}: RNButton) => {
  return (
    <TouchableOpacity
      style={styles.button}
      disabled={disabled}
      onPress={() => onPress()}>
      {disabled && showLoader ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : (
        <Text style={styles.buttonText}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default RNButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
