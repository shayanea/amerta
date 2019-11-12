import React from 'react';
import {Image, StyleSheet} from 'react-native';

const BackgroundImage = ({type}) => {
  switch (type) {
    case 0:
      return (
        <Image
          source={require('../../assets/images/general/battle/sky/00.jpg')}
          style={styles.container}
          resizeMode="cover"
        />
      );
    case 1:
      return (
        <Image
          source={require('../../assets/images/general/battle/sky/01.jpg')}
          style={styles.container}
          resizeMode="cover"
        />
      );
    case 2:
      return (
        <Image
          source={require('../../assets/images/general/battle/sky/02.jpg')}
          style={styles.container}
          resizeMode="cover"
        />
      );
    case 3:
      return (
        <Image
          source={require('../../assets/images/general/battle/sky/03.jpg')}
          style={styles.container}
          resizeMode="stretch"
        />
      );
    case 4:
      return (
        <Image
          source={require('../../assets/images/general/battle/sky/04.jpg')}
          style={styles.container}
          resizeMode="cover"
        />
      );
    case 5:
      return (
        <Image
          source={require('../../assets/images/general/battle/sky/05.jpg')}
          style={styles.container}
          resizeMode="cover"
        />
      );
    case 6:
      return (
        <Image
          source={require('../../assets/images/general/battle/sky/06.jpg')}
          style={styles.container}
          resizeMode="cover"
        />
      );
    case 7:
      return (
        <Image
          source={require('../../assets/images/general/battle/sky/07.jpg')}
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
