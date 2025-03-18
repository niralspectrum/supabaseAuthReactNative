import {Alert, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {RNTextInput} from '../components/RNTextInput';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import RNButton from '../components/RNButton';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from './types/authTypes';
import {supabase} from '../lib/supabase';

const ChangePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

const ChangePasswordScreen = () => {
  const [isLoading, setisLoading] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {errors, values, touched, setFieldValue, handleSubmit, handleBlur} =
    useFormik({
      initialValues: {
        confirmPassword: '',
        password: '',
      },
      validationSchema: ChangePasswordSchema,
      onSubmit: () => {
        handleChangePassword();
      },
    });

  const handleChangePassword = async () => {
    try {
      setisLoading(true);
      const {error} = await supabase.auth.updateUser({
        password: values.password,
      });

      if (error) {
        Alert.alert('Error', error.message);
        return;
      }

      Alert.alert(
        'Success',
        'Your password has been reset. Please login with your new password.',
      );
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Login',
          },
        ],
      });
    } catch (err) {
      console.log('Error resetting password:', err);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <RNTextInput
        editable={!isLoading}
        label="Password"
        value={values.password}
        onChangeText={password => setFieldValue('password', password)}
        onBlur={handleBlur('password')}
        secureTextEntry
        error={touched.password && errors.password ? errors.password : ''}
      />
      <RNTextInput
        editable={!isLoading}
        label="confirm Password"
        value={values.confirmPassword}
        onChangeText={password => setFieldValue('confirmPassword', password)}
        onBlur={handleBlur('confirmPassword')}
        secureTextEntry
        error={
          touched.confirmPassword && errors.confirmPassword
            ? errors.confirmPassword
            : ''
        }
      />

      <RNButton
        disabled={isLoading}
        onPress={() => handleSubmit()}
        label="Submit"
      />
    </View>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});
