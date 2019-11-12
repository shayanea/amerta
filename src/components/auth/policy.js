import React from 'react';
import {Text, View, Modal, ScrollView, StyleSheet} from 'react-native';

import GreenButton from '../buttons/greenButton';

const Policy = ({status, onHide}) => {
  return (
    <View>
      <Modal transparent animationType={'fade'} visible={status}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Text style={styles.content}>
              Accessing and using any of the Websites implies that the User has
              read and accepts to be bound by these Terms without exception. In
              case the User does not accept the Terms or have any objection to
              any part of the present Terms the User must not use any of the
              Websites. Accessing and using any of the Websites implies that the
              User has read and accepts to be bound by these Terms without
              exception. In case the User does not accept the Terms or have any
              objection to any part of the present Terms the User must not use
              any of the Websites. Accessing and using any of the Websites
              implies that the User has read and accepts to be bound by these
              Terms without exception. In case the User does not accept the
              Terms or have any objection to any part of the present Terms the
              User must not use any of the Websites.
            </Text>
          </View>
          <GreenButton type={1} onPress={onHide}>
            <Text style={styles.buttonText}>OK</Text>
          </GreenButton>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  innerContainer: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 35,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  content: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
});

export default Policy;
