import * as type from './type';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from '../utils/axios';
import Store from '../store';

const emptyObject = {
  email: '',
  phoneNumber: '',
  firstName: '',
  lastName: '',
  nickName: '',
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
};

const emptyObject1 = {
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
};

const getUserAccount = id => {
  return axios.get(`/accounts/${id}`);
};

const getUserProfile = id => {
  return axios.get(`/accounts/${id}/stats`);
};

export const getProfile = () => dispatch => {
  dispatch({
    type: type.FETCH_PROFILE,
    payload: {
      isLoading: true,
      data: emptyObject,
      stats: emptyObject1,
    },
  });
  AsyncStorage.getItem('@profile').then(res => {
    const userInfo = JSON.parse(res);
    let id = userInfo.accountId ? userInfo.accountId : userInfo.id;
    Promise.all([getUserAccount(id), getUserProfile(id)])
      .then(result => {
        dispatch({
          type: type.FETCH_PROFILE,
          payload: {
            isLoading: false,
            data: result[0].data.data,
            stats: result[1].data.data,
          },
        });
      })
      .catch(() => {
        dispatch({
          type: type.FETCH_PROFILE,
          payload: {
            isLoading: false,
            data: emptyObject,
            stats: emptyObject1,
          },
        });
        Alert.alert('Alert', 'There has been an error processing your request');
      });
  });
};

export const updateProfile = data => dispatch => {
  // eslint-disable-next-line dot-notation
  data['accountId'] = data.id;
  AsyncStorage.setItem('@profile', JSON.stringify(data));
  dispatch({
    type: type.UPDATE_PROFILE,
    payload: {
      data,
    },
  });
};

export const reduceCoin = number => dispatch => {
  let currentState = Store.getState();
  currentState.profile.stats.coins = currentState.profile.stats.coins - number;
  dispatch({
    type: type.UPDATE_STATS,
    payload: {
      stats: currentState.profile.stats,
    },
  });
};

export const logOut = () => dispatch => {
  AsyncStorage.removeItem('@token');
};
