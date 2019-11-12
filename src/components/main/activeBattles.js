/* eslint-disable react-native/no-inline-styles */
import _ from 'lodash';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';

import Avatar from '../common/avatar';

const ActiveUsers = ({navigation, accountId, items}) => {
  const errorOnPlayerTurn = text => Alert.alert(text);

  const selectGame = item => {
    if (item.game.length === 1) {
      let result = _.last(item.game);
      return navigation.navigate('Intro', {id: item.id, lastGameId: result.id});
    }

    if (item.shouldSelectCategory) {
      let result = _.last(item.game);
      return navigation.navigate('Category', {
        data: {lastGameId: result.id, id: item.id},
      });
    }

    if (item.shouldAnswer) {
      let result = _.last(item.game);
      return navigation.navigate('Answer', {
        data: {lastGameId: result.id, id: item.id},
      });
    }

    return errorOnPlayerTurn("It's not your turn.");
  };

  const checkGameStatus = item => {
    if (item.shouldSelectCategory) {
      return (
        <Image
          style={{position: 'absolute', left: 5}}
          source={require('../../assets/images/general/battle/status/yourturn.png')}
        />
      );
    }

    if (item.shouldAnswer) {
      return (
        <Image
          style={{position: 'absolute', left: 5}}
          source={require('../../assets/images/general/battle/status/yourturn.png')}
        />
      );
    }

    return (
      <Image
        style={{position: 'absolute', left: 5}}
        source={require('../../assets/images/general/battle/status/waiting.png')}
      />
    );
  };

  const yourScore = item => {
    if (item.player1Id === Number(accountId)) {
      return item.player1CorrectAnswersCount;
    }

    if (item.player2Id === Number(accountId)) {
      return item.player2CorrectAnswersCount;
    }
  };

  const opponentScore = item => {
    if (item.player1Id !== Number(accountId)) {
      return item.player1CorrectAnswersCount;
    }

    if (item.player2Id !== Number(accountId)) {
      return item.player2CorrectAnswersCount;
    }
  };

  return (
    <FlatList
      style={styles.container}
      data={items}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => {
        return (
          <TouchableOpacity
            key={item.id}
            style={styles.itemContainer}
            onPress={() => selectGame(item)}>
            <Avatar id={item.player2Id} scale={60} />
            <View
              style={[
                styles.itemsContainer,
                {
                  borderColor:
                    item.shouldAnswer || item.shouldSelectCategory
                      ? '#88BF02'
                      : 'transparent',
                },
              ]}>
              {checkGameStatus(item)}
              <View>
                <Text style={styles.username}>
                  {item.player2MiniProfile !== null
                    ? item.player2MiniProfile.name
                    : '----'}
                </Text>
                <Text style={styles.level}>
                  Level:{' '}
                  {item.player2MiniProfile !== null
                    ? item.player2MiniProfile.level
                    : '0'}
                </Text>
                <Text style={styles.time}>
                  Round: {item.game.length === 0 ? 1 : item.game.length}
                </Text>
              </View>
              <View style={{alignItems: 'flex-end', flexDirection: 'row'}}>
                <View style={styles.matchScoreContainer}>
                  <Image
                    source={require('../../assets/images/general/activityValue-2x.png')}
                    style={styles.matchScoreBackground}
                    resizeMode={'contain'}
                  />
                  <Text style={[styles.matchScoreValue, {color: '#88BF02'}]}>
                    {yourScore(item)}
                  </Text>
                  <Text style={styles.matchScoreValueText}>YOU</Text>
                </View>
                <Text style={styles.versusText}>vs</Text>
                <View style={styles.matchScoreContainer}>
                  <Image
                    source={require('../../assets/images/general/activityValue-2x.png')}
                    style={styles.matchScoreBackground}
                    resizeMode={'contain'}
                  />
                  <Text style={[styles.matchScoreValue, {color: '#B52614'}]}>
                    {opponentScore(item)}
                  </Text>
                  <Text style={styles.matchScoreValueText}>OPPONENT</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
      ListEmptyComponent={() => {
        return (
          <View
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: 10,
              paddingVertical: 8,
              height: 40,
              marginHorizontal: 20,
            }}>
            <Text style={{color: '#fff', textAlign: 'center'}}>
              No active battle
            </Text>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    position: 'relative',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemsContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    borderTopRightRadius: 35,
    paddingVertical: 8,
    height: 70,
    flex: 1,
    paddingRight: 5,
    paddingLeft: 30,
    marginBottom: 15,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'relative',
    borderWidth: 2,
  },
  itemsStatusText: {
    position: 'absolute',
    top: 5,
    bottom: 5,
    left: 10,
    transform: [{rotate: '270deg'}],
    fontSize: 9,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  username: {fontSize: 13, color: '#fff', marginBottom: 2},
  level: {fontSize: 11, color: '#fff', marginBottom: 2},
  time: {fontSize: 12, color: '#fff'},
  matchScoreContainer: {
    position: 'relative',
    height: 55,
    width: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchScoreBackground: {
    height: 55,
    position: 'absolute',
    alignSelf: 'center',
  },
  matchScoreValue: {
    fontSize: 20,
    marginBottom: 5,
  },
  matchScoreValueText: {fontSize: 7, color: '#000000'},
  versusText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
    marginHorizontal: 4,
    marginBottom: 5,
  },
});

export default ActiveUsers;
