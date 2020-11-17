/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { Navigation } from 'react-native-navigation';

import UserActivity from './UserActivity';

const PageTwo: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <View style={styles.friendRequests}>
                <Image source={require('./icons/icons8-add-user-male-96.png')} style={styles.friendRequestsIcon} />
                <View>
                  <Text>8 Friend Requests</Text>
                  <Text style={styles.friendRequestsApproveOrIgnore}>Approve or ignore requests</Text>
                </View>
              </View>
              <View style={styles.activityList}>
                <Text style={styles.sectionTitle}>Recent Activity</Text>
                <UserActivity user="hunter2" merchant="A Good Store" age="1d" sent="true" />
                <UserActivity user="dj" merchant="451 Books" age="2d" sent="true" />
                <UserActivity user="hunter2" merchant="A Good Store" age="4d"/>
                <UserActivity user="dj" merchant="A Good Store" age="1w"/>
                <UserActivity user="hunter2" merchant="The Pen Palace" age="1w" sent="true" />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  friendRequests: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  friendRequestsIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  friendRequestsApproveOrIgnore: {
    color: 'gray'
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  loginButton: {
    color: '#f194ff'
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default PageTwo;
