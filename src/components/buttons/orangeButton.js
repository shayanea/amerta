/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';

let source = '';

const getImage = type => {
  switch (type) {
    case 1:
      return (source = require('../../assets/images/general/buttons/orange/bigOrangeButton.png'));
    default:
      return null;
  }
};

const GreenButton = ({type, children, style, onPress, strech}) => {
  getImage(type);
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.container, style, {height: type === 1 ? 70 : 60}]}
      onPress={onPress}>
      <Image
        style={styles.imageContainer}
        source={source}
        resizeMode={strech ? 'stretch' : 'contain'}
      />
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
});

export default GreenButton;
