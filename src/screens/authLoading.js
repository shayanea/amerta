import React, {Component} from 'react';
import {StatusBar, View, Image, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.bootstrapAuhtentication();
  }

  bootstrapAuhtentication = async () => {
    const userToken = await AsyncStorage.getItem('@token');
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Image
          source={require('../assets/images/general/bg.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  backgroundImage: {flex: 1, width: '100%', height: '100%'},
});
