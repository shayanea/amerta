/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  RefreshControl,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import axios from '../../utils/axios';

import BackgroundImage from '../../components/common/backgroundImage';
import InnerHeader from '../../components/header/innerHeader';
import Avatar from '../../components/common/avatar';

const FriendsRequests = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getFriendsList(navigation.state.params.id);
  }, [navigation.state.params.id]);

  const onRefresh = () => getFriendsList(navigation.state.params.id);

  const getFriendsList = id => {
    axios
      .get(`/friendrequests?ToAccountId=${id}`)
      .then(res => {
        let result = res.data.data.map(item => item.fromAccountId);
        setItems(res.data.data);
        getAccountProfiles(result);
      })
      .catch(() => {
        setLoading(false);
        Alert.alert('There has been an error processing your request');
      });
  };

  const getAccountProfiles = array => {
    axios
      .get(`/accounts/profiles?accountIds=${array.join()}`)
      .then(res => {
        setLoading(false);
        setUsers(res.data.data);
      })
      .catch(() => {
        setLoading(false);
        Alert.alert('There has been an error processing your request');
      });
  };

  const getUserNameById = id => {
    let result = users.find(item => Number(item.accountId) === id);
    return result ? result.name : '';
  };

  const getUserLevelById = id => {
    let result = users.find(item => Number(item.accountId) === id);
    return result ? (result.level ? result.level : 0) : 0;
  };

  const addFriend = id => {
    axios
      .post('friendrequests/accepted', {friendRequestId: id})
      .then(() => {
        let result = items.filter(item => item.id !== id);
        setItems(result);
      })
      .catch(err => {
        Alert.alert(
          typeof err.data.error.errorDescription
            ? err.data.error.errorDescription
            : 'There has been an error processing your request',
        );
      });
  };

  const declineRequest = id => {
    axios
      .post('friendrequests/cancelled', {friendRequestId: id})
      .then(() => {
        let result = items.filter(item => item.id !== id);
        setItems(result);
      })
      .catch(err => {
        Alert.alert(
          typeof err.data.error.errorDescription
            ? err.data.error.errorDescription
            : 'There has been an error processing your request',
        );
      });
  };

  const _keyExtractor = item => item.id.toString();

  const _renderItem = ({item}) => {
    return (
      <View key={item.id} style={styles.itemsContainer}>
        <View style={styles.colContainer}>
          <Avatar id={item.fromAccountId} scale={80} />
          <View style={styles.userInfoContainer}>
            <Text style={styles.nameText}>
              {getUserNameById(item.fromAccountId)}
            </Text>
            <View style={styles.innerColContainer}>
              <Image
                style={styles.iconContainer}
                source={require('../../assets/images/general/profile/level.png')}
                resizeMode={'contain'}
              />
              <Text style={styles.detailsText}>
                Level: {getUserLevelById(item.fromAccountId)}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.colContainer,
            {
              flexDirection: 'column',
              justifyContent: 'center',
            },
          ]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => addFriend(item.id)}>
              <Image
                style={{height: 45, width: 45, marginLeft: 10}}
                source={require('../../assets/images/general/friends/add.png')}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => declineRequest(item.id)}>
              <Image
                style={{height: 45, width: 45, marginLeft: 10}}
                source={require('../../assets/images/general/friends/delete.png')}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <BackgroundImage type={1} />
      <InnerHeader title="Your Friend Requets" />
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <FlatList
          style={{
            paddingVertical: 10,
          }}
          data={items}
          keyExtractor={_keyExtractor}
          renderItem={_renderItem}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
        />
      )}
      {!isLoading && items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            You don't have any friend request
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  rightComponentContainer: {position: 'relative', zIndex: 10},
  rightComponentText: {
    fontSize: 14,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  itemsContainer: {
    padding: 10,
    backgroundColor: 'rgba(2,140,191,0.18)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: 'rgba(2,176,191,0.69)',
    borderBottomColor: 'rgba(2,176,191,0.69)',
    paddingHorizontal: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colContainer: {flexDirection: 'row', alignItems: 'center'},
  userInfoContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: 5,
  },
  innerColContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginBottom: 5,
  },
  nameText: {fontSize: 16, color: '#fff', marginBottom: 8},
  detailsText: {fontSize: 14, color: '#fff', marginLeft: 8},
  emptyContainer: {
    position: 'absolute',
    top: 120,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {fontSize: 18, color: '#fff'},
});

export default FriendsRequests;
