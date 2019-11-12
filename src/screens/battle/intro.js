/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Text, View, Image, StyleSheet, StatusBar} from 'react-native';

import axios from '../../utils/axios';
import {getToken} from '../../services/service';

import BackgroundImage from '../../components/common/backgroundImage';
import LineDivider from '../../components/common/lineDivider';
import OrangeButton from '../../components/buttons/orangeButton';

let token = null;

const emptyObject = {
  accountId: 0,
  level: 0,
  sky: 0,
  rank: 0,
  score: 0,
  coins: 0,
  totalBattlesPlayed: 0,
  winCount: 0,
  winRatio: 0,
  loseCount: 0,
  loseRatio: 0,
  totalGroupGamesCount: 0,
  aceWinCount: 0,
  continuousActiveDaysCount: 0,
  continuousActiveDaysRecord: 0,
  lastPlayDateTime: '',
  purchasedItemsCount: 0,
  invitedPlayersCount: 0,
  giftedCoins: 0,
  unlockedAchievements: 0,
  top5CategoryStats: [],
  id: 0,
  isArchived: true,
};

const Intro = ({navigation}) => {
  const [player1MiniProfile, setPlayer1Profile] = useState({name: ''});
  const [player2MiniProfile, setPlayer2Profile] = useState({name: ''});
  const [stats1, setStats1] = useState(emptyObject);
  const [stats2, setStats2] = useState(emptyObject);

  useEffect(() => {
    getToken().then(res => {
      token = res;
    });
    if (navigation.state.params) {
      getBattleInfo(navigation.state.params.id);
    }
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getBattleInfo = id => {
    axios
      .get(`/battles/${id}`)
      .then(res => {
        setPlayer1Profile(res.data.data.player1MiniProfile);
        setPlayer2Profile(res.data.data.player2MiniProfile);
        fetchPlayersStats(res.data.data.player1Id, 1);
        if (res.data.data.player2Id) {
          fetchPlayersStats(res.data.data.player2Id, 2);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const fetchPlayersStats = (playerId, type) => {
    axios
      .get(`/accounts/${playerId}/stats`)
      .then(res => {
        if (type === 1) {
          setStats1(res.data.data);
        }

        if (type === 2) {
          setStats2(res.data.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getUserTopCategory = items => {
    if (items.length > 0) {
      let result = items.map(item => item.categoryTitle);
      return result.join(',');
    }
    return '------';
  };

  return (
    <View style={styles.container}>
      <BackgroundImage type={4} />
      <StatusBar barStyle={'light-content'} />
      <View style={styles.innerContainer}>
        <View style={styles.avatarContainer}>
          {stats2.accountId !== 0 ? (
            <Image
              source={{
                uri: `http://45.82.137.69:8001/accounts/${stats2.accountId}/avatar?authorization=${token}`,
              }}
              style={styles.avatar}
              resizeMode={'contain'}
            />
          ) : null}
          <Image
            source={require('../../assets/images/general/battle/cloud.png')}
            style={styles.cloudContainer}
            resizeMode={'contain'}
          />
        </View>
        <View style={styles.overlayContainer}>
          <View style={[styles.lineContainer, {marginBottom: -5}]}>
            <View style={styles.statsItemLeft}>
              <Text style={[styles.statsValue, {color: '#FFA700'}]}>
                {player1MiniProfile.name}
              </Text>
            </View>
            <View style={styles.versusContainer}>
              <Text style={styles.versusText}>VS</Text>
            </View>
            <View style={styles.statsItemRight}>
              <Text style={[styles.statsValue, {color: '#FFA700'}]}>
                {player2MiniProfile.name}
              </Text>
            </View>
          </View>
          <LineDivider text={'STATS'} />
          <View style={styles.lineContainer}>
            <View style={styles.statsItemLeft}>
              <Text style={styles.statsValue}>{stats1.sky}</Text>
            </View>
            <View style={styles.versusContainer}>
              <Text style={styles.versusText}>SKY</Text>
            </View>
            <View style={styles.statsItemRight}>
              <Text style={styles.statsValue}>{stats2.sky}</Text>
            </View>
          </View>
          <View style={styles.lineContainer}>
            <View style={styles.statsItemLeft}>
              <Text style={styles.statsValue}>{stats1.rank}</Text>
            </View>
            <View style={styles.versusContainer}>
              <Text style={styles.versusText}>RANK</Text>
            </View>
            <View style={styles.statsItemRight}>
              <Text style={styles.statsValue}>{stats2.rank}</Text>
            </View>
          </View>
          <View style={styles.lineContainer}>
            <View style={styles.statsItemLeft}>
              <Text style={styles.statsValue}>{stats1.level}</Text>
            </View>
            <View style={styles.versusContainer}>
              <Text style={styles.versusText}>LEVEL</Text>
            </View>
            <View style={styles.statsItemRight}>
              <Text style={styles.statsValue}>{stats2.level}</Text>
            </View>
          </View>
          <View style={styles.lineContainer}>
            <View style={styles.statsItemLeft}>
              <Text style={styles.statsValue}>{stats1.winCount}</Text>
            </View>
            <View style={styles.versusContainer}>
              <Text style={styles.versusText}>WINS</Text>
            </View>
            <View style={styles.statsItemRight}>
              <Text style={styles.statsValue}>{stats2.winCount}</Text>
            </View>
          </View>
          <View style={styles.lineContainer}>
            <View style={styles.statsItemLeft}>
              <Text style={styles.statsValue}>{stats1.loseCount}</Text>
            </View>
            <View style={styles.versusContainer}>
              <Text style={styles.versusText}>LOSSES</Text>
            </View>
            <View style={styles.statsItemRight}>
              <Text style={styles.statsValue}>{stats2.loseCount}</Text>
            </View>
          </View>
          <View style={styles.lineContainer}>
            <View style={styles.statsItemLeft}>
              <Text style={[styles.statsValue, {fontSize: 13}]}>
                {getUserTopCategory(stats1.top5CategoryStats)}
              </Text>
            </View>
            <View style={styles.versusContainer}>
              <Text style={styles.versusText}>TOP SKILLS</Text>
            </View>
            <View style={styles.statsItemRight}>
              <Text style={[styles.statsValue, {fontSize: 13}]}>
                {getUserTopCategory(stats1.top5CategoryStats)}
              </Text>
            </View>
          </View>
        </View>
        <OrangeButton
          type={1}
          style={{marginBottom: 10, marginHorizontal: 10}}
          strech
          onPress={() =>
            navigation.navigate('Answer', {
              data: {
                lastGameId: navigation.state.params.lastGameId,
                id: navigation.state.params.id,
              },
            })
          }>
          <Text style={styles.buttonText}>START BATTLE</Text>
        </OrangeButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  avatarContainer: {flex: 1, justifyContent: 'flex-end', position: 'relative'},
  avatar: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignSelf: 'center',
  },
  cloudContainer: {width: '100%', marginBottom: -10},
  overlayContainer: {
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginBottom: 30,
    paddingBottom: 20,
  },
  lineContainer: {flexDirection: 'row', paddingTop: 10, alignItems: 'center'},
  statsItemLeft: {alignItems: 'flex-end', flex: 2},
  statsItemRight: {alignItems: 'flex-start', flex: 2},
  statsValue: {fontSize: 14, color: '#fff', fontWeight: 'bold'},
  versusContainer: {alignItems: 'center', flex: 1, paddingHorizontal: 10},
  versusText: {
    fontSize: 15,
    color: '#FFA700',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
});

export default Intro;
