/* eslint-disable react-native/no-inline-styles */
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';

import {getProfile, reduceCoin} from '../../actions/profileActions';
import {getUser} from '../../services/service';
import axios from '../../utils/axios';

import BackgroundImage from '../../components/common/backgroundImage';
import Header from '../../components/header/header';
import OrangeButton from '../../components/buttons/orangeButton';
import LineDivider from '../../components/common/lineDivider';
import ActiveBattles from '../../components/main/activeBattles';
import RecentBattles from '../../components/main/recentBattles';

let accountId = null;

class Main extends Component {
  state = {
    isLoading: true,
    recentBattles: [],
    activeBattles: [],
  };

  componentDidMount() {
    getUser().then(res => {
      this.getBattleInfo(res.accountId);
      accountId = res.accountId;
    });
    this.props.getProfile();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.status &&
      !prevProps.navigation.state.params
    ) {
      this.getBattleInfo(accountId);
    }
  }

  getActiveBattles = id => {
    return axios.get(`/accounts/${id}/activebattles?_sort=-id`);
  };

  getRecentBattles = id => {
    return axios.get(`/accounts/${id}/recentbattles?_sort=-id`);
  };

  getBattleInfo = id => {
    Promise.all([this.getActiveBattles(id), this.getRecentBattles(id)])
      .then(res => {
        this.setState({
          activeBattles: res[0].data.data,
          recentBattles: res[1].data.data,
          isLoading: false,
        });
      })
      .catch(err => {
        this.setState({isLoading: false});
        Alert.alert(
          typeof err.data.error.errorDescription
            ? err.data.error.errorDescription
            : 'There has been an error processing your request',
        );
      });
  };

  onRefresh = () => {
    this.getBattleInfo(accountId);
  };

  shopItem = () => {
    if (this.props.profile.stats.coins >= 1500) {
      Alert.alert(
        'Notice!',
        'Are you sure you want to purchase this item ?',
        [
          {
            text: 'No',
            onPress: () => true,
            style: 'cancel',
          },
          {text: "Yes, I'm sure", onPress: () => this.props.reduceCoin(1500)},
        ],
        {cancelable: true},
      );
    } else {
      Alert.alert("You don't have enought coin.");
    }
  };

  render() {
    const {isLoading, activeBattles, recentBattles} = this.state;
    const {profile} = this.props;
    return (
      <View style={styles.container}>
        <BackgroundImage type={2} />
        <Header
          current={this.props.isFocused}
          profile={profile.data}
          stats={profile.stats}
        />
        <ScrollView
          style={styles.innerContainer}
          refreshControl={
            <RefreshControl
              tintColor={'#fff'}
              refreshing={isLoading}
              onRefresh={this.onRefresh}
            />
          }>
          <TouchableOpacity
            style={styles.advertismentContainer}
            activeOpacity={0.9}
            onPress={this.shopItem}>
            <Image
              style={styles.advertismentContainerImage}
              source={require('../../assets/images/general/advertisment.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <OrangeButton
            type={1}
            style={{marginBottom: 10, marginHorizontal: 10}}
            strech
            onPress={() => this.props.navigation.navigate('Battle')}>
            <Text style={styles.buttonText}>START NEW BATTLE</Text>
          </OrangeButton>
          {!isLoading && (
            <Fragment>
              <LineDivider text={'ACTIVE BATTLES'} dark />
              <ActiveBattles
                accountId={accountId}
                items={activeBattles}
                navigation={this.props.navigation}
                errorOnPlayerTurn={this.errorOnPlayerTurn}
              />
              <LineDivider text={'RECENT BATTLES'} dark />
              <RecentBattles
                accountId={accountId}
                items={recentBattles}
                navigation={this.props.navigation}
              />
            </Fragment>
          )}
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
  advertismentContainer: {marginBottom: 10, marginHorizontal: 10},
  advertismentContainerImage: {width: '100%', alignSelf: 'center'},
  innerContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
});

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {getProfile, reduceCoin})(Main);
