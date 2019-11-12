/* eslint-disable react-native/no-inline-styles */
import React, {memo} from 'react';
import {
  View,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';

import DismissKeyboard from '../../components/common/dismissKeyboard';
import BackgroundImage from '../../components/common/backgroundImage';
import RedButton from '../../components/buttons/redButton';

const Intro = memo(({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <BackgroundImage type={0} />
      <DismissKeyboard>
        <View style={styles.innerContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={{width: '100%'}}
              source={require('../../assets/images/general/characters/splash.png')}
              resizeMode={'contain'}
            />
          </View>
          <View style={styles.headerContainer}>
            <Image
              source={require('../../assets/images/general/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>LIVES ON THE SEVENTH FLOOR OF SKY</Text>
          </View>
          <View style={styles.bottomContainer}>
            <RedButton type={1} onPress={() => navigation.navigate('Register')}>
              <Text style={styles.buttonText}>Register with Email</Text>
            </RedButton>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.redirectButton}
              onPress={() => navigation.navigate('Login')}>
              <Text style={styles.redirectButtonText}>
                Already have an account?
                <Text style={{color: '#FFA700'}}>{'  '}Login</Text>
              </Text>
            </TouchableOpacity>
            <Text style={styles.copyRight}>
              All right reserverd. Amerta Studio 2019
            </Text>
          </View>
        </View>
      </DismissKeyboard>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#000'},
  innerContainer: {
    flex: 1,
    position: 'relative',
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
  title: {color: '#ffffff', fontSize: 12, textAlign: 'center'},
  imageContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  redirectButton: {marginVertical: 20},
  redirectButtonText: {color: '#fff', fontSize: 18},
  copyRight: {color: '#BABABA', fontSize: 13},
});

export default Intro;
