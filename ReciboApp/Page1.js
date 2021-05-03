import React, { Component } from 'react';
import {View, Button } from 'react-native';

import styles from './AppStyle'

export default class Page1 extends Component {

  static navigationOptions = ({ navigation, props }) => ({
    title: "Home",
   });

  render() {

    const {navigate} = this.props.navigation;

    return (

      <View style={styles.MainContainer}>

     

      </View>
    );
  }
}