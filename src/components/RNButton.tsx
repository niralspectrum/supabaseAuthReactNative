import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

interface RNButton {
  disabled?: boolean;
  label: string;
  onPress: () => void;
}

const RNButton = ({disabled, label, onPress}: RNButton) => {
  return (
    <TouchableOpacity
      style={styles.button}
      disabled={disabled}
      onPress={() => onPress()}>
      <Text style={styles.buttonText}>{label}</Text>
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
