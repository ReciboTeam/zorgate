/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
'use strict';

import functions from '@react-native-firebase/functions';
import firebase from '@react-native-firebase/app';
require("firebase/functions");  // Required for side-effects

import firebaseConfig from './firebaseConfig';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  Alert
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Navigation } from 'react-native-navigation';
import QRCodeScanner from 'react-native-qrcode-scanner';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }

export default class PageTwo extends React.Component {
  showReceipt = (receipt) => {
    Navigation.showOverlay({
      component: {
          name: 'com.Recibo.Alert',
          options: {
              layout: {
                    componentBackgroundColor: 'transparent',
                  },
              overlay: {
                interceptTouchOutside: true
              },
            },
            passProps: {
              title: "Receipt",
              message: `${JSON.stringify(receipt)}`,
            }
      }
    });
  }

  onSuccess = e => {
    const documentId = e.data;


    console.log(functions);
    const getReceipt = functions().httpsCallable('registerReceipt');

    getReceipt({documentId: documentId})
      .then((result) => {
        console.log(result);
        this.showReceipt(/* result.data */ "Receipt Scanned");
      })
      .catch((error) => console.error("receipt error", error.code, error.message, error.details));
  };

  createTwoButtonAlert = () =>
  Alert.alert(
    "QR Code Scanner",
    "Position your camera to capture the QR code.",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ],
    { cancelable: false }
  );

  render() {
    return (
        this.createTwoButtonAlert(),
      <QRCodeScanner
        onRead={this.onSuccess}
        flashMode={RNCamera.Constants.FlashMode.torch}
      />
    );
  }
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
    },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});
