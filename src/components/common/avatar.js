import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {getToken} from '../../services/service';

let token = null;

getToken().then(res => {
  token = res;
});

const Avatar = ({scale, id}) => {
  return (
    <View
      style={[
        styles.container,
        {width: scale, height: scale, borderRadius: scale / 2},
      ]}>
      <Image
        source={require('../../assets/images/general/avatar/ring.png')}
        style={[styles.ring, {width: scale, height: scale}]}
      />
      {id && token ? (
        <Image
          source={{
            uri: `http://45.82.137.69:8001/accounts/${id}/avatar?head=true`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }}
          style={[
            styles.avatarContainer,
            {borderRadius: scale / 2, bottom: scale < 90 ? 4 : 8},
          ]}
          resizeMode="cover"
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: 'rgba(0,0,0,0.5)',
    overflow: 'hidden',
  },
  ring: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 20,
  },
  avatarContainer: {
    position: 'absolute',
    top: -20,
    right: 0,
    bottom: 0,
    left: -10,
  },
});

export default Avatar;
