/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const {height} = Dimensions.get('window');

const AnswerItems = ({question, index, onPress, label, title, history}) => {
  const disableStatus = question.disabledItem
      ? question.disabledItem.includes(index)
      : false,
    showHistory = question.showHistory;

  const checkAnswerStatus = type => {
    if (
      question.selectedAnswer === index &&
      question.selectedAnswer !== question.correctAnswerNumber
    ) {
      return type === 0 ? 'rgba(191,2,2,0.69)' : 'rgba(191,2,2,0.18)';
    }

    if (
      question.selectedAnswer === index &&
      question.selectedAnswer === question.correctAnswerNumber
    ) {
      return type === 0 ? 'rgba(111,191,2,0.69)' : 'rgba(111,191,2,0.18)';
    }

    return type === 0 ? 'rgba(191,191,191,0.69)' : 'rgba(191,191,191,0.18)';
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        styles.itemsContainer,
        {
          borderColor: checkAnswerStatus(0),
          backgroundColor: checkAnswerStatus(1),
        },
      ]}
      onPress={() => (!disableStatus ? onPress(index) : null)}>
      {disableStatus && <View style={styles.disabledItem} />}
      <View style={{position: 'relative', zIndex: 20}}>
        <Image
          source={require('../../assets/images/general/battle/default-answer-bg.png')}
          style={{
            height: height <= 667 ? 40 : 60,
            width: height <= 667 ? 40 : 60,
          }}
          resizeMode={'contain'}
        />
        <Text style={styles.itemLabel}>{label}</Text>
      </View>
      <Text style={styles.itemsTitle}>{title}</Text>
      {showHistory && (
        <View style={[styles.answerHistory, {width: `${history}%`}]} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemsContainer: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    width: '100%',
    borderWidth: 1,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 15,
  },
  itemLabel: {
    position: 'absolute',
    alignSelf: 'center',
    top: height <= 667 ? 5 : 10,
    color: '#fff',
    fontSize: height <= 667 ? 22 : 30,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  itemsTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
    zIndex: 20,
  },
  disabledItem: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 40,
    zIndex: 100,
  },
  answerHistory: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 40,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 10,
  },
});

export default AnswerItems;
