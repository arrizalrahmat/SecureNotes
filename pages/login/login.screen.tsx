import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {useLogin} from './login.hook';
import styles from './login.style';

const Login = () => {
  const {
    biometricType,
    biometricFailed,
    username,
    setUsername,
    password,
    setPassword,
    authenticateWithBiometrics,
    authenticateWithCredentials,
  } = useLogin();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      {biometricType && !biometricFailed ? (
        <View>
          <TouchableOpacity
            style={styles.biometricButton}
            onPress={authenticateWithBiometrics}>
            <Text style={styles.buttonLabel}>Authenticate with Biometrics</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.formContainer}>
          {biometricFailed && (
            <Text style={styles.errorText}>
              Biometric authentication failed.
            </Text>
          )}
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={text => setUsername(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.loginButton}
            onPress={authenticateWithCredentials}>
            <Text style={styles.buttonLabel}>Login with Credentials</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Login;
