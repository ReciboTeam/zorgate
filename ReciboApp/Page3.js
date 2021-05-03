import React, { Component } from 'react';
import {View, Text } from 'react-native';

import styles from './AppStyle'

export default class Page3 extends Component {

  static navigationOptions = ({ navigation, props }) => ({
    title: "Search",
   });

  render() {
    return (
      <View style={styles.MainContainer}>

      </View>
    );
  }
}