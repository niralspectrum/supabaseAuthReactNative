import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from './types/authTypes';
import {useNavigation} from '@react-navigation/native';
import {RNTextInput} from '../components/RNTextInput';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import RNButton from '../components/RNButton';
import {supabase} from '../lib/supabase';

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

const ForgotPasswordScreen = () => {
  const [isLoading, setisLoading] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {errors, values, touched, setFieldValue, handleSubmit, handleBlur} =
    useFormik({
      initialValues: {
        email: '',
      },
      validationSchema: ForgotPasswordSchema,
      onSubmit: () => {
        handleForgotPassword();
      },
    });

  const handleForgotPassword = async () => {
    try {
      setisLoading(true);
      const {data: isEmailExists} = await supabase.rpc('check_user_exists', {
        user_email: values.email,
      });
      if (isEmailExists) {
        const {error} = await supabase.auth.resetPasswordForEmail(values.email);
        if (error) {
          Alert.alert('Error resetting password:', error.message);
        } else {
          navigation.replace('VerifyOTP');
        }
      } else {
        Alert.alert('Error', 'User does not exists, Please check the email Id');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <RNTextInput
        editable={!isLoading}
        label="Email"
        value={values.email}
        onChangeText={email => setFieldValue('email', email)}
        onBlur={handleBlur('email')}
        error={touched.email && errors.email ? errors.email : ''}
      />
      <RNButton label="Submit" onPress={handleSubmit} disabled={isLoading} />
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});
