import * as type from '../actions/type';

const initalState = {
  isLoading: true,
  data: {
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

export default function(state = initalState, action) {
  switch (action.type) {
    case type.FETCH_PROFILE:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        data: action.payload.data,
        stats: action.payload.stats,
      };
    case type.UPDATE_PROFILE:
      return {
        ...state,
        data: action.payload.data,
      };
    case type.UPDATE_STATS:
      return {
        ...state,
        stats: action.payload.stats,
      };
    default:
      return state;
  }
}
