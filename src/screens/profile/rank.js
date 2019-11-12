/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';

import axios from '../../utils/axios';

import BackgroundImage from '../../components/common/backgroundImage';
import InnerHeader from '../../components/header/innerHeader';
import Avatar from '../../components/common/avatar';

const Rank = ({navigation}) => {
  const [isLoading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchRank();
  }, []);

  const fetchRank = () => {
    axios
      .get('/battle/toprank')
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

  const sendInvitation = id => {
    axios
      .post(`/accounts/${id}/battleinvitations`)
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

  const _renderItem = ({item, index}) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemsIndex}>{index + 1}</Text>
        <View style={styles.innerItemContainer}>
          <View style={styles.column}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('UserStats', {accountId: item.accountId})
              }>
              <Avatar scale={60} id={item.accountId} />
            </TouchableOpacity>
            <View
              style={[
                styles.column,
                {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  paddingLeft: 10,
                },
              ]}>
              <Text style={styles.username}>{item.fullName}</Text>
              <Text style={styles.level}>Level: {item.level}</Text>
            </View>
          </View>
          <View style={styles.column}>
            <TouchableOpacity
              style={{marginRight: 5}}
              activeOpacity={0.9}
              onPress={() => sendInvitation(item.accountId)}>
              <Image
                style={{height: 45, width: 45}}
                source={require('../../assets/images/general/friends/add.png')}
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
      <InnerHeader
        title="World Rank Top 20"
        rightComponent={
          <Text style={styles.username}>
            Your Rank: {navigation.state.params.rank}
          </Text>
        }
      />
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <FlatList
          style={styles.itemsContainer}
          contentContainerStyle={{paddingBottom: 50}}
          data={items}
          keyExtractor={item => item.accountId.toString()}
          renderItem={_renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  itemsContainer: {
    padding: 20,
  },
  itemContainer: {},
  innerItemContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(2,140,191,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(2,140,191,0.69)',
    borderRadius: 46,
    padding: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemsIndex: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.7,
    marginLeft: 30,
    marginVertical: 5,
  },
  column: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    color: '#fff',
    fontSize: 16,
  },
  level: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Rank;
