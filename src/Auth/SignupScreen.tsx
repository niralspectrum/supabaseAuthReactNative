import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import {supabase} from '../lib/supabase';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {RNTextInput} from '../components/RNTextInput';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from './types/authTypes';
import RNButton from '../components/RNButton';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SignupScreen = () => {
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
      onSubmit: values => {
        handleSignup();
      },
    });

  const handleSignup = async () => {
    try {
      setisLoading(true);
      const {
        data: {session},
        error,
      } = await supabase.auth.signUp({
        email: values.email.trim().toLowerCase(),
        password: values.password,
      });
      console.log('data', session);

      if (error) {
        Alert.alert('Signup Error', error.message);
      }

      if (!session && !error) {
        Alert.alert(
          'Verification email sent',
          'Please check your email to verify your account',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'Login',
                      params: {someParam: 'Param1'},
                    },
                  ],
                });
              },
            },
          ],
        );
      }
    } catch (error) {
      console.log(error, 'catch Error');
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

      <RNButton
        disabled={isLoading}
        onPress={() => handleSubmit()}
        label="Sign Up"
      />
      <RNButton
        disabled={isLoading}
        onPress={() => navigation.navigate('Login')}
        label="Login"
      />
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },

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
