/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';

import {getUser, getToken} from '../../services/service';
import axios from '../../utils/axios';

import BackgroundImage from '../../components/common/backgroundImage';
import OrangeButton from '../../components/buttons/orangeButton';

let accountId = null,
  token = null;

const emptyObject = {
  id: null,
  name: '',
  level: 0,
  correctAnswers: 0,
};

const FinishedGame = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [winnerPlayerId, setWinnerPlayerId] = useState(null);
  const [player1, setPlayer1Stats] = useState(emptyObject);
  const [player2, setPlayer2Stats] = useState(emptyObject);

  useEffect(() => {
    // navigation.state.params.id
    getToken().then(res => (token = res));
    getUser().then(res => {
      accountId = res.accountId;
      fetchGameStats(62);
    });
  }, []);

  const fetchGameStats = id => {
    Promise.all([fetchBattle(id), fetchGames(id)]).then(res => {
      let result = res[0].data.data;
      setLoading(false);
      setPlayer1Stats({
        id: result.player1Id,
        name: result.player1MiniProfile.name,
        level: result.player1MiniProfile.level,
        correctAnswers: result.player1CorrectAnswersCount,
      });
      setPlayer2Stats({
        id: result.player2Id,
        name: result.player2MiniProfile.name,
        level: result.player2MiniProfile.level,
        correctAnswers: result.player2CorrectAnswersCount,
      });
      setWinnerPlayerId(result.winnerPlayerId);
    });
  };

  const fetchBattle = id => {
    return axios.get(`/battles/${id}`);
  };

  const fetchGames = id => {
    return axios.get(`/battles/${id}/games`);
  };

  const sendRequest = () => {
    setLoading(true);
    axios
      .post(`/accounts/${accountId}/friendrequests`, {
        friendAccountId:
          player2.id === Number(accountId) ? player1.id : player2.id,
      })
      .then(res => {
        Alert.alert('Friend Invitation Sent.');
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        Alert.alert(
          typeof err.data.error.errorDescription
            ? err.data.error.errorDescription
            : 'There has been an error processing your request',
        );
      });
  };

  const sendInvitation = () => {
    setLoading(true);
    let id = player2.id === Number(accountId) ? player1.id : player2.id;
    axios
      .post(`/accounts/${id}/battleinvitations`)
      .then(res => {
        Alert.alert('Battle Invitation Sent.');
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        Alert.alert(
          typeof err.data.error.errorDescription
            ? err.data.error.errorDescription
            : 'There has been an error processing your request',
        );
      });
  };

  return (
    <View style={styles.container}>
      <BackgroundImage type={5} />
      <View style={styles.resultContainer}>
        <Image
          resizeMode={'contain'}
          style={{position: 'absolute', alignSelf: 'center', top: -30}}
          source={
            Number(accountId) === winnerPlayerId
              ? require('../../assets/images/general/battle/winner-badge.png')
              : require('../../assets/images/general/battle/loser-badge.png')
          }
        />
        <View style={styles.resultTextContainer}>
          <View
            style={[
              styles.resultCircle,
              {
                borderColor:
                  player1.id === winnerPlayerId
                    ? 'rgba(111,191,2,0.69)'
                    : 'rgba(191,2,2,0.69)',
                backgroundColor:
                  player1.id === winnerPlayerId
                    ? 'rgba(2,191,2,0.18)'
                    : 'rgba(191,2,2,0.18)',
              },
            ]}>
            <Text style={styles.resultCircleText}>
              {player1.correctAnswers}
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}>
            <Text style={styles.userName}>{player1.name}</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() =>
                  navigation.navigate('Chat', {
                    id: player2.id,
                    name: player2.name,
                  })
                }>
                <Image
                  style={{height: 45, width: 45}}
                  source={require('../../assets/images/general/friends/message.png')}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.9} onPress={sendRequest}>
                <Image
                  style={{height: 45, width: 45, marginLeft: 10}}
                  source={require('../../assets/images/general/friends/add.png')}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.9} onPress={sendInvitation}>
                <Image
                  style={{height: 45, width: 45, marginLeft: 10}}
                  source={require('../../assets/images/general/battle/retrye.png')}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={[
              styles.resultCircle,
              {
                borderColor:
                  player2.id === winnerPlayerId
                    ? 'rgba(111,191,2,0.69)'
                    : 'rgba(191,2,2,0.69)',
                backgroundColor:
                  player2.id === winnerPlayerId
                    ? 'rgba(2,191,2,0.18)'
                    : 'rgba(191,2,2,0.18)',
              },
            ]}>
            <Text style={styles.resultCircleText}>
              {player2.correctAnswers}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.avatarContainer}>
        {accountId ? (
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.avatarItem}
            onPress={() => navigation.navigate('UserStats', {accountId})}>
            <Image
              source={{
                uri: `http://45.82.137.69:8001/accounts/${accountId}/avatar?authorization=${token}`,
              }}
              style={{height: '100%', width: '100%'}}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        ) : null}
        <Image
          source={require('../../assets/images/general/battle/cloud.png')}
          style={{width: '100%', marginBottom: -10}}
          resizeMode={'contain'}
        />
      </View>
      <OrangeButton
        type={1}
        style={{marginHorizontal: 20, flex: 0.3}}
        onPress={() => navigation.navigate('Main')}>
        <Text style={styles.buttonText}>BACK TO HOME</Text>
      </OrangeButton>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="#fff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  resultContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#707070',
    borderBottomColor: '#707070',
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginTop: 80,
  },
  resultTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultCircleText: {fontSize: 30, fontWeight: 'bold', color: '#fff'},
  avatarContainer: {flex: 1, justifyContent: 'flex-end'},
  avatarItem: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  userName: {fontSize: 20, color: '#fff', marginBottom: 10},
  loadingContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
});

export default FinishedGame;
