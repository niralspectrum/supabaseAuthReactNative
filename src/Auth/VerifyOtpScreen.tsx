import {Alert, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {OtpInput} from 'react-native-otp-entry';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import FormError from '../components/FormError';
import RNButton from '../components/RNButton';
import {supabase} from '../lib/supabase';

const otpValidationSchema = Yup.object().shape({
  otp: Yup.string()
    .required('OTP is required')
    .matches(/^\d{6}$/, 'OTP must be exactly 6 digits'),
});
import {RootStackParamList, VerifyOTPScreenProps} from './types/authTypes';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const VerifyOtpScreen = ({route}: VerifyOTPScreenProps) => {
  const {email} = route?.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [isLoading, setisLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema: otpValidationSchema,
    onSubmit: () => handleVerifyOtp(),
  });

  const handleVerifyOtp = async () => {
    if (email)
      try {
        setisLoading(true);
        const {data, error} = await supabase.auth.verifyOtp({
          email, // The email used for password reset
          token: formik?.values?.otp, // OTP entered by the user
          type: 'recovery', // This tells Supabase it's a password reset OTP
        });

        if (error) {
          Alert.alert('Invalid OTP', error?.message);
        } else {
          Alert.alert('OTP Verified', 'You can now set a new password.');
          navigation.navigate('ChangePassword');
        }
      } catch (err) {
        console.log('Error verifying OTP:', err);
      } finally {
        setisLoading(false);
      }
  };

  return (
    <View style={styles.container}>
      <OtpInput
        disabled={isLoading}
        numberOfDigits={6}
        onTextChange={text => formik.setFieldValue('otp', text)}
      />
      {formik.touched.otp && formik.errors.otp && (
        <FormError error={formik.errors.otp} />
      )}
      <RNButton
        label="Submit OTP"
        disabled={isLoading}
        onPress={formik.handleSubmit}
      />
    </View>
  );
};

export default VerifyOtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});
