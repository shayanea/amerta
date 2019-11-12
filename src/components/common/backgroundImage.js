import React from 'react';
import {Image, StyleSheet} from 'react-native';

const BackgroundImage = ({type}) => {
  switch (type) {
    case 0:
      return (
        <Image
          source={require('../../assets/images/general/bg-splash.png')}
          style={styles.container}
          resizeMode="cover"
        />
      );
    case 1:
      return (
        <Image
          source={require('../../assets/images/general/bg_1.png')}
          style={styles.container}
          resizeMode="cover"
        />
      );
    case 2:
      return (
        <Image
          source={require('../../assets/images/general/bg_2.png')}
          style={styles.container}
          resizeMode="cover"
        />
      );
    case 3:
      return (
        <Image
          source={require('../../assets/images/general/bg.png')}
          style={styles.container}
          resizeMode="stretch"
        />
      );
    case 4:
      return (
        <Image
          source={require('../../assets/images/general/battle/bg.png')}
          style={styles.container}
          resizeMode="cover"
        />
      );
    case 5:
      return (
        <Image
          source={require('../../assets/images/general/battle/bg2.png')}
          style={styles.container}
          resizeMode="cover"
        />
      );
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  container: {position: 'absolute', top: 0, right: 0, bottom: 0, left: 0},
});

export default BackgroundImage;
