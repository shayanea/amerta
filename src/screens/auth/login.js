/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import DismissKeyboard from '../../components/common/dismissKeyboard';
import BackgroundImage from '../../components/common/backgroundImage';
import GreenButton from '../../components/buttons/greenButton';

const Login = ({navigation}) => {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const storeToken = async data => {
    try {
      await AsyncStorage.setItem('@token', data.accessToken);
      storeUserInformation(data);
    } catch (e) {
      console.log(e);
    }
  };

  const storeUserInformation = async data => {
    try {
      await AsyncStorage.setItem('@profile', JSON.stringify(data));
      return navigation.dispatch(
        NavigationActions.navigate({routeName: 'App'}),
      );
    } catch (e) {
      console.log(e);
    }
  };

  const validateEmail = () => {
    let regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return regex.test(email.toLocaleLowerCase());
  };

  const submit = () => {
    if (!validateEmail(email)) {
      return Alert.alert('This is not a valid email.');
    }
    if (email && password) {
      setLoading(true);
      axios
        .post('http://45.82.137.69:8001/sessions', {
          email: email,
          password: password,
          rememberMe: true,
        })
        .then(res => {
          storeToken(res.data.data);
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
            <Text style={styles.title}>Login</Text>
          </View>
          <View style={styles.formContainer}>
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
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#505050"
              style={styles.formInput}
              keyboardAppearance={'dark'}
              autoCorrect={false}
              autoCapitalize={'none'}
              maxLength={200}
              secureTextEntry={true}
              clearButtonMode={'while-editing'}
              onChangeText={text => setPassword(text)}
              returnKeyType={'done'}
              onSubmitEditing={submit}
            />
            <GreenButton type={1} onPress={submit}>
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>OK</Text>
              )}
            </GreenButton>
            <TouchableOpacity
              onPress={() => navigation.navigate('ResetPassword')}>
              <Text
                style={[
                  styles.redirectButtonText,
                  {marginTop: 30, fontSize: 14},
                ]}>
                Forgot your Password ?
                <Text style={{color: '#FFA700'}}>{'  '}Reset Password</Text>
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.redirectButton}
              onPress={() => navigation.navigate('Register')}>
              <Text style={styles.redirectButtonText}>
                Don't have an account?
              </Text>
              <Text
                style={[
                  styles.redirectButtonText,
                  {color: '#FFA700', marginTop: 10},
                ]}>
                Create One
              </Text>
            </TouchableOpacity>
          </View>
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
  title: {fontSize: 35, color: '#ffffff', marginVertical: 10},
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
  bottomContainer: {
    alignItems: 'center',
  },
  redirectButton: {marginVertical: 20},
  redirectButtonText: {color: '#fff', fontSize: 18, textAlign: 'center'},
});

export default Login;
