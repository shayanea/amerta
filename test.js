<ScrollView
  style={styles.formContainer}
  contentContainerStyle={{paddingBottom: 70}}>
  <TextInput
    defaultValue={profile.nickName}
    placeholder="Username"
    placeholderTextColor="#505050"
    style={styles.formInput}
    keyboardAppearance="dark"
    autoCorrect={false}
    autoCapitalize={'none'}
    maxLength={200}
    onChangeText={text =>
      this.setState({profile: {...this.state.profile, nickName: text}})
    }
  />
  <TextInput
    defaultValue={profile.firstName}
    placeholder="Firstname"
    placeholderTextColor="#505050"
    style={styles.formInput}
    keyboardAppearance="dark"
    autoCorrect={false}
    autoCapitalize={'none'}
    maxLength={200}
    onChangeText={text =>
      this.setState({profile: {...this.state.profile, firstName: text}})
    }
  />
  <TextInput
    defaultValue={profile.lastName}
    placeholder="Lastname"
    placeholderTextColor="#505050"
    style={styles.formInput}
    keyboardAppearance="dark"
    autoCorrect={false}
    autoCapitalize={'none'}
    maxLength={200}
    onChangeText={text =>
      this.setState({profile: {...this.state.profile, lastName: text}})
    }
  />
  <DatePicker
    style={{width: '100%', marginVertical: 10}}
    date={profile.birthDate}
    mode="date"
    placeholder="Birthday Date"
    format="YYYY-MM-DD"
    minDate="1990-05-01"
    confirmBtnText="Confirm"
    cancelBtnText="Cancel"
    customStyles={{
      dateInput: {
        ...styles.formInput,
        ustifyContent: 'flex-start',
        alignItems: 'flex-start',
      },
      placeholderText: {
        color: '#505050',
      },
    }}
    onDateChange={date => {
      this.setState({
        profile: {...this.state.profile, birthDate: date},
      });
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
        onChangeText={text =>
          this.setState({
            profile: {...this.state.profile, phoneNumber: text},
          })
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
    {/* {!profile.isPhoneNumberVerified && (
              <GreenButton
                style={styles.formCheckIcon}
                textStyle={{fontSize: 16}}
                text="Confirm"
              />
            )} */}
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
        onChangeText={text =>
          this.setState({profile: {...this.state.profile, email: text}})
        }
      />
      {profile.isEmailVerified && (
        <Image
          style={styles.formIcon}
          source={require('../../assets/images/general/buttons/check.png')}
          resizeMode={'contain'}
        />
      )}
    </View>
    {/* {!profile.isEmailVerified && (
              <GreenButton
                style={styles.formCheckIcon}
                textStyle={{fontSize: 16}}
                text="Confirm"
              />
            )} */}
  </View>
  <TouchableOpacity
    style={styles.formGroup}
    onPress={() =>
      this.setState({
        profile: {
          ...this.state.profile,
          receiveNotifications: !this.state.profile.receiveNotifications,
        },
      })
    }>
    <View style={styles.checkboxContainer}>
      {profile.receiveNotifications && <View style={styles.checkboxChild} />}
    </View>
    <Text style={styles.checkboxText}>Receive Notifications</Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={styles.formGroup}
    onPress={() =>
      this.setState({
        profile: {
          ...this.state.profile,
          searchableByEmailAddressOrUsername: !this.state.profile
            .searchableByEmailAddressOrUsername,
        },
      })
    }>
    <View style={styles.checkboxContainer}>
      {profile.searchableByEmailAddressOrUsername && (
        <View style={styles.checkboxChild} />
      )}
    </View>
    <Text style={styles.checkboxText}>
      Peaple can find me by email address, username
    </Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={styles.formGroup}
    onPress={() =>
      this.setState({
        profile: {
          ...this.state.profile,
          friendsOnlyBattleInvitations: !this.state.profile
            .friendsOnlyBattleInvitations,
        },
      })
    }>
    <View style={styles.checkboxContainer}>
      {profile.friendsOnlyBattleInvitations && (
        <View style={styles.checkboxChild} />
      )}
    </View>
    <Text style={styles.checkboxText}>
      Only Friends can invite me to a new battle
    </Text>
  </TouchableOpacity>
  {/* <RedButton
            style={{height: 40}}
            text={'Deactive Account'}
            onPress={() => this.deActive()}
          />
          <OrangeButton
            style={{height: 40}}
            text={'Change Password'}
            onPress={() => this.chnagePassword()}
          /> */}
</ScrollView>;
