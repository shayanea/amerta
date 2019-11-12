/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import {withNavigation} from 'react-navigation';

import Avatar from '../common/avatar';

const {width} = Dimensions.get('window');

const Header = ({profile, stats, preview, navigation}) => {
  const editAvatar = () =>
    !preview ? navigation.navigate('Avatar', {profile}) : null;

  const goToNotifications = () =>
    !preview ? navigation.navigate('Notifications') : null;

  const goToRank = () =>
    !preview ? navigation.navigate('Rank', {rank: stats.rank}) : null;

  const getUserName = () => {
    if (preview) {
      return profile.name;
    }

    return profile.nickName
      ? profile.nickName
      : `${profile.firstName} ${profile.lastName}`;
  };

  console.log(preview ? profile.accountId : profile.id);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#1C2536'} barStyle="light-content" />
      <Image
        source={require('../../assets/images/general/header/header.png')}
        style={styles.backgroundContainer}
        resizeMode="cover"
      />
      <View style={styles.innerHeaderContainer}>
        <TouchableOpacity onPress={editAvatar}>
          <Avatar
            clickable
            id={preview ? profile.accountId : profile.id}
            scale={115}
          />
        </TouchableOpacity>
        <View style={styles.userInfoContainer}>
          <Text style={styles.usernameText}>
            {!preview && `Hi${' '}`}
            {getUserName()}
          </Text>
          <View style={styles.rowContainer}>
            <Text style={styles.skyText}>
              You're in <Text style={{fontWeight: 'bold'}}>{stats.sky}th</Text>{' '}
              Sky
            </Text>
            {!preview && (
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.notificationContainer}
                onPress={goToNotifications}>
                <Image
                  style={styles.iconContainer}
                  source={require('../../assets/images/general/profile/notification.png')}
                  resizeMode={'contain'}
                />
                <View style={styles.boxContainer}>
                  <Text style={{color: '#fff', fontSize: 13}}>0</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={[styles.innerRowContainer, {marginRight: 5}]}
              onPress={goToRank}>
              <Image
                style={styles.iconContainer}
                source={require('../../assets/images/general/profile/rank.png')}
                resizeMode={'contain'}
              />
              <View style={styles.boxContainer}>
                <Text style={{color: '#fff', fontSize: 12}}>{stats.rank}</Text>
              </View>
            </TouchableOpacity>
            {!preview && (
              <View style={styles.innerRowContainer}>
                <Image
                  style={styles.iconContainer}
                  source={require('../../assets/images/general/profile/coin.png')}
                  resizeMode={'contain'}
                />
                <View style={styles.boxContainer}>
                  <Text style={{color: '#fff', fontSize: 12}}>
                    {stats.coins.toLocaleString()}
                  </Text>
                </View>
              </View>
            )}
          </View>
          <View style={styles.rowContainer}>
            <Image
              style={styles.iconContainer}
              source={require('../../assets/images/general/profile/level.png')}
              resizeMode={'contain'}
            />
            <View style={styles.levelContainer}>
              <Image
                style={[
                  styles.levelBar,
                  {width: `${(100 * stats.level) / 110}%`},
                ]}
                source={require('../../assets/images/general/profile/level-bg.png')}
                resizeMode={'cover'}
              />
              <Text style={{color: '#fff', fontSize: 13, fontWeight: 'bold'}}>
                Level: {stats.level}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width,
    height: 200,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    width,
    zIndex: -1,
  },
  innerHeaderContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  userInfoContainer: {
    flex: 1,
    height: 100,
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 15,
  },
  usernameText: {fontSize: 18, color: '#fff', marginBottom: 5},
  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  skyText: {fontSize: 14, color: '#fff'},
  notificationContainer: {flexDirection: 'row', alignItems: 'center'},
  notificationIcon: {width: 23, height: 23},
  notificationTextContainer: {
    width: 30,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
    marginLeft: 5,
  },
  iconContainer: {width: 22, height: 22},
  innerRowContainer: {flexDirection: 'row', alignItems: 'center'},
  boxContainer: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: 'rgba(0,0,0,0.4)',
    marginLeft: 5,
  },
  levelContainer: {
    height: 25,
    paddingHorizontal: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    borderRadius: 13,
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'relative',
    marginLeft: 5,
    overflow: 'hidden',
  },
  levelBar: {
    borderRadius: 13,
    position: 'absolute',
    left: 0,
  },
});

export default withNavigation(Header);
