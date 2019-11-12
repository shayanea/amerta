/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

import {getUser} from '../../services/service';
import axios from '../../utils/axios';

import BackgroundImage from '../../components/common/backgroundImage';
import InnerHeader from '../../components/header/innerHeader';
import InvitePlayers from '../../components/battle/invitePlayers';
import SearchPlayers from '../../components/battle/searchPlayers';

let id = null;

const LeftComponent = ({navigation}) => (
  <TouchableOpacity
    style={[
      styles.rightButtonContainer,
      {flexDirection: 'row', alignItems: 'center'},
    ]}
    activeOpacity={0.9}
    onPress={() => navigation.navigate('Main')}>
    <Image
      style={styles.backButtonImage}
      source={require('../../assets/images/general/buttons/back-button.png')}
      resizeMode="contain"
    />
    <Text style={[styles.boxText, {fontSize: 20}]}>Start New Battle</Text>
  </TouchableOpacity>
);

const RightComponent = ({coins}) => (
  <TouchableOpacity activeOpacity={0.9} style={styles.coinContainer}>
    <Text style={[styles.boxText, {marginRight: 5}]}>Coins</Text>
    <Image
      source={require('../../assets/images/general/profile/coin.png')}
      style={styles.iconContainer}
      resizeMode="contain"
    />
    <View style={styles.boxContainer}>
      <Text style={styles.boxText}>{coins.toLocaleString()}</Text>
    </View>
  </TouchableOpacity>
);

const Start = ({navigation, profile}) => {
  const [isGameLoading, setGameLoading] = useState(false);
  const [inviteModalStatus, setInviteModalStatus] = useState(false);
  const [searchModalStatus, setSearchModalStatus] = useState(false);

  useEffect(() => {
    getUser().then(res => (id = res.accountId));
  }, []);

  const startBattle = () => {
    setGameLoading(true);
    if (!isGameLoading) {
      axios
        .post(`accounts/${id}/onetoonebattles`, {
          invitationId: null,
        })
        .then(res => {
          setGameLoading(false);
          return navigation.navigate('Main', {status: true});
        })
        .catch(err => {
          setGameLoading(false);
          Alert.alert(
            typeof err.data.error
              ? err.data.error.errorDescription
              : 'There has been an error processing your request',
          );
        });
    }
  };

  return (
    <View style={styles.container}>
      <BackgroundImage type={1} />
      <InnerHeader
        leftComponent={<LeftComponent navigation={navigation} />}
        title=""
        rightComponent={<RightComponent coins={profile.stats.coins} />}
      />
      <View style={styles.innerContainer}>
        <Text style={styles.titleText}>
          Are you Ready{' '}
          {profile.data.firstName === ''
            ? profile.data.nickName
            : `${profile.data.firstName} ${profile.data.lastName}`}{' '}
          ?
        </Text>
        <View style={styles.itemsContainer}>
          <TouchableOpacity activeOpacity={0.9} onPress={startBattle}>
            <Image
              style={styles.buttonContainer}
              source={require('../../assets/images/general/battle/random-button.png')}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setInviteModalStatus(true)}>
            <Image
              style={styles.buttonContainer}
              source={require('../../assets/images/general/battle/invite-button.png')}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setSearchModalStatus(true)}>
            <Image
              style={styles.buttonContainer}
              source={require('../../assets/images/general/battle/search-button.png')}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <InvitePlayers
        id={id}
        status={inviteModalStatus}
        onHide={() => setInviteModalStatus(false)}
      />
      <SearchPlayers
        id={id}
        status={searchModalStatus}
        onHide={() => setSearchModalStatus(false)}
      />
      {isGameLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="#FFF" />
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
  coinContainer: {flexDirection: 'row', alignItems: 'center'},
  boxContainer: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: 'rgba(0,0,0,0.4)',
    marginHorizontal: 5,
  },
  boxText: {fontSize: 13, color: '#ffffff'},
  innerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  titleText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 40,
  },
  itemsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  buttonContainer: {width: '100%', marginBottom: 5},
  loadingContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  backButtonImage: {width: 18, height: 18, marginRight: 10},
});

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(
  mapStateToProps,
  {},
)(Start);
