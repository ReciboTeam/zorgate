import React, { Component } from 'react';
import {View, Text } from 'react-native';

import styles from './AppStyle'

export default class Page4 extends Component {

  static navigationOptions = ({ navigation, props }) => ({
    title: "About Us",
   });
  render() {
    return (
      <View style={styles.MainContainer}>

      </View>
    );
  }
}