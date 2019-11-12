/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
  FlatList,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';

import axios from '../../utils/axios';

import LineDivider from '../common/lineDivider';
import Avatar from '../common/avatar';

class SearchPlayers extends Component {
  state = {
    isLoading: false,
    items: [],
    searchText: '',
  };

  searchUserByName = () => {
    if (this.state.searchText !== '') {
      this.setState({isLoading: true});
      axios
        .get(`/accounts/profiles?term=${this.state.searchText}`)
        .then(res => {
          if (res.data.data.length > 0) {
            this.setState({items: res.data.data, isLoading: false});
          } else {
            this.setState({isLoading: false});
            Alert.alert('User not found');
          }
        })
        .catch(() => {
          this.setState({isLoading: false});
          Alert.alert('There has been an error processing your request');
        });
    }
  };

  sendInvitation = accountId => {
    axios
      .post(`/accounts/${this.props.id}/friendrequests`, {
        friendAccountId: accountId,
      })
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

  render() {
    const {onHide, status} = this.props;
    const {items, isLoading} = this.state;
    return (
      <Modal animationType="fade" transparent={true} visible={status}>
        <TouchableOpacity
          style={styles.background}
          activeOpacity={1}
          onPress={() => {
            onHide();
            this.setState({items: []});
          }}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.container}
            onPress={() => null}>
            <LineDivider text={'SEARCH FOR USERS'} dark />
            <TextInput
              keyboardType="email-address"
              placeholder="Search by Username"
              placeholderTextColor="#505050"
              autoCorrect={false}
              autoCapitalize={'none'}
              maxLength={200}
              style={styles.formInput}
              keyboardAppearance={'dark'}
              onChangeText={searchText => this.setState({searchText})}
              returnKeyType={'done'}
              onSubmitEditing={this.searchUserByName}
            />
            {isLoading ? (
              <ActivityIndicator color={'#fff'} />
            ) : (
              <FlatList
                style={{paddingVertical: 10}}
                data={items}
                keyExtractor={item => item.accountId}
                renderItem={({item}) => (
                  <View style={styles.itemsContainer} key={item.accountId}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Avatar id={item.accountId} scale={60} />
                      <View style={{marginLeft: 5}}>
                        <Text style={styles.nameText}>{item.name}</Text>
                        <Text style={styles.levelText}>
                          Level: {item.level}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => this.sendInvitation(item.accountId)}>
                      <Image
                        style={styles.iconContainer}
                        source={require('../../assets/images/general/friends/add.png')}
                        resizeMode={'contain'}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,39,54,0.43)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  container: {
    backgroundColor: 'rgba(0,39,54,0.83)',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: 'rgba(2,176,191,0.69)',
    width: '100%',
  },
  itemsContainer: {
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 45,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  iconContainer: {height: 40, width: 40},
  nameText: {fontSize: 15, color: '#fff', marginBottom: 5},
  levelText: {fontSize: 14, color: '#fff', fontWeight: 'bold'},
  formInput: {
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    borderRadius: 30,
    marginBottom: 20,
    height: 35,
    marginHorizontal: 15,
  },
});

export default SearchPlayers;
