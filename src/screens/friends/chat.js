/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Alert,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import dayjs from 'dayjs';

import axios from '../../utils/axios';

import BackgroundImage from '../../components/common/backgroundImage';
import InnerHeader from '../../components/header/innerHeader';
import MessageBox from '../../components/chat/messageBox';

const {width} = Dimensions.get('window');

const RightComponent = ({onPress}) => {
  return (
    <TouchableOpacity
      style={styles.rightComponentContainer}
      activeOpacity={0.9}
      onPress={onPress}>
      <Text style={styles.rightComponentText}>New Message</Text>
    </TouchableOpacity>
  );
};

const Chat = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [modalStatus, setModalStatus] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchMessages(navigation.state.params.id);
  }, [navigation.state.params.id]);

  const fetchMessages = id => {
    axios
      .get(`/chats/${id}/messages?afterId=&beforeId=&count=50`)
      .then(res => {
        setLoading(false);
        setItems(res.data.data);
      })
      .catch(() => {
        Alert.alert('There has been an error processing your request');
        setLoading(false);
      });
  };

  const onUpdateInbox = item => {
    setItems([...items, item]);
    setModalStatus(false);
  };

  const _keyExtractor = item => item.id.toString();

  const _renderItem = ({item}) => {
    return (
      <View
        key={item.id}
        style={[
          styles.itemsContainer,
          {
            justifyContent:
              item.senderAccountId === navigation.state.params.id
                ? 'flex-start'
                : 'flex-end',
          },
        ]}>
        <View
          style={[
            styles.messageContainer,
            {
              borderRadius: 15,
              borderTopLeftRadius:
                item.senderAccountId === navigation.state.params.id ? 0 : 15,
              borderTopRightRadius:
                item.senderAccountId === navigation.state.params.id ? 15 : 0,
            },
          ]}>
          <Text style={styles.messageTimeText}>
            {dayjs(item.dateTime).format('DD/MM HH:mm')}
          </Text>
          <Text style={styles.messageText}>{item.messageText}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <BackgroundImage type={1} />
      <InnerHeader
        title={navigation.state.params.name}
        rightComponent={<RightComponent onPress={() => setModalStatus(true)} />}
      />
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <FlatList
          style={styles.chatListContainer}
          contentContainerStyle={{flexDirection: 'column'}}
          data={items}
          keyExtractor={_keyExtractor}
          renderItem={_renderItem}
        />
      )}
      {!isLoading && items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Messages</Text>
        </View>
      ) : null}
      <MessageBox
        id={navigation.state.params.id}
        status={modalStatus}
        onHideModal={() => setModalStatus(false)}
        onUpdateInbox={onUpdateInbox}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  rightComponentContainer: {position: 'relative', zIndex: 10},
  rightComponentText: {
    fontSize: 14,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  chatListContainer: {
    paddingTop: 10,
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  itemsContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 15,
  },
  messageContainer: {
    backgroundColor: 'rgba(191,191,191,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(191,191,191,0.69)',
    position: 'relative',
    borderRadius: 15,
    borderTopLeftRadius: 0,
    marginLeft: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 100,
    maxWidth: width / 2,
    // alignItems: "center"
    // justifyContent: "center"
  },
  messageTimeText: {
    fontSize: 11,
    color: '#BFBFBF',
    position: 'absolute',
    top: 5,
    right: 5,
    left: 5,
  },
  messageText: {color: '#fff', fontSize: 15, marginTop: 10},
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

export default Chat;
