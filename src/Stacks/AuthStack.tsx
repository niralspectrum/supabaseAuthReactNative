import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignupScreen from '../Auth/SignupScreen';
import LoginScreen from '../Auth/LoginScreen';
import ForgotPasswordScreen from '../Auth/ForgotPasswordScreen';
import {RootStackParamList} from '../Auth/types/authTypes';
import ChangePasswordScreen from '../Auth/ChangePasswordScreen';
import VerifyOtpScreen from '../Auth/VerifyOtpScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="SignUp">
      <Stack.Screen name="SignUp" component={SignupScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="VerifyOTP" component={VerifyOtpScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
    </Stack.Navigator>
  );
}
