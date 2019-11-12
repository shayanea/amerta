/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Line = ({dark, text}) => (
  <View style={styles.container}>
    <View style={styles.textContainer}>
      <Text style={[styles.text, {color: dark ? '#fff' : 'rgba(255,167,0,1)'}]}>
        {text}
      </Text>
    </View>
    <View
      style={[
        styles.line,
        {
          backgroundColor: dark ? 'rgba(2,176,191,0.69)' : 'rgba(255,167,0,1)',
        },
      ]}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 15,
    alignItems: 'center',
    position: 'relative',
  },
  textContainer: {
    paddingHorizontal: 15,
    paddingVertical: 2,
    backgroundColor: '#021A1C',
    borderRadius: 20,
    zIndex: 5,
    elevation: 5,
  },
  text: {
    fontSize: 14,
  },
  line: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    height: 1,
  },
});

export default Line;
