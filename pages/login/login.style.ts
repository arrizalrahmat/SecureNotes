import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    width: '90%',
    borderRadius: 8,
    alignSelf: 'center',
  },
  loginButton: {
    backgroundColor: 'blue',
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
    width: '66%',
    alignSelf: 'center',
  },
  biometricButton: {
    backgroundColor: 'green', // Change to your preferred biometric button color
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  formContainer: {
    width: '100%',
  },
});
