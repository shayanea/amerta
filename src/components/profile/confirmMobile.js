/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  TextInput,
  ActivityIndicator,
  View,
  Modal,
  Alert,
  StyleSheet,
  Dimensions,
} from 'react-native';
import axios from '../../utils/axios';

import GreenButton from '../buttons/greenButton';
import RedButton from '../buttons/redButton';

const {width} = Dimensions.get('window');

const ConfirmMobileNumber = ({
  id,
  status,
  onHideModal,
  onUpdateMobileStatus,
}) => {
  const [code, setCode] = useState('');
  const [isLoading, setLoading] = useState(false);

  const confirmCode = () => {
    // setLoading(true);
    // axios
    //   .post(`/chats/${id}/messages`, {
    //     message,
    //   })
    //   .then(res => {
    //     onUpdateMobileStatus();
    //     setLoading(false);
    //   })
    //   .catch(err => {
    //     Alert.alert(
    //       err.data.error.errorDescription !== 'undefined'
    //         ? err.data.error.errorDescription
    //         : 'There has been an error processing your request',
    //     );
    //   });
  };

  return (
    <Modal animationType="fade" transparent={true} visible={status}>
      <View style={styles.modalContainer}>
        <TextInput
          placeholder="Confirm Code"
          style={styles.messageBox}
          keyboardAppearance="dark"
          autoCorrect={false}
          autoCapitalize={'none'}
          placeholderTextColor="#505050"
          onChangeText={text => setCode(text)}
        />
        <View style={styles.bottomContainer}>
          <GreenButton
            strech
            style={{flex: 1, marginRight: 15}}
            type={1}
            onPress={() => confirmCode()}>
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Confirm</Text>
            )}
          </GreenButton>
          <RedButton style={{flex: 1}} type={2} strech onPress={onHideModal}>
            <Text style={styles.buttonText}>Cancel</Text>
          </RedButton>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 20,
  },
  messageBox: {
    padding: 20,
    borderRadius: 10,
    width: width - 50,
    backgroundColor: '#fff',
    // height: 100,
    fontSize: 15,
  },
  bottomContainer: {
    marginTop: 15,
    width: width - 50,
    flexDirection: 'row',
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

export default ConfirmMobileNumber;
