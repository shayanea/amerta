/* eslint-disable react-native/no-inline-styles */
import React, {memo} from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
  View,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

const CategoryModal = memo(({onSubmit, status, items, layout}) => {
  const select = item => onSubmit(item);

  return (
    <Modal animationType="fade" transparent={true} visible={status}>
      <View style={styles.modalContainer}>
        {items.map((item, index) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={item.id}
            style={{
              backgroundColor:
                item.id === layout ? 'rgba(0,0,0,0.35)' : 'transparent',
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderTopColor:
                item.id === layout ? 'rgba(255,255,255,0.6)' : 'transparent',
              borderBottomColor:
                item.id === layout ? 'rgba(255,255,255,0.6)' : 'transparent',
              paddingHorizontal: 20,
              paddingVertical: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            onPress={() => select(item.id)}>
            <View style={{flexDirection: 'row'}}>
              {item.icon && (
                <Image
                  source={item.icon}
                  resizeMode="contain"
                  style={{width: 25, marginRight: 15}}
                />
              )}
              <Text
                style={{
                  fontSize: 20,
                  color: item.id === layout ? '#fff' : 'rgba(255,255,255,0.5)',
                }}>
                {item.title}
              </Text>
            </View>
            {item.id === layout && (
              <Text style={{fontSize: 22, color: '#FFA700'}}>Select</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndex: 20,
  },
  modalTextBox: {
    padding: 10,
    borderRadius: 10,
    width: width - 50,
    backgroundColor: '#fff',
    height: 100,
  },
  buttonContainer: {
    position: 'relative',
    width: width / 2 - 35,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    marginTop: 20,
    flexDirection: 'row',
  },
  buttonImageContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  buttonIconContainer: {
    height: 25,
    width: 25,
    position: 'absolute',
    left: 10,
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

export default CategoryModal;
