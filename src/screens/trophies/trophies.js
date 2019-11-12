/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, Fragment} from 'react';
import {
  Text,
  View,
  ScrollView,
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

const RightComponent = ({navigation}) => {
  return (
    <TouchableOpacity
      style={styles.rightComponentContainer}
      activeOpacity={0.9}
      onPress={() => navigation.push('Tutorial')}>
      <Text style={styles.rightComponentText}>How to get it</Text>
    </TouchableOpacity>
  );
};

const Trophies = ({navigation}) => {
  const [isLoading, setLoading] = useState(false);
  const [items, setItems] = useState([
    {
      id: 0,
      active: true,
      src: require('../../assets/images/general/trophies/items/1.png'),
    },
    {
      id: 1,
      active: false,
      src: require('../../assets/images/general/trophies/items/2.png'),
    },
    {
      id: 2,
      active: false,
      src: require('../../assets/images/general/trophies/items/3.png'),
    },
  ]);

  useEffect(() => {
    // getUser().then(res => {
    //   let userId = res.accountId ? res.accountId : res.id;
    //   getTrophies(userId);
    // });
  }, []);

  const getTrophies = id => {
    axios
      .get(`/accounts/${id}/achievements`)
      .then(res => {
        setLoading(false);
        setItems(res.data.data);
      })
      .catch(() => {
        setLoading(false);
        Alert.alert('There has been an error processing your request');
      });
  };

  return (
    <View style={styles.container}>
      <BackgroundImage type={1} />
      <InnerHeader
        root
        title="Trophies and Badges"
        rightComponent={<RightComponent navigation={navigation} />}
      />
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <ScrollView
          style={styles.container}
          contentContainerStyle={{padding: 20}}>
          <View style={styles.cabinetContainer}>
            {items.map(item => (
              <Fragment key={item.id}>
                <TouchableOpacity
                  style={{position: 'relative', zIndex: 10}}
                  activeOpacity={0.9}
                  onPress={() =>
                    Alert.alert(
                      'You earned this award by winning 5000 battle in February 2019. ',
                    )
                  }>
                  <Image
                    source={item.src}
                    resizeMode="contain"
                    style={{width: 110, opacity: item.active ? 1 : 0.6}}
                  />
                </TouchableOpacity>
                <Image
                  source={require('../../assets/images/general/trophies/shelf.png')}
                  style={{width: '100%', position: 'absolute', bottom: -50}}
                  resizeMode={'contain'}
                />
                <Text style={styles.cabinetText}>WINNER</Text>
              </Fragment>
            ))}
          </View>
        </ScrollView>
      )}
      {!isLoading && items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>You don't have any trophies</Text>
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
  cabinetContainer: {
    width: '100%',
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cabinetText: {
    position: 'absolute',
    bottom: -10,
    left: 25,
    color: '#fff',
    fontSize: 15,
    zIndex: 10,
  },
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

export default Trophies;
