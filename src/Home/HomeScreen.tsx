import {Alert, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RNButton from '../components/RNButton';
import {supabase} from '../lib/supabase';
import {clearAllStorage} from '../utils/storage';

const HomeScreen = () => {
  const handlelogout = async () => {
    const {error} = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error.message);
    } else {
      Alert.alert('Logout Successful', 'You have been logged out.');
      await clearAllStorage();
    }
  };

  return (
    <View style={styles.container}>
      <RNButton
        label="Logout"
        onPress={() => {
          handlelogout();
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
