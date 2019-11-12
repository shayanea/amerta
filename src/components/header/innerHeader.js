import React, {memo} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import {withNavigation} from 'react-navigation';

const {width} = Dimensions.get('window');

const Header = memo(
  ({title, leftComponent, rightComponent, navigation, root}) => {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'#1C2536'} barStyle="light-content" />
        <Image
          style={styles.backgroundContainer}
          source={require('../../assets/images/general/header/header2.png')}
        />
        <View style={styles.innerHeaderContainer}>
          {title !== '' && (
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.backButton}
              onPress={() => (!root ? navigation.goBack() : null)}>
              {!root && (
                <Image
                  style={styles.backButtonImage}
                  source={require('../../assets/images/general/buttons/back-button.png')}
                  resizeMode="contain"
                />
              )}
              <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>
          )}
          {leftComponent}
          {rightComponent}
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width,
    height: 120,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    width,
  },
  innerHeaderContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  title: {
    flex: 2,
    fontSize: 18,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  backButton: {flexDirection: 'row', alignItems: 'center', flex: 1},
  backButtonImage: {width: 18, height: 18, marginRight: 10},
});

export default withNavigation(Header);
