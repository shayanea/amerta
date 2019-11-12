/* eslint-disable react-native/no-inline-styles */
import React, {memo} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

const OptionButton = memo(({onPress, type, title, coin, active}) => {
  const renderIcon = () => {
    switch (type) {
      case 1:
        return (
          <Image
            style={styles.optionIcon}
            source={require('../../assets/images/general/battle/option-1.png')}
            resizeMode={'contain'}
          />
        );
      case 2:
        return (
          <Image
            style={styles.optionIcon}
            source={require('../../assets/images/general/battle/option-2.png')}
            resizeMode={'contain'}
          />
        );
      case 3:
        return (
          <Image
            style={styles.optionIcon}
            source={require('../../assets/images/general/battle/option-3.png')}
            resizeMode={'contain'}
          />
        );
      case 4:
        return (
          <Image
            style={styles.optionIcon}
            source={require('../../assets/images/general/battle/option-4.png')}
            resizeMode={'contain'}
          />
        );
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.optionItems}
      onPress={() => (!active ? onPress(type) : null)}>
      {active && <View style={styles.disabledItem} />}
      <View style={styles.optionHeader}>
        <Text style={styles.optionText}>{title}</Text>
        {renderIcon()}
      </View>
      <View style={styles.optionBackground}>
        <Image
          source={require('../../assets/images/general/battle/coin.png')}
          style={{height: 18, width: 18, marginRight: 2}}
          resizeMode={'contain'}
        />
        <Text style={styles.optionIconText}>{coin}</Text>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  optionItems: {
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(2,176,191,0.69)',
    backgroundColor: 'rgba(0,39,54,0.83)',
    borderRadius: 10,
    padding: 5,
    paddingTop: 10,
    width: width / 4.6,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  optionIcon: {width: 18, height: 18, marginLeft: 5},
  optionBackground: {
    position: 'relative',
    height: 30,
    backgroundColor: '#D41918',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
    paddingHorizontal: 2,
  },
  optionIconText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  disabledItem: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 10,
    zIndex: 100,
  },
});

export default OptionButton;
