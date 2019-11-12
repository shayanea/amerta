/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {NavigationActions} from 'react-navigation';

import Avatar from '../common/avatar';

const RecentBattles = props => {
  const yourScore = item => {
    if (item.player1Id === Number(props.accountId)) {
      return item.player1CorrectAnswersCount;
    }

    if (item.player2Id === Number(props.accountId)) {
      return item.player2CorrectAnswersCount;
    }
  };

  const opponentScore = item => {
    if (item.player1Id !== Number(props.accountId)) {
      return item.player1CorrectAnswersCount;
    }

    if (item.player2Id !== Number(props.accountId)) {
      return item.player2CorrectAnswersCount;
    }
  };

  return (
    <FlatList
      style={styles.container}
      data={props.items}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => {
        return (
          <TouchableOpacity
            key={item.id}
            style={styles.itemContainer}
            onPress={() => {
              props.navigation.dispatch(
                NavigationActions.navigate({
                  routeName: 'Finished',
                  params: {
                    id: item.id,
                  },
                }),
              );
            }}>
            <Avatar id={item.player2Id} scale={60} />
            <View
              style={[
                styles.itemsContainer,
                {
                  backgroundColor:
                    Number(props.accountId) === item.winnerPlayerId
                      ? 'rgba(136,191,2,0.25)'
                      : 'rgba(255,0,0,0.25)',
                },
              ]}>
              {Number(props.accountId) === item.winnerPlayerId ? (
                <Image
                  style={{position: 'absolute', left: 5}}
                  source={require('../../assets/images/general/battle/status/won.png')}
                />
              ) : (
                <Image
                  style={{position: 'absolute', left: 5}}
                  source={require('../../assets/images/general/battle/status/lost.png')}
                />
              )}
              <View>
                <Text style={styles.username}>
                  {item.player1MiniProfile !== null
                    ? item.player1MiniProfile.name
                    : '----'}
                </Text>
                <Text style={styles.level}>
                  Level:{' '}
                  {item.player1MiniProfile !== null
                    ? item.player1MiniProfile.level
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
              No recent battle
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
    marginBottom: 30,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemsContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    borderTopRightRadius: 35,
    paddingVertical: 10,
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
  },
  itemsStatusText: {
    position: 'absolute',
  },
  username: {fontSize: 15, color: '#fff', marginBottom: 2},
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
    marginHorizontal: 4,
    marginBottom: 5,
  },
});

export default RecentBattles;
