/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
  StyleSheet,
  Dimensions,
} from 'react-native';

import {getUser} from '../../services/service';
import {reduceCoin} from '../../actions/profileActions';

import BackgroundImage from '../../components/common/backgroundImage';
import InnerHeader from '../../components/header/innerHeader';
import LineDivider from '../../components/common/lineDivider';

const {width} = Dimensions.get('window');

const RightComponent = ({coins}) => (
  <View style={styles.coinContainer}>
    <Text style={[styles.boxText, {marginRight: 5}]}>Coins</Text>
    <Image
      source={require('../../assets/images/general/profile/coin.png')}
      style={styles.iconContainer}
      resizeMode="contain"
    />
    <View style={styles.boxContainer}>
      <Text style={styles.boxText}>{coins.toLocaleString()}</Text>
    </View>
  </View>
);

const SectionHeader = ({title}) => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerTitle}>{title}</Text>
  </View>
);

const Shop = ({navigation, profile, reduceCoin}) => {
  const [isLoading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const buyItem = () => {
    Linking.canOpenURL('http://www.payment.com/')
      .then(supported => {
        if (!supported) {
          console.log("Can't handle url: " + 'http://www.payment.com/');
        } else {
          return Linking.openURL('http://www.payment.com/');
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  const activeItem = price => {
    if (price <= profile.stats.coins) {
      Alert.alert(
        'Notice!',
        'Are you sure you want to purchase this item?',
        [
          {
            text: 'No',
            onPress: () => true,
            style: 'cancel',
          },
          {text: 'Yes', onPress: () => purchaseBooster(price)},
        ],
        {cancelable: true},
      );
    } else {
      Alert.alert("You don't have enought coin.");
    }
  };

  const purchaseBooster = price => {
    Alert.alert('This item has been activated for you.');
    reduceCoin(price);
  };

  return (
    <View style={styles.container}>
      <BackgroundImage type={1} />
      <InnerHeader
        root
        title="Shop"
        rightComponent={<RightComponent coins={profile.stats.coins} />}
      />
      <ScrollView
        style={styles.innerContainer}
        contentContainerStyle={{paddingBottom: 50}}>
        <SectionHeader title="Coins" />
        <View style={styles.rowContainer}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.itemContainer,
              {flexBasis: width / 2 - 15, marginRight: 10},
            ]}
            onPress={buyItem}>
            <Image
              style={styles.itemIcon}
              source={require('../../assets/images/general/shop/coin_1.png')}
              resizeMode={'contain'}
            />
            <Text style={styles.itemTitle}>400</Text>
            <View
              style={{
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{height: 30}}
                source={require('../../assets/images/general/shop/green_button.png')}
                resizeMode={'contain'}
              />
              <Text style={styles.coinText}>1.00 TL</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.itemContainer, {flexBasis: width / 2 - 15}]}
            onPress={buyItem}>
            <Image
              style={styles.itemIcon}
              source={require('../../assets/images/general/shop/coin_2.png')}
              resizeMode={'contain'}
            />
            <Text style={styles.itemTitle}>2,100</Text>
            <View
              style={{
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{height: 30}}
                source={require('../../assets/images/general/shop/green_button.png')}
                resizeMode={'contain'}
              />
              <Text style={styles.coinText}>5.00 TL</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.itemContainer,
              {
                flexBasis: width - 30,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 30,
              },
            ]}
            onPress={buyItem}>
            <Image
              style={styles.itemIcon}
              source={require('../../assets/images/general/shop/coin_2.png')}
              resizeMode={'contain'}
            />
            <View>
              <Text
                style={[styles.itemTitle, {fontSize: 25, textAlign: 'center'}]}>
                4,600
              </Text>
              <View
                style={{
                  position: 'relative',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{height: 30}}
                  source={require('../../assets/images/general/shop/green_button.png')}
                  resizeMode={'contain'}
                />
                <Text style={styles.coinText}>10.00 TL</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.itemContainer,
              {
                flexBasis: width - 30,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 30,
              },
            ]}
            onPress={buyItem}>
            <Image
              style={[styles.itemIcon, {width: width / 2}]}
              source={require('../../assets/images/general/shop/coin_3.png')}
              resizeMode={'contain'}
            />
            <View>
              <Text
                style={[styles.itemTitle, {fontSize: 25, textAlign: 'center'}]}>
                13,000
              </Text>
              <View
                style={{
                  position: 'relative',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{height: 30}}
                  source={require('../../assets/images/general/shop/green_button.png')}
                  resizeMode={'contain'}
                />
                <Text style={styles.coinText}>25.00 TL</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.itemContainer,
              {
                flexBasis: width - 30,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 30,
              },
            ]}
            onPress={buyItem}>
            <Image
              style={[styles.itemIcon, {width: width / 2}]}
              source={require('../../assets/images/general/shop/coin_4.png')}
              resizeMode={'contain'}
            />
            <View>
              <Text
                style={[styles.itemTitle, {fontSize: 25, textAlign: 'center'}]}>
                55000
              </Text>
              <View
                style={{
                  position: 'relative',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{height: 30}}
                  source={require('../../assets/images/general/shop/green_button.png')}
                  resizeMode={'contain'}
                />
                <Text style={styles.coinText}>99.00 TL</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <SectionHeader title="Bootster" />
        <LineDivider text={'2 Amerta allowance/game'} dark />
        <View style={styles.rowContainer}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.itemContainer}
            onPress={() => activeItem(1000)}>
            <Image
              style={styles.itemIcon}
              source={require('../../assets/images/general/shop/icon_1.png')}
              resizeMode={'contain'}
            />
            <Text style={styles.itemTitle}>1 Day</Text>
            <View style={{position: 'relative'}}>
              <Image
                style={{height: 30}}
                source={require('../../assets/images/general/shop/button.png')}
                resizeMode={'contain'}
              />
              <Text style={styles.priceText}>1000</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.itemContainer, {marginHorizontal: 10}]}
            onPress={() => activeItem(1750)}>
            <Image
              style={styles.itemIcon}
              source={require('../../assets/images/general/shop/icon_1.png')}
              resizeMode={'contain'}
            />
            <Text style={styles.itemTitle}>3 Day</Text>
            <View style={{position: 'relative'}}>
              <Image
                style={{height: 30}}
                source={require('../../assets/images/general/shop/button.png')}
                resizeMode={'contain'}
              />
              <Text style={styles.priceText}>1750</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.itemContainer}
            onPress={() => activeItem(3500)}>
            <Image
              style={styles.itemIcon}
              source={require('../../assets/images/general/shop/icon_1.png')}
              resizeMode={'contain'}
            />
            <Text style={styles.itemTitle}>7 Day</Text>
            <View style={{position: 'relative'}}>
              <Image
                style={{height: 30}}
                source={require('../../assets/images/general/shop/button.png')}
                resizeMode={'contain'}
              />
              <Text style={styles.priceText}>3500</Text>
            </View>
          </TouchableOpacity>
        </View>
        <LineDivider text={'3 Amerta allowance/game'} dark />
        <View style={styles.rowContainer}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.itemContainer}
            onPress={() => activeItem(1750)}>
            <Image
              style={styles.itemIcon}
              source={require('../../assets/images/general/shop/icon_2.png')}
              resizeMode={'contain'}
            />
            <Text style={styles.itemTitle}>1 Day</Text>
            <View style={{position: 'relative'}}>
              <Image
                style={{height: 30}}
                source={require('../../assets/images/general/shop/button.png')}
                resizeMode={'contain'}
              />
              <Text style={styles.priceText}>2500</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.itemContainer, {marginHorizontal: 10}]}
            onPress={() => activeItem(1750)}>
            <Image
              style={styles.itemIcon}
              source={require('../../assets/images/general/shop/icon_2.png')}
              resizeMode={'contain'}
            />
            <Text style={styles.itemTitle}>3 Day</Text>
            <View style={{position: 'relative'}}>
              <Image
                style={{height: 30}}
                source={require('../../assets/images/general/shop/button.png')}
                resizeMode={'contain'}
              />
              <Text style={styles.priceText}>4500</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.itemContainer}
            onPress={() => activeItem(1750)}>
            <Image
              style={styles.itemIcon}
              source={require('../../assets/images/general/shop/icon_2.png')}
              resizeMode={'contain'}
            />
            <Text style={styles.itemTitle}>7 Day</Text>
            <View style={{position: 'relative'}}>
              <Image
                style={{height: 30}}
                source={require('../../assets/images/general/shop/button.png')}
                resizeMode={'contain'}
              />
              <Text style={styles.priceText}>7500</Text>
            </View>
          </TouchableOpacity>
        </View>
        <LineDivider text={'4 Amerta allowance/game'} dark />
        <View style={styles.rowContainer}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.itemContainer}
            onPress={() => activeItem(1750)}>
            <Image
              style={styles.itemIcon}
              source={require('../../assets/images/general/shop/icon_3.png')}
              resizeMode={'contain'}
            />
            <Text style={styles.itemTitle}>1 Day</Text>
            <View style={{position: 'relative'}}>
              <Image
                style={{height: 30}}
                source={require('../../assets/images/general/shop/button.png')}
                resizeMode={'contain'}
              />
              <Text style={styles.priceText}>5000</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.itemContainer, {marginHorizontal: 10}]}
            onPress={() => activeItem(1750)}>
            <Image
              style={styles.itemIcon}
              source={require('../../assets/images/general/shop/icon_3.png')}
              resizeMode={'contain'}
            />
            <Text style={styles.itemTitle}>3 Day</Text>
            <View style={{position: 'relative'}}>
              <Image
                style={{height: 30}}
                source={require('../../assets/images/general/shop/button.png')}
                resizeMode={'contain'}
              />
              <Text style={styles.priceText}>8500</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.itemContainer}
            onPress={() => activeItem(1750)}>
            <Image
              style={styles.itemIcon}
              source={require('../../assets/images/general/shop/icon_3.png')}
              resizeMode={'contain'}
            />
            <Text style={styles.itemTitle}>7 Day</Text>
            <View style={{position: 'relative'}}>
              <Image
                style={{height: 30}}
                source={require('../../assets/images/general/shop/button.png')}
                resizeMode={'contain'}
              />
              <Text style={styles.priceText}>12500</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  headerContainer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(2,176,191,0.69)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(2,176,191,0.69)',
    backgroundColor: 'rgba(2,140,191,0.18)',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginVertical: 10,
  },
  headerTitle: {
    fontSize: 26,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  rowContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 15,
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: 'rgba(2,176,191,0.69)',
    backgroundColor: 'rgba(2,140,191,0.18)',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    flexBasis: width / 3 - 15,
  },
  itemTitle: {
    fontSize: 22,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    marginBottom: 10,
  },
  itemIcon: {height: 100, marginTop: -25, marginBottom: 10},
  priceText: {
    position: 'absolute',
    right: 18,
    fontSize: 15,
    color: '#fff',
    top: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  coinText: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 18,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
});

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(
  mapStateToProps,
  {reduceCoin},
)(Shop);
