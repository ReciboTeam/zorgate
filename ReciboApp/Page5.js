import React, { Component } from 'react';
import {View, Text } from 'react-native';

import styles from './AppStyle'

export default class Page5 extends Component {

  static navigationOptions = ({ navigation, props }) => ({
    title: "Sign Out",
   });

  render() {
    return (
      <View style={styles.MainContainer}>

      </View>
    );
  }
}