/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';

import DismissKeyboard from '../../components/common/dismissKeyboard';
import BackgroundImage from '../../components/common/backgroundImage';
import GreenButton from '../../components/buttons/greenButton';

const Login = () => {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const validateEmail = () => {
    let regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return regex.test(email.toLocaleLowerCase());
  };

  const submit = () => {
    if (!validateEmail(email)) {
      return Alert.alert('This is not a valid email.');
    }
    if (email) {
      setLoading(true);
      axios
        .post('http://45.82.137.69:8001/accounts/resetpasswordrequests', {
          email: email,
        })
        .then(res => {
          Alert.alert('Please, check your email for reset your password');
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          Alert.alert(
            err.response.data.error.errorDescription !== 'undefined'
              ? err.response.data.error.errorDescription
              : 'There has been an error processing your request',
          );
        });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <StatusBar barStyle="light-content" />
      <BackgroundImage type={2} />
      <DismissKeyboard>
        <SafeAreaView style={styles.innerContainer}>
          <View style={styles.headerContainer}>
            <Image
              source={require('../../assets/images/general/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.paragraph}>
              LIVES ON THE SEVENTH FLOOR OF SKY
            </Text>
            <Text style={styles.title}>RESET PASSWORD</Text>
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.helperText}>
              We will send reset password Link to your email address
            </Text>
            <TextInput
              keyboardType="email-address"
              placeholder="Enter Your Email Address"
              placeholderTextColor="#505050"
              style={styles.formInput}
              keyboardAppearance={'dark'}
              autoCorrect={false}
              autoCapitalize={'none'}
              maxLength={200}
              onChangeText={text => setEmail(text)}
              returnKeyType={'done'}
              onSubmitEditing={submit}
            />
            <GreenButton type={1} onPress={submit}>
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>CONFIRM</Text>
              )}
            </GreenButton>
          </View>
          <View />
        </SafeAreaView>
      </DismissKeyboard>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#000'},
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: '5%',
  },
  headerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '55%',
    alignSelf: 'center',
  },
  paragraph: {color: '#ffffff', fontSize: 12, textAlign: 'center'},
  title: {fontSize: 32, color: '#ffffff', marginVertical: 10},
  formContainer: {
    paddingHorizontal: 40,
  },
  formInput: {
    paddingHorizontal: 15,
    height: 40,
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 30,
    marginBottom: 20,
    fontSize: 15,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  helperText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default Login;
