/* eslint-disable radix */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {Component, Fragment} from 'react';
import {
  Text,
  View,
  Alert,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';

import {withNavigationFocus} from 'react-navigation';

import axios from '../../utils/axios';

import BackgroundImage from '../../components/common/backgroundImage';
import Header from '../../components/header/header';
import LineDivider from '../../components/common/lineDivider';

const {width} = Dimensions.get('window');

const getUserAccount = id => {
  return axios.get(`/accounts/${id}/profile`);
};

const getUserProfile = id => {
  return axios.get(`/accounts/${id}/stats`);
};

class Profile extends Component {
  state = {
    current: new Date().getTime(),
    profile: {
      email: '',
      phoneNumber: '',
      name: '',
      genderId: '',
      birthDate: '',
      statusId: '',
      statusNote: '',
      avatarImageId: '',
      coverImageId: '',
      isEmailVerified: true,
      isPhoneNumberVerified: true,
      timezone: '',
      avatarItemIds: [],
      roleIds: [],
      receiveNotifications: true,
      searchableByEmailAddressOrUsername: true,
      friendsOnlyBattleInvitations: true,
      id: null,
    },
    stats: {
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
      top3Skills: '',
      top5CategoryStats: [],
      id: null,
      isArchived: true,
    },
  };

  componentDidMount() {
    this.fetchUserData(this.props.navigation.state.params.accountId);
  }

  fetchUserData = id => {
    Promise.all([getUserAccount(id), getUserProfile(id)])
      .then(res => {
        this.setState({profile: res[0].data.data, stats: res[1].data.data});
      })
      .catch(err => {
        Alert.alert(
          typeof err.data.error.errorDescription
            ? err.data.error.errorDescription
            : 'There has been an error processing your request',
        );
      });
  };

  // componentDidUpdate(prevProps) {
  //   if (this.props.isFocused && prevProps.isFocused !== this.props.isFocused) {
  //     // eslint-disable-next-line react/no-did-update-set-state
  //     this.setState({current: new Date().getTime()});
  //   }
  // }

  logOut = () => {
    Alert.alert(
      'Notice!',
      'Are you sure you want to log out?',
      [
        {
          text: 'No',
          onPress: () => true,
          style: 'cancel',
        },
        {
          text: "Yes, I'm sure",
          onPress: () => {
            this.props.logOut();
            return this.props.navigation.navigate('Auth');
          },
        },
      ],
      {cancelable: true},
    );
  };

  render() {
    const {profile, stats} = this.state;
    return (
      <View style={styles.container}>
        <BackgroundImage type={1} />
        <Header
          current={this.props.isFocused}
          profile={profile}
          stats={stats}
          preview
        />
        <ScrollView
          style={styles.innerContainer}
          contentContainerStyle={{paddingBottom: 30}}>
          {stats.totalBattlesPlayed !== 0 && (
            <View style={styles.statusContainer}>
              <View style={{flexDirection: 'row', marginBottom: 10}}>
                <View style={styles.bulletContainer}>
                  <View
                    style={[styles.bulletItem, {backgroundColor: '#88BF02'}]}
                  />
                  <Text style={styles.bulletText}>Win</Text>
                </View>
              </View>
              <View style={styles.chartContainer}>
                {stats.winRatio !== 0 && (
                  <View
                    style={[
                      styles.lineChartContainer,
                      {
                        width: `${parseInt(stats.winRatio * 100)}%`,
                        zIndex: 10,
                        elevation: 10,
                        backgroundColor: '#88BF02',
                      },
                    ]}>
                    <Text style={styles.lineChartText}>
                      {parseInt(stats.winRatio * 100)}%
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}
          <View style={styles.resultContainer}>
            <Text style={styles.statusTitleText}>Total Battles</Text>
            <Text style={styles.sttausValueText}>
              {stats.totalBattlesPlayed}
            </Text>
          </View>
          <View style={styles.resultContainer}>
            <Text style={styles.statusTitleText}>Wins</Text>
            <Text style={styles.sttausValueText}>{stats.winCount}</Text>
          </View>
          <View style={styles.resultContainer}>
            <Text style={styles.statusTitleText}>Ace wins</Text>
            <Text style={styles.sttausValueText}>{stats.aceWinCount}</Text>
          </View>
          <View style={styles.resultContainer}>
            <Text style={styles.statusTitleText}>Continuous active days</Text>
            <Text style={styles.sttausValueText}>
              {stats.continuousActiveDaysCount}
            </Text>
          </View>
          <View style={styles.resultContainer}>
            <Text style={styles.statusTitleText}>Gifted coins</Text>
            <Text style={styles.sttausValueText}>{stats.giftedCoins}</Text>
          </View>
          <LineDivider dark text={'TOP 5 CATEGORIES'} />
          <View style={{marginBottom: 15}}>
            {stats.top5CategoryStats.map((item, index) => {
              let lineWidth = parseInt(
                (100 * item.correctAnswersCount) / item.totalQuestionsCount,
              );
              return (
                <Fragment key={index}>
                  <Text style={styles.barChartBackgroundText}>
                    {item.categoryTitle}
                  </Text>
                  <View style={styles.barChartContainer}>
                    {lineWidth !== 0 && (
                      <View
                        style={[
                          styles.barChartBackgroundColor,
                          {
                            width: `${lineWidth}%`,
                            backgroundColor: '#88BF02',
                          },
                        ]}
                      />
                    )}
                    <Text style={styles.barChartValueText}>
                      {parseInt(
                        (100 * item.correctAnswersCount) /
                          item.totalQuestionsCount,
                      )}
                      %
                    </Text>
                  </View>
                </Fragment>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 25,
  },
  buttonContainer: {
    position: 'relative',
    width: width / 2 - 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    marginBottom: 20,
    flexDirection: 'row',
  },
  buttonImageContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  buttonIconContainer: {
    height: 25,
    width: 25,
    position: 'absolute',
    left: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  statusContainer: {
    marginVertical: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.36)',
    backgroundColor: 'rgba(0,0,0,0.50)',
    borderRadius: 20,
    padding: 15,
  },
  bulletContainer: {
    marginRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bulletItem: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  bulletText: {fontSize: 14, color: '#fff', fontWeight: 'bold'},
  chartContainer: {
    flexDirection: 'row',
    position: 'relative',
    height: 25,
    width: '100%',
  },
  lineChartContainer: {
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    height: 25,
    backgroundColor: '#88BF02',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  lineChartText: {
    color: '#fff',
    fontSize: 14,
  },
  resultContainer: {
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#818181',
  },
  statusTitleText: {fontSize: 16, color: '#fff'},
  sttausValueText: {fontSize: 16, color: '#fff'},
  barChartContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 15,
    height: 25,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  barChartBackgroundColor: {
    height: 25,
    borderRadius: 15,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  barChartBackgroundText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  barChartValueText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    right: 10,
    top: 2,
  },
});

export default withNavigationFocus(Profile);
