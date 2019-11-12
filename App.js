import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// import AsyncStorage from '@react-native-community/async-storage';
// AsyncStorage.clear();

// Redux Store
import store from './src/store';
// Loading
import AuthLoadingScreen from './src/screens/authLoading';
// Auth
import IntroScreen from './src/screens/auth/intro';
import LoginScreen from './src/screens/auth/login';
import RegisterScreen from './src/screens/auth/register';
import ResetPasswordScreen from './src/screens/auth/resetPassword';
// Tab
import TabNavigator from './src/components/tab/tab';
// Battle
import StartScreen from './src/screens/battle/start';
import CategoriesScreen from './src/screens/battle/categories';
import CustomCategoryScreen from './src/screens/battle/customCategory';
import BattleIntroScreen from './src/screens/battle/intro';
import AnswerScreen from './src/screens/battle/answer';
import GameStatsScreen from './src/screens/battle/stats';
import FinishedGameScreen from './src/screens/battle/finished';
import ChatScreen from './src/screens/friends/chat';
import UserStatsScreen from './src/screens/battle/userStats';
// Rank
import RankScreen from './src/screens/profile/rank';
// Notification
import NotificationsScreen from './src/screens/profile/notifications';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const AuthStack = createStackNavigator(
  {
    Intro: IntroScreen,
    Register: RegisterScreen,
    Login: LoginScreen,
    ResetPassword: ResetPasswordScreen,
  },
  {
    initialRouteName: 'Intro',
    headerMode: 'none',
  },
);

const BattleStack = createStackNavigator(
  {
    Start: StartScreen,
  },
  {
    initialRouteName: 'Start',
    headerMode: 'none',
  },
);

const FinishedStack = createStackNavigator(
  {
    Finished: FinishedGameScreen,
    Chat: ChatScreen,
  },
  {
    initialRouteName: 'Finished',
    headerMode: 'none',
  },
);

const MainStack = createStackNavigator(
  {
    Main: TabNavigator,
    Battle: BattleStack,
    Intro: BattleIntroScreen,
    Category: CategoriesScreen,
    CustomCategory: CustomCategoryScreen,
    Answer: AnswerScreen,
    GameStats: GameStatsScreen,
    Finished: FinishedStack,
    Rank: RankScreen,
    Notifications: NotificationsScreen,
    UserStats: UserStatsScreen,
  },
  {
    initialRouteName: 'Main',
    headerMode: 'none',
  },
);

const AppStack = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    App: MainStack,
  },
  {
    initialRouteName: 'AuthLoading',
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(AppStack);

const App = () => {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#1C2536'},
});

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

export default App;
