import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {supabase} from '../lib/supabase';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {RNTextInput} from '../components/RNTextInput';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from './types/authTypes';
import RNButton from '../components/RNButton';
import {saveToStorage} from '../utils/storage';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginScreen = () => {
  const [isLoading, setisLoading] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {errors, values, touched, setFieldValue, handleSubmit, handleBlur} =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: SignupSchema,
      onSubmit: () => {
        handleLogin();
      },
    });

  const handleLogin = async () => {
    try {
      setisLoading(true);
      const {data, error} = await supabase.auth.signInWithPassword({
        email: values.email.trim().toLowerCase(),
        password: values.password,
      });
      if (data?.session) {
        await saveToStorage('userData', data.session);
      }
    } catch (error) {
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
        keyboardType="email-address"
        autoCapitalize="none"
        error={touched.email && errors.email ? errors.email : ''}
      />

      <RNTextInput
        editable={!isLoading}
        label="Password"
        value={values.password}
        onChangeText={password => setFieldValue('password', password)}
        onBlur={handleBlur('password')}
        secureTextEntry
        error={touched.password && errors.password ? errors.password : ''}
      />
      <Pressable
        style={{alignSelf: 'flex-end'}}
        onPress={() => navigation.navigate('ForgorPassword')}>
        <Text>Forgot Password</Text>
      </Pressable>
      <RNButton
        disabled={isLoading}
        onPress={() => handleSubmit()}
        label="Login"
      />
      <RNButton
        disabled={isLoading}
        onPress={() => navigation.goBack()}
        label="Signup"
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});
