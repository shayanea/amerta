/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import axios from '../../utils/axios';

import BackgroundImage from '../../components/common/backgroundImage';
import Avatar from '../../components/common/avatar';
import OrangeButton from '../../components/buttons/orangeButton';

const emptyObject = {
  name: '',
  level: 0,
  correctAnswers: 0,
  avatarImageId: null,
};

const GameStats = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [player1, setPlayer1Stats] = useState(emptyObject);
  const [player2, setPlayer2Stats] = useState(emptyObject);
  const [games, setGames] = useState([]);
  const [winnerPlayerId, setWinnerPlayerId] = useState(null);

  useEffect(() => {
    fetchStats(navigation.state.params.id);
  }, []);

  const fetchStats = id => {
    Promise.all([fetchBattle(id), fetchGames(id)]).then(res => {
      let result = res[0].data.data;
      setLoading(false);
      setPlayer1Stats({
        name: result.player1MiniProfile.name,
        level: result.player1MiniProfile.level,
        correctAnswers: result.player1CorrectAnswersCount,
        id: result.player1Id,
      });
      setPlayer2Stats({
        name: result.player2MiniProfile.name,
        level: result.player2MiniProfile.level,
        correctAnswers: result.player2CorrectAnswersCount,
        id: result.player2Id,
      });
      setGames(res[1].data.data);
      setWinnerPlayerId(res[0].data.data.winnerPlayerId);
    });
  };

  const fetchBattle = id => {
    return axios.get(`/battles/${id}`);
  };

  const fetchGames = id => {
    return axios.get(`/battles/${id}/games`);
  };

  const renderPlayer1Circle = item => {
    if (!item.player1SelectedAnswer) {
      return <View style={styles.emptyCircle} />;
    }
    if (
      item.player1SelectedAnswer &&
      item.player1SelectedAnswer === item.correctAnswerNumber
    ) {
      return <View style={styles.greenCirlce} />;
    } else {
      return <View style={styles.redCircle} />;
    }
  };

  const renderPlayer2Circle = item => {
    if (!item.player2SelectedAnswer) {
      return <View style={styles.emptyCircle} />;
    }
    if (
      item.player2SelectedAnswer &&
      item.player2SelectedAnswer === item.correctAnswerNumber
    ) {
      return <View style={styles.greenCirlce} />;
    } else {
      return <View style={styles.redCircle} />;
    }
  };

  return (
    <View style={styles.container}>
      <BackgroundImage type={2} />
      <View style={styles.innerContainer}>
        <View style={styles.levelContainer}>
          <Text style={styles.levelText}>{player1.level}</Text>
          <View style={styles.line} />
          <Text style={styles.levelText}>Level</Text>
          <View style={styles.line} />
          <Text style={styles.levelText}>{player2.level}</Text>
        </View>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarColumn}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('UserStats', {accountId: player1.id})
              }>
              <Avatar id={player1.id} scale={80} />
            </TouchableOpacity>
            <Text style={styles.avatarName}>{player1.name}</Text>
          </View>
          <View style={styles.avatarColumn}>
            <View style={styles.correctAnswersContainer}>
              <View
                style={[
                  styles.answerResultContainer,
                  {
                    backgroundColor:
                      player1.correctAnswers > player2.correctAnswers
                        ? 'rgba(136,191,2,0.69)'
                        : 'transparent',
                    borderColor:
                      player1.correctAnswers > player2.correctAnswers
                        ? 'rgba(136,191,2,1)'
                        : 'transparent',
                  },
                ]}>
                <Text style={styles.answerResult}>
                  {player1.correctAnswers}
                </Text>
              </View>
              <View
                style={[
                  styles.answerResultContainer,
                  {
                    backgroundColor:
                      player2.correctAnswers > player1.correctAnswers
                        ? 'rgba(136,191,2,0.69)'
                        : 'transparent',
                    borderColor:
                      player2.correctAnswers > player1.correctAnswers
                        ? 'rgba(136,191,2,1)'
                        : 'transparent',
                  },
                ]}>
                <Text style={styles.answerResult}>
                  {player2.correctAnswers}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.avatarColumn}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('UserStats', {
                  accountId: player2.id,
                })
              }>
              <Avatar id={player2.id} scale={80} />
            </TouchableOpacity>
            <Text style={styles.avatarName}>{player2.name}</Text>
          </View>
        </View>
        {isLoading && <ActivityIndicator color="#fff" />}
        <ScrollView
          style={{padding: 20, flex: 1}}
          contentContainerStyle={styles.statsContainer}>
          {games.map((item, index) => {
            if (item.questions.length > 0) {
              return (
                <View key={index} style={styles.statsItemContainer}>
                  {renderPlayer1Circle(item.questions[0])}
                  {renderPlayer1Circle(item.questions[1])}
                  {renderPlayer1Circle(item.questions[2])}
                  <Text style={styles.categoryTitle}>
                    {item.selectedCategory.title}
                  </Text>
                  {renderPlayer2Circle(item.questions[0])}
                  {renderPlayer2Circle(item.questions[1])}
                  {renderPlayer2Circle(item.questions[2])}
                </View>
              );
            }
          })}
        </ScrollView>
        <OrangeButton
          type={1}
          style={{flex: 0.3, marginHorizontal: 20}}
          onPress={() => {
            winnerPlayerId === null
              ? navigation.navigate('Main', {status: true})
              : navigation.navigate('Finish', {id: navigation.state.params.id});
          }}>
          <Text style={styles.buttonText}>CONTINUE</Text>
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
    paddingTop: 40,
  },
  backgroundContainer: {position: 'absolute', width: '100%', height: '100%'},
  levelContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
  },
  levelText: {color: '#ffffff', fontSize: 20, fontWeight: 'bold'},
  line: {
    height: 1,
    width: 15,
    backgroundColor: 'rgba(2,176,191,0.69)',
    marginHorizontal: 5,
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  avatarColumn: {justifyContent: 'center', alignItems: 'center', flex: 1},
  avatarName: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  correctAnswersContainer: {
    width: 120,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'rgba(2,140,191,0.18)',
    backgroundColor: 'rgba(2,176,191,0.18)',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  answerResultContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  answerResult: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statsContainer: {justifyContent: 'center', flexDirection: 'column'},
  statsItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(2,176,191,0.69)',
    backgroundColor: 'rgba(0,39,54,0.83)',
    borderRadius: 10,
    marginBottom: 15,
    flex: 1,
    padding: 20,
  },
  categoryTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  greenCirlce: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#72D317',
    marginHorizontal: 5,
  },
  redCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#D31717',
    marginHorizontal: 5,
  },
  emptyCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(80,80,80,0.50)',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
});

export default GameStats;
