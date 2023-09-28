import CryptoJS from 'react-native-crypto-js';
import {SECRET_KEY} from '@env';

export const encrypt = (text: string) => {
  const encryptedText = CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
  return encryptedText;
};

export const decrypt = (encryptedText: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY);
  const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedText;
};
