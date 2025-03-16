import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgorPassword: undefined;
  ChangePassword: undefined;
  VerifyOTP: {email: string};
};

/*VerifyOTP Screen Types */
type VerifyOTPScreenRouteProp = RouteProp<RootStackParamList, 'VerifyOTP'>;
type VerifyOTPScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'VerifyOTP'
>;

export type VerifyOTPScreenProps = {
  route: VerifyOTPScreenRouteProp;
  navigation: VerifyOTPScreenNavigationProp;
};
/*VerifyOTP Screen Types End*/
