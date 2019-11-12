/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

import {getUser, getToken} from '../../services/service';
import {reduceCoin} from '../../actions/profileActions';
import axios from '../../utils/axios';

import BackgroundImage from '../../components/common/backgroundImage';
import InnerHeader from '../../components/header/innerHeader';
import LineDivider from '../../components/common/lineDivider';

let id = null,
  token = null;

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

class Categories extends Component {
  state = {
    isLoading: true,
    currentTurnPlayerId: null,
    items: [],
  };

  componentDidMount() {
    getUser().then(res => (id = res.accountId));
    getToken().then(res => (token = res));
    this.fetchCategories();
  }

  fetchCategories = () => {
    axios
      .get(`/games/${this.props.navigation.state.params.data.lastGameId}`)
      .then(res => {
        this.setState({
          items: res.data.data.availableCategories,
          isLoading: false,
          currentTurnPlayerId: res.data.data.currentTurnPlayerId,
        });
      })
      .catch(() => {
        this.setState({isLoading: false});
        Alert.alert('There has been an error processing your request');
      });
  };

  selectCategory = item => {
    if (this.state.currentTurnPlayerId === Number(id)) {
      this.setState({isLoading: true});
      axios
        .post(
          `/games/${this.props.navigation.state.params.data.lastGameId}/selectedCategory`,
          {
            categoryId: item.id,
            customCategory: false,
          },
        )
        .then(() => {
          this.props.navigation.navigate('Answer', {
            data: {
              lastGameId: this.props.navigation.state.params.data.lastGameId,
              id: this.props.navigation.state.params.data.id,
            },
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
    } else {
      Alert.alert("It's not your turn.");
    }
  };

  loadMoreCategory = () => {
    axios
      .post(
        `/games/${this.props.navigation.state.params.data.id}/randomizecategories`,
      )
      .then(res => {
        this.fetchCategories();
      })
      .catch(err => {
        this.setState({
          isLoading: false,
        });
        Alert.alert(
          err.data.error.errorDescription !== 'undefined'
            ? err.data.error.errorDescription
            : 'There has been an error processing your request',
        );
      });
  };

  helpersCoins = type => {
    switch (type) {
      case 1:
        return 750;
      case 2:
        return 2000;
      default:
        return null;
    }
  };

  helperAction = type => {
    if (this.props.profile.stats.coins > this.helpersCoins(type)) {
      this.props.reduceCoin(this.helpersCoins(type));
      if (type === 1) {
        this.loadMoreCategory();
      }
      if (type === 2) {
        return this.props.navigation.navigate('CustomCategory', {
          id: this.props.navigation.state.params.data.id,
        });
      }
    } else {
      Alert.alert('Not enough coin');
    }
  };

  render() {
    const {profile} = this.props;
    const {isLoading, items} = this.state;
    return (
      <View style={styles.container}>
        <BackgroundImage type={1} />
        <InnerHeader
          title="Select a Category"
          rightComponent={<RightComponent coins={profile.stats.coins} />}
        />
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <ScrollView style={styles.innerContainer}>
            <FlatList
              data={items}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.itemsContainer}
                  onPress={() => this.selectCategory(item)}>
                  <View style={{position: 'relative'}}>
                    <Image
                      source={require('../../assets/images/general/categories/icon-holder.png')}
                      style={{height: 60, width: 60}}
                      resizeMode={'contain'}
                    />
                    <Image
                      source={{
                        uri: `http://45.82.137.69:8001/files/${item.iconFileId}/data?authorization=${token}`,
                      }}
                      style={{
                        height: 35,
                        width: 35,
                        position: 'absolute',
                        top: 10,
                        alignSelf: 'center',
                      }}
                      resizeMode={'contain'}
                    />
                  </View>
                  <Text style={styles.itemsTitle}>{item.title}</Text>
                </TouchableOpacity>
              )}
            />
            <LineDivider text={'OTHER OPTIONS'} dark />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.optionsContainer}
                onPress={() => this.helperAction(1)}>
                <Image
                  style={{height: 30, width: 30}}
                  source={require('../../assets/images/general/battle/category-option1.png')}
                  resizeMode={'contain'}
                />
                <Text style={styles.optionsTitle}>Three More Categories</Text>
                <Image
                  style={{height: 30}}
                  source={require('../../assets/images/general/battle/buy-option1.png')}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.optionsContainer, {marginLeft: 10}]}
                onPress={() => this.helperAction(2)}>
                <Image
                  style={{height: 30, width: 30}}
                  source={require('../../assets/images/general/battle/category-option2.png')}
                  resizeMode={'contain'}
                />
                <Text style={styles.optionsTitle}>Select Custom Category</Text>
                <Image
                  style={{height: 30}}
                  source={require('../../assets/images/general/battle/buy-option2.png')}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

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
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  itemsContainer: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(11,191,2,0.69)',
    backgroundColor: 'rgba(2,191,2,0.18)',
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 15,
  },
  itemsTitle: {color: '#fff', fontSize: 20, fontWeight: 'bold', marginLeft: 15},
  optionsContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(2,176,191,0.69)',
    backgroundColor: 'rgba(2,149,191,0.18)',
  },
  optionsTitle: {fontSize: 13, color: '#fff', marginVertical: 10},
});

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {reduceCoin})(Categories);
