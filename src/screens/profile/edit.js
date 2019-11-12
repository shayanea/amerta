/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';

import axios from '../../utils/axios';
import {updateProfile} from '../../actions/profileActions';

import BackgroundImage from '../../components/common/backgroundImage';
import InnerHeader from '../../components/header/innerHeader';
import RedButton from '../../components/buttons/redButton';
import OrangeButton from '../../components/buttons/orangeButton';
import GreenButton from '../../components/buttons/greenButton';

const RightComponent = ({onPress}) => {
  return (
    <TouchableOpacity
      style={styles.updateContainer}
      activeOpacity={0.9}
      onPress={onPress}>
      <Text style={styles.updateText}>Update</Text>
    </TouchableOpacity>
  );
};

const EditProfile = ({navigation, updateProfile}) => {
  const [isLoading, setLoading] = useState(false);
  const [profile, setProfile] = useState(navigation.state.params.profile);

  const update = () => {
    setLoading(true);
    axios
      .put(`/accounts/${profile.id}`, {
        nickName: profile.nickName,
        firstName: profile.firstName,
        lastName: profile.lastName,
        birthDate: profile.birthDate,
        phoneNumber: profile.phoneNumber,
        email: profile.email,
        genderId: profile.genderId,
        receiveNotifications: profile.receiveNotifications,
        friendsOnlyBattleInvitations: profile.friendsOnlyBattleInvitations,
        searchableByEmailAddressOrUsername:
          profile.searchableByEmailAddressOrUsername,
      })
      .then(res => {
        updateProfile(profile);
        setLoading(false);
        navigation.goBack();
      })
      .catch(err => {
        setLoading(false);
        Alert.alert(
          err.data.error.errorDescription !== 'undefined'
            ? err.data.error.errorDescription
            : 'There has been an error processing your request',
        );
      });
  };

  const deActiveUser = () => {
    Alert.alert(
      'Notice!',
      'Are you sure you want to deactive your account?',
      [
        {
          text: 'No',
          onPress: () => true,
          style: 'cancel',
        },
        {text: "Yes, I'm sure", onPress: () => deActive()},
      ],
      {cancelable: true},
    );
  };

  const deActive = () => {
    setLoading(true);
    axios
      .post('/accounts/deactivated', {
        accountId: profile.id,
      })
      .then(res => {
        setLoading(false);
        navigation.dispatch(NavigationActions.navigate({routeName: 'Auth'}));
      });
  };

  const changePassword = () => {
    axios
      .post('/accounts/resetpasswordrequests', {
        email: profile.email,
      })
      .then(res => {
        setLoading(false);
        Alert.alert('Please, check your email to reset your password');
      })
      .catch(err => {
        setLoading(false);
        Alert.alert(
          err.data.error.errorDescription !== 'undefined'
            ? err.data.error.errorDescription
            : 'There has been an error processing your request',
        );
      });
  };

  return (
    <View style={styles.container}>
      <BackgroundImage type={1} />
      <InnerHeader
        title="Edit Profile"
        rightComponent={<RightComponent onPress={() => update()} />}
      />
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="#fff" />
        </View>
      )}
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          paddingBottom: 70,
          paddingHorizontal: 20,
          paddingTop: 30,
        }}>
        <TextInput
          defaultValue={profile.nickName}
          placeholder="Nickname"
          placeholderTextColor="#505050"
          style={styles.formInput}
          keyboardAppearance="dark"
          autoCorrect={false}
          autoCapitalize={'none'}
          maxLength={200}
        />
        <TextInput
          defaultValue={profile.firstName}
          placeholder="First name"
          placeholderTextColor="#505050"
          style={styles.formInput}
          keyboardAppearance="dark"
          autoCorrect={false}
          autoCapitalize={'none'}
          maxLength={200}
          onChangeText={firstName => setProfile({...profile, firstName})}
        />
        <TextInput
          defaultValue={profile.lastName}
          placeholder="Last name"
          placeholderTextColor="#505050"
          style={styles.formInput}
          keyboardAppearance="dark"
          autoCorrect={false}
          autoCapitalize={'none'}
          maxLength={200}
          onChangeText={lastName => setProfile({...profile, lastName})}
        />
        {Platform.OS === 'ios' && (
          <RNPickerSelect
            onValueChange={genderId => setProfile({...profile, genderId})}
            items={[
              {label: 'Male', value: '1'},
              {label: 'Female', value: '2'},
            ]}
            style={pickerSelectStyles}
            value={profile.genderId}
          />
        )}
        {Platform.OS === 'android' && (
          <View
            style={{
              backgroundColor: '#fff',
              overflow: 'hidden',
              borderRadius: 30,
              marginBottom: 20,
              paddingHorizontal: 10,
            }}>
            <RNPickerSelect
              onValueChange={genderId => setProfile({...profile, genderId})}
              items={[
                {label: 'Male', value: '1'},
                {label: 'Female', value: '2'},
              ]}
              style={pickerSelectStyles}
              value={profile.genderId}
            />
          </View>
        )}
        <DatePicker
          style={{width: '100%', marginVertical: 10}}
          date={profile.birthDate}
          mode="date"
          placeholder="Birthdate"
          format="YYYY-MM-DD"
          minDate="1920-01-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateInput: {
              ...styles.formInput,
              ustifyContent: 'flex-start',
              alignItems: 'flex-start',
              color: '#505050',
            },
            placeholderText: {
              color: '#505050',
            },
          }}
          onDateChange={birthDate => {
            setProfile({...profile, birthDate});
          }}
          showIcon={false}
        />
        <View style={styles.formGroup}>
          <View style={styles.inputHolder}>
            <TextInput
              defaultValue={profile.phoneNumber}
              keyboardType="phone-pad"
              placeholder="Phone Number"
              placeholderTextColor="#505050"
              style={styles.formInput}
              keyboardAppearance="dark"
              onChangeText={phoneNumber =>
                setProfile({...profile, phoneNumber})
              }
            />
            {profile.isPhoneNumberVerified && (
              <Image
                style={styles.formIcon}
                source={require('../../assets/images/general/buttons/check.png')}
                resizeMode={'contain'}
              />
            )}
          </View>
          {!profile.isPhoneNumberVerified && (
            <GreenButton style={{flex: 1}} type={2}>
              <Text style={[styles.textButton, {fontSize: 14}]}>Confirm</Text>
            </GreenButton>
          )}
        </View>
        <View style={styles.formGroup}>
          <View style={styles.inputHolder}>
            <TextInput
              defaultValue={profile.email}
              keyboardType="email-address"
              placeholder="Email"
              placeholderTextColor="#505050"
              style={styles.formInput}
              keyboardAppearance="dark"
              onChangeText={email => setProfile({...profile, email})}
            />
            {profile.isEmailVerified && (
              <Image
                style={styles.formIcon}
                source={require('../../assets/images/general/buttons/check.png')}
                resizeMode={'contain'}
              />
            )}
          </View>
          {!profile.isEmailVerified && (
            <GreenButton style={{flex: 1}} type={2}>
              <Text style={[styles.textButton, {fontSize: 14}]}>Confirm</Text>
            </GreenButton>
          )}
        </View>
        <TouchableOpacity
          style={styles.formGroup}
          onPress={() =>
            setProfile({
              ...profile,
              receiveNotifications: !profile.receiveNotifications,
            })
          }>
          <View style={styles.checkboxContainer}>
            {profile.receiveNotifications && (
              <View style={styles.checkboxChild} />
            )}
          </View>
          <Text style={styles.checkboxText}>Receive Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.formGroup}
          onPress={() =>
            setProfile({
              ...profile,
              searchableByEmailAddressOrUsername: !profile.searchableByEmailAddressOrUsername,
            })
          }>
          <View style={styles.checkboxContainer}>
            {profile.searchableByEmailAddressOrUsername && (
              <View style={styles.checkboxChild} />
            )}
          </View>
          <Text style={styles.checkboxText}>
            People can find me by email address or nickname
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.formGroup}
          onPress={() =>
            setProfile({
              ...profile,
              friendsOnlyBattleInvitations: !profile.friendsOnlyBattleInvitations,
            })
          }>
          <View style={styles.checkboxContainer}>
            {profile.friendsOnlyBattleInvitations && (
              <View style={styles.checkboxChild} />
            )}
          </View>
          <Text style={styles.checkboxText}>
            Only recieve battle invitation from friends
          </Text>
        </TouchableOpacity>
        <RedButton
          style={{marginBottom: 15}}
          strech
          type={1}
          onPress={deActiveUser}>
          <Text style={styles.textButton}>Deactive Account</Text>
        </RedButton>
        <OrangeButton strech type={1} onPress={changePassword}>
          <Text style={styles.textButton}>Change Password</Text>
        </OrangeButton>
      </ScrollView>
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    textAlign: 'left',
    paddingHorizontal: 15,
    height: 35,
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 30,
    marginBottom: 20,
  },
  inputAndroid: {
    textAlign: 'left',
    height: 35,
    width: '100%',
  },
  placeholder: {
    color: '#222',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  updateContainer: {
    paddingHorizontal: 10,
  },
  updateText: {
    fontSize: 14,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  formGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  inputHolder: {
    position: 'relative',
    width: '75%',
    height: 35,
    marginRight: 10,
  },
  formInput: {
    textAlign: 'left',
    paddingHorizontal: 15,
    height: 35,
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 30,
    marginBottom: 20,
  },
  formIcon: {
    height: 20,
    width: 20,
    position: 'absolute',
    right: 10,
    top: 8,
  },
  formCheckIcon: {height: 35, marginBottom: 0, width: 80},
  checkboxContainer: {
    width: 25,
    height: 25,
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChild: {
    width: 12,
    height: 12,
    borderRadius: 11,
    backgroundColor: '#fff',
  },
  checkboxText: {fontSize: 16, color: '#fff', marginLeft: 20, flex: 1},
  textButton: {
    color: '#fff',
    fontSize: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
});

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {updateProfile})(EditProfile);
