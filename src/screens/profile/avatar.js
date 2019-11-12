/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';

import {getToken} from '../../services/service';
import axios from '../../utils/axios';

import BackgroundImage from '../../components/common/backgroundImage';
import InlineHader from '../../components/header/innerHeader';
import AvatarModal from '../../components/profile/avatarModal';
import GreenButton from '../../components/buttons/greenButton';

const {width} = Dimensions.get('window');

const LeftComponent = ({showModal, layout}) => (
  <TouchableOpacity
    style={styles.rightButtonContainer}
    activeOpacity={0.9}
    onPress={showModal}>
    <Text style={[styles.rightButtonText, {fontSize: 20}]}>{layout}</Text>
  </TouchableOpacity>
);

const RightComponent = ({save}) => (
  <TouchableOpacity
    style={styles.rightButtonContainer}
    activeOpacity={0.9}
    onPress={save}>
    <Text style={styles.rightButtonText}>Save</Text>
  </TouchableOpacity>
);

let token = null;

getToken().then(res => {
  token = res;
});

export default class Avatar extends Component {
  constructor(props) {
    super(props);
    this.scroll = null;
    this.state = {
      isLoading: true,
      modalStatus: false,
      layout: 200,
      items: [
        {
          id: 200,
          title: 'FACE',
          icon: require('../../assets/images/general/avatar/items/0.png'),
        },
        {
          id: 300,
          title: 'HAIR STYLE',
          icon: require('../../assets/images/general/avatar/items/5.png'),
        },
        {
          id: 400,
          title: 'EYE',
          icon: require('../../assets/images/general/avatar/items/2.png'),
        },
        {
          id: 500,
          title: 'BREAD & MUSTACHE',
          icon: require('../../assets/images/general/avatar/items/6.png'),
        },
        {
          id: 700,
          title: 'MOUTH',
          icon: require('../../assets/images/general/avatar/items/1.png'),
        },
        {
          id: 800,
          title: 'FACIAL ELEMENTS',
          icon: require('../../assets/images/general/avatar/items/3.png'),
        },
        {
          id: 900,
          title: 'HELMET',
          icon: require('../../assets/images/general/avatar/items/7.png'),
        },
        {
          id: 1200,
          title: 'COSTUME',
          icon: require('../../assets/images/general/avatar/items/7.png'),
        },
        {
          id: 1300,
          title: 'WEAPON',
          icon: require('../../assets/images/general/avatar/items/4.png'),
        },
        {
          id: 1400,
          title: 'ACCESSORIES',
          icon: require('../../assets/images/general/avatar/items/8.png'),
        },
      ],
      avatarItemIds: this.props.navigation.state.params.profile.avatarItemIds,
      accountId: this.props.navigation.state.params.profile.id,
      skins: [],
      selectedSkin: [],
      selectedIndex: 0,
    };
  }

  componentDidMount() {
    this.getAvatar();
  }

  getAvatar = () => {
    axios
      .get('/shopitems?ShopItemTypeIds=2')
      .then(res => {
        this.setState({
          isLoading: false,
          skins: res.data.data,
          selectedSkin: res.data.data.filter(
            item => item.avatarCategoryId === this.state.layout,
          ),
        });
      })
      .catch(err => {
        this.setState({
          isLoading: false,
        });
        Alert.alert(
          typeof err.data.error.errorDescription
            ? err.data.error.errorDescription
            : 'There has been an error processing your request',
        );
      });
  };

  currentLayout = () => {
    let result = this.state.items.find(item => item.id === this.state.layout);
    return result ? result.title : '';
  };

  changeLayout = layout =>
    this.setState({
      modalStatus: false,
      layout,
      selectedSkin: this.state.skins.filter(
        item => item.avatarCategoryId === layout,
      ),
      selectedIndex: 0,
    });

  findItemPrice = shopItemId => {
    let result = this.state.skins.find(item => item.id === shopItemId.id);
    return result && result.price !== 0 ? `$ ${result.price}` : 'select';
  };

  findSkin = id => {
    let result = this.state.skins.find(item => item.id === id);
    return result ? result.imageFileId : '';
  };

  goPrevItem = () => {
    let avatarItemIds = this.state.avatarItemIds.map(item => {
      if (item.avatarCategoryId === this.state.layout) {
        item.id = this.state.selectedSkin[this.state.selectedIndex - 1].id;
      }
      return item;
    });
    this.setState({selectedIndex: this.state.selectedIndex - 1, avatarItemIds});
  };

  goNextItem = () => {
    let avatarItemIds = this.state.avatarItemIds.map(item => {
      if (item.avatarCategoryId === this.state.layout) {
        item.id = this.state.selectedSkin[this.state.selectedIndex + 1].id;
      }
      return item;
    });
    this.setState({selectedIndex: this.state.selectedIndex + 1, avatarItemIds});
  };

  buyItem = shopItemId => {
    let result = this.state.skins.find(item => item.id === shopItemId.id);
    if (result) {
      this.setState({isLoading: true});
      axios
        .post(`/accounts/${this.state.accountId}/payments`, {
          shopItemId: shopItemId.id,
          redirectUrl: 'http://payment.com/',
        })
        .then(() => {})
        .catch(err => {
          this.setState({
            isLoading: false,
          });
          Alert.alert(
            typeof err.data.error.errorDescription
              ? err.data.error.errorDescription
              : 'There has been an error processing your request',
          );
        });
    }
  };

  save = () => {
    this.setState({isLoading: true});
    axios
      .put(`/accounts/${this.state.accountId}/avatar`, {
        avatarItemIds: this.state.avatarItemIds,
      })
      .then(() => {
        Alert.alert('Your new avatar is ready.');
        this.setState({isLoading: false});
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

  render() {
    const {
      modalStatus,
      items,
      layout,
      avatarItemIds,
      selectedSkin,
      selectedIndex,
      isLoading,
    } = this.state;
    return (
      <View style={styles.container}>
        <BackgroundImage type={0} />
        <InlineHader
          leftComponent={
            <LeftComponent
              layout={this.currentLayout(layout)}
              showModal={() => this.setState({modalStatus: true})}
            />
          }
          title=""
          rightComponent={<RightComponent save={this.save} />}
        />
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color="#fff" />
          </View>
        ) : (
          <View style={styles.container}>
            <View
              ref={ref => (this.scroll = ref)}
              style={styles.innerContainer}>
              <Image
                style={styles.defaultSkin}
                source={require('../../assets/images/general/avatar/men/Body.png')}
                resizeMode={'contain'}
              />
              {avatarItemIds.map((item, index) => {
                if (item.id !== 0) {
                  return (
                    <Image
                      style={[styles.itemImage, {zIndex: index + 1}]}
                      source={{
                        uri: `http://45.82.137.69:8002/files/${this.findSkin(
                          item.id,
                        )}/data`,
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }}
                      resizeMode={'contain'}
                      key={item.id}
                    />
                  );
                }
              })}
            </View>
            {selectedSkin.length > 0 && (
              <View style={styles.navbarContainer}>
                <TouchableOpacity
                  style={{padding: 10}}
                  onPress={() =>
                    selectedIndex !== 0 ? this.goPrevItem() : null
                  }>
                  <Image
                    style={{width: 20, height: 20}}
                    source={require('../../assets/images/general/avatar/left-arrow.png')}
                    resizeMode={'contain'}
                  />
                </TouchableOpacity>
                <Text
                  style={{fontSize: 20, color: '#fff', marginHorizontal: 10}}>
                  {selectedIndex + 1}/{selectedSkin.length}
                </Text>
                <TouchableOpacity
                  style={{padding: 10}}
                  onPress={() =>
                    selectedIndex + 1 < selectedSkin.length
                      ? this.goNextItem()
                      : null
                  }>
                  <Image
                    style={{width: 20, height: 20}}
                    source={require('../../assets/images/general/avatar/right-arrow.png')}
                    resizeMode={'contain'}
                  />
                </TouchableOpacity>
                <Text
                  style={{fontSize: 16, color: '#fff', marginHorizontal: 10}}>
                  Buy item
                </Text>
                <GreenButton
                  type={2}
                  onPress={() =>
                    this.buyItem(
                      this.state.selectedSkin[this.state.selectedIndex],
                    )
                  }>
                  <Text style={styles.buttonText}>
                    {this.findItemPrice(
                      this.state.selectedSkin[this.state.selectedIndex],
                    )}
                  </Text>
                </GreenButton>
              </View>
            )}
          </View>
        )}
        <AvatarModal
          items={items}
          status={modalStatus}
          layout={layout}
          onSubmit={this.changeLayout}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  rightButtonContainer: {flexDirection: 'row', alignItems: 'center'},
  rightButtonText: {fontSize: 16, color: '#fff'},
  headerTitleText: {
    fontSize: 18,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  innerContainer: {
    flex: 1,
    position: 'relative',
    paddingTop: 120,
  },
  defaultSkin: {
    width,
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1,
  },
  itemImage: {
    width,
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
  },
  navbarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
});
