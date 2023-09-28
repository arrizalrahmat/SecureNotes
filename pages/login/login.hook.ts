import {useState, useEffect, useCallback} from 'react';
import ReactNativeBiometrics, {BiometryType} from 'react-native-biometrics';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../interface.routes';
import {USERNAME, PASSWORD} from '@env';

const Biometrics = new ReactNativeBiometrics({allowDeviceCredentials: true});

type LoginNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

export const useLogin = () => {
  const navigation = useNavigation<LoginNavigationProp>();

  const [biometricType, setBiometricType] = useState<BiometryType | null>(null);
  const [biometricFailed, setBiometricFailed] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const checkBiometrics = useCallback(async () => {
    try {
      const {available, biometryType} = await Biometrics.isSensorAvailable();
      if (available) {
        if (biometryType) {
          setBiometricType(biometryType);
        }
      } else {
        console.error(
          'Biometric authentication is not available on this device.',
        );
      }
    } catch (error) {
      console.error('Error checking biometrics availability:', error);
    }
  }, []);

  const authenticateWithBiometrics = useCallback(async () => {
    try {
      const success = await Biometrics.simplePrompt({
        promptMessage: 'Authenticate using your biometric method',
      });

      if (success.success) {
        // Biometric authentication success
        navigation.navigate('Notes');
      } else {
        // Biometric authentication failed
        setBiometricFailed(true);
      }
    } catch (error) {
      console.error('Biometric authentication error:', error);
    }
  }, [navigation]);

  const authenticateWithCredentials = useCallback(() => {
    if (username === USERNAME && password === PASSWORD) {
      navigation.navigate('Notes');
    } else {
      console.error('Authentication failed');
    }
  }, [navigation, password, username]);

  useEffect(() => {
    checkBiometrics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    biometricType,
    biometricFailed,
    username,
    setUsername,
    password,
    setPassword,
    authenticateWithBiometrics,
    authenticateWithCredentials,
  };
};

export default useLogin;
