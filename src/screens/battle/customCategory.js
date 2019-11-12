/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';

import axios from '../../utils/axios';

import BackgroundImage from '../../components/common/backgroundImage';
import InnerHeader from '../../components/header/innerHeader';

const RightComponent = ({coins}) => (
  <TouchableOpacity activeOpacity={0.9} style={styles.coinContainer}>
    <Text style={[styles.boxText, {marginRight: 5}]}>Coins</Text>
    <Image
      source={require('../../assets/images/general/profile/coin.png')}
      resizeMode="contain"
    />
    <View style={styles.boxContainer}>
      <Text style={styles.boxText}>{coins.toLocaleString()}</Text>
    </View>
  </TouchableOpacity>
);

const CustomCategory = ({profile, navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get('/activecategories')
      .then(res => {
        setItems(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        Alert.alert(
          err.data.error.errorDescription !== 'undefined'
            ? err.data.error.errorDescription
            : 'There has been an error processing your request',
        );
        setLoading(false);
      });
  };

  const selectCategory = categoryId => {
    axios
      .post(`/games/${navigation.state.params.data.id}/selectedCategory`, {
        categoryId,
        customCategory: true,
      })
      .then(() => {
        navigation.navigate('NewBattle', {id: navigation.state.params.data.id});
      })
      .catch(() => {
        Alert.alert('There has been an error processing your request');
      });
  };

  const {stats} = profile;
  return (
    <View style={styles.container}>
      <BackgroundImage type={1} />
      <InnerHeader
        title="Select a Category"
        rightComponent={<RightComponent coins={stats.coins} />}
      />
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <ScrollView style={styles.innerContainer}>
          <FlatList
            data={items}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.itemsContainer}
                onPress={() => selectCategory(item.id)}>
                <View>
                  <Image
                    source={require('../../assets/images/general/categories/icon-holder-1.png')}
                    style={{height: 60, width: 60}}
                    resizeMode={'contain'}
                  />
                </View>
                <Text style={styles.itemsTitle}>{item.title}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  There is no category available.
                </Text>
              </View>
            )}
          />
        </ScrollView>
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
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  itemsContainer: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(55,126,172,0.70)',
    backgroundColor: 'rgba(55,126,172,0.15)',
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 15,
  },
  itemsTitle: {color: '#fff', fontSize: 20, fontWeight: 'bold', marginLeft: 15},
  emptyContainer: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  emptyText: {fontSize: 18, color: '#fff'},
});

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(
  mapStateToProps,
  {},
)(CustomCategory);
