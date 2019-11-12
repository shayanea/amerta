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
import {getUser} from '../../services/service';

import BackgroundImage from '../../components/common/backgroundImage';
import InnerHeader from '../../components/header/innerHeader';
import Avatar from '../../components/common/avatar';

const RightComponent = ({navigation, id}) => {
  return (
    <TouchableOpacity
      style={styles.rightComponentContainer}
      activeOpacity={0.9}
      onPress={() => navigation.push('Requests', {id})}>
      <Text style={styles.rightComponentText}>Friend Request</Text>
    </TouchableOpacity>
  );
};

const Friends = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [id, setId] = useState(null);

  useEffect(() => {
    getUser().then(res => {
      let userId = res.accountId ? res.accountId : res.id;
      setId(userId);
      getFriendsList(userId);
    });
  }, []);

  const onRefresh = () => getFriendsList(id);

  const getFriendsList = userId => {
    axios
      .get(`/accounts/${userId}/friends`)
      .then(res => {
        setLoading(false);
        setItems(res.data.data);
      })
      .catch(err => {
        setLoading(false);
        Alert.alert(
          typeof err.data.error.errorDescription
            ? err.data.error.errorDescription
            : 'There has been an error processing your request',
        );
      });
  };

  const _keyExtractor = item => item.accountId.toString();

  const _renderItem = ({item}) => {
    return (
      <View key={item.id} style={styles.itemsContainer}>
        <View style={styles.colContainer}>
          <Avatar id={item.accountId} scale={80} />
          <View style={styles.userInfoContainer}>
            <Text style={styles.nameText}>{item.name}</Text>
            <View style={styles.innerColContainer}>
              <Image
                style={styles.iconContainer}
                source={require('../../assets/images/general/profile/rank.png')}
                resizeMode={'contain'}
              />
              <Text style={styles.detailsText}>Rank: {item.rank}</Text>
            </View>
            <View style={styles.innerColContainer}>
              <Image
                style={styles.iconContainer}
                source={require('../../assets/images/general/profile/level.png')}
                resizeMode={'contain'}
              />
              <Text style={styles.detailsText}>Level: {item.level}</Text>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.colContainer,
            {
              flexDirection: 'column',
              justifyContent: 'flex-end',
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
              onPress={() =>
                navigation.navigate('Chat', {
                  id: item.accountId,
                  name: item.name,
                })
              }>
              <Image
                style={{height: 45, width: 45}}
                source={require('../../assets/images/general/friends/message.png')}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginLeft: 10}}
              activeOpacity={0.9}
              onPress={() => sendInvitation(item.accountId)}>
              <Image
                style={{height: 45, width: 45}}
                source={require('../../assets/images/general/friends/start.png')}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => remove(item.accountId)}
            activeOpacity={0.9}>
            <Image
              style={{height: 45, width: 45}}
              source={require('../../assets/images/general/friends/delete.png')}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const remove = userId => {
    Alert.alert(
      'Notice!',
      'Are you sure you want to remove this account from your friends list?',
      [
        {
          text: 'Cancel',
          onPress: () => true,
          style: 'cancel',
        },
        {text: 'OK', onPress: () => removeFriend(userId)},
      ],
      {cancelable: true},
    );
  };

  const removeFriend = userId => {
    axios
      .delete(`/accounts/${id}/friends/${userId}`)
      .then(res => {
        let result = items.filter(item => item.accountId !== userId);
        setItems(result);
      })
      .catch(err => {
        Alert.alert(
          typeof err.data.error
            ? err.data.error.errorDescription
            : 'There has been an error processing your request',
        );
        setLoading(false);
      });
  };

  const sendInvitation = accountId => {
    axios
      .post(`/accounts/${accountId}/battleinvitations`)
      .then(() => {
        Alert.alert('Invitation Sent');
      })
      .catch(err => {
        Alert.alert(
          typeof err.data.error
            ? err.data.error.errorDescription
            : 'There has been an error processing your request',
        );
      });
  };

  return (
    <View style={styles.container}>
      <BackgroundImage type={1} />
      <InnerHeader
        root
        title="Your Friend List"
        rightComponent={<RightComponent navigation={navigation} id={id} />}
      />
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
          <Text style={styles.emptyText}>You don't have any friends</Text>
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

export default Friends;
