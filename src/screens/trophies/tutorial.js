import React from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';

import BackgroundImage from '../../components/common/backgroundImage';
import InnerHeader from '../../components/header/innerHeader';
import LineDivider from '../../components/common/lineDivider';

const Tutorial = () => {
  return (
    <View style={styles.container}>
      <BackgroundImage type={1} />
      <InnerHeader title="Game Guide" />
      <ScrollView
        style={styles.listContainer}
        contentContainerStyle={styles.listInnerContainer}>
        <LineDivider text={'Badges'} />
        <Text style={styles.listItemsText}>
          Accessing and using any of the Websites implies that the User has read
          and accepts to be bound by these Terms without exception. In case the
          User does not accept the Terms or have any objection to any part of
          the present Terms the User must not use any of the Websites.
        </Text>
        <LineDivider text={'Sky'} />
        <Text style={styles.listItemsText}>
          Accessing and using any of the Websites implies that the User has read
          and accepts to be bound by these Terms without exception. In case the
          User does not accept the Terms or have any objection to any part of
          the present Terms the User must not use any of the Websites.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  listContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  listInnerContainer: {flexDirection: 'column'},
  listItemsText: {fontSize: 16, color: '#fff', paddingHorizontal: 20},
});

export default Tutorial;
