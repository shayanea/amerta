/* eslint-disable react-native/no-inline-styles */
import React from 'react';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
import {View, Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
// Main
import MainScreen from '../../screens/main/main';
// Trophies
import TrophiesScreen from '../../screens/trophies/trophies';
import TutorialScreen from '../../screens/trophies/tutorial';
// Friends
import FriendsScreen from '../../screens/friends/friends';
import FriendsRequestsScreen from '../../screens/friends/requests';
import ChatScreen from '../../screens/friends/chat';
// Shop
import ShopScreen from '../../screens/shop/shop';
// Profile
import ProfileScreen from '../../screens/profile/profile';
import EditProfileScreen from '../../screens/profile/edit';
import AvatarScreen from '../../screens/profile/avatar';

const TabBarComponent = props => <BottomTabBar {...props} />;

const MainStack = createStackNavigator(
  {
    Main: MainScreen,
  },
  {
    initialRouteName: 'Main',
    headerMode: 'none',
  },
);

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
    Edit: EditProfileScreen,
    Avatar: AvatarScreen,
  },
  {
    initialRouteName: 'Profile',
    headerMode: 'none',
  },
);

const TrophieStack = createStackNavigator(
  {
    Trophies: TrophiesScreen,
    Tutorial: TutorialScreen,
  },
  {
    initialRouteName: 'Trophies',
    headerMode: 'none',
  },
);

const FriendsStack = createStackNavigator(
  {
    Friends: FriendsScreen,
    Requests: FriendsRequestsScreen,
    Chat: ChatScreen,
  },
  {
    initialRouteName: 'Friends',
    headerMode: 'none',
  },
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: MainStack,
      navigationOptions: {
        tabBarIcon: ({focused}) => {
          return (
            <View style={{position: 'relative'}}>
              <Image
                style={styles.tabIcon}
                source={require('../../assets/images/general/tab/icon3-2x.png')}
              />
              {focused && (
                <Image
                  style={styles.tabIconActive}
                  source={require('../../assets/images/general/tab/glow-2x.png')}
                />
              )}
            </View>
          );
        },
      },
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <View style={{position: 'relative'}}>
            <Image
              style={styles.tabIcon}
              source={require('../../assets/images/general/tab/icon1-2x.png')}
            />
            {focused && (
              <Image
                style={styles.tabIconActive}
                source={require('../../assets/images/general/tab/glow-2x.png')}
              />
            )}
          </View>
        ),
      },
    },
    FriendList: {
      screen: FriendsStack,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <View style={{position: 'relative'}}>
            <Image
              style={styles.tabIcon}
              source={require('../../assets/images/general/tab/icon4-2x.png')}
            />
            {focused && (
              <Image
                style={styles.tabIconActive}
                source={require('../../assets/images/general/tab/glow-2x.png')}
              />
            )}
          </View>
        ),
      },
    },
    Shop: {
      screen: ShopScreen,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <View style={{position: 'relative'}}>
            <Image
              style={styles.tabIcon}
              source={require('../../assets/images/general/tab/icon5-2x.png')}
            />
            {focused && (
              <Image
                style={styles.tabIconActive}
                source={require('../../assets/images/general/tab/glow-2x.png')}
              />
            )}
          </View>
        ),
      },
    },
    Trophies: {
      screen: TrophieStack,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <View style={{position: 'relative'}}>
            <Image
              style={styles.tabIcon}
              source={require('../../assets/images/general/tab/icon2-2x.png')}
            />
            {focused && (
              <Image
                style={styles.tabIconActive}
                source={require('../../assets/images/general/tab/glow-2x.png')}
              />
            )}
          </View>
        ),
      },
    },
  },
  {
    order: ['Profile', 'Trophies', 'Home', 'FriendList', 'Shop'],
    initialRouteName: 'Profile',
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'transparent',
      activeBackgroundColor: 'transparent',
      inactiveTintColor: 'transparent',
      showLabel: false,
      style: {
        backgroundColor: '#1C2536',
        borderTopColor: 'transparent',
      },
    },
    indicatorStyle: {
      backgroundColor: 'transparent',
    },
    tabStyle: {
      backgroundColor: 'transparent',
    },
    tabBarComponent: props => {
      return (
        <View style={{backgroundColor: 'transparent'}}>
          <TabBarComponent {...props} style={styles.bottomContainer} />
          <Image
            source={require('../../assets/images/general/tab/bottomBar.png')}
            style={styles.bottomBackground}
            resizeMode="cover"
          />
        </View>
      );
    },
  },
);

const styles = StyleSheet.create({
  tabIcon: {
    width: 60,
    height: 60,
    position: 'relative',
    bottom: 15,
  },
  tabIconActive: {
    position: 'absolute',
    bottom: 12,
    left: -5,
    width: 70,
    height: 30,
  },
  bottomContainer: {
    position: 'relative',
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  bottomBackground: {
    position: 'absolute',
    width: '100%',
    height: 165,
    top: -65,
    zIndex: -1,
  },
});

export default TabNavigator;
