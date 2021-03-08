import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";

import { Navigation } from 'react-native-navigation';

import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAi9nwlRo8BWVO2NherGDsWfHWvoGBdXUU",
  authDomain: "recibo-fdb05.firebaseapp.com",
  databaseURL: "https://recibo-fdb05-default-rtdb.firebaseio.com",
  projectId: "recibo-fdb05",
  storageBucket: "",
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }


export default class RegisterPage extends React.Component {
  state={
    email:"",
    password:"",
    rePassword:"",
  }
 signUpUser = (email, password, rePassword) => {
    try {
      if (this.state.password <= 6) {
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
                    title: "Invalid Password.",
                    message: "Password should be more than five character",
                  }
            }
        });
        return;
      }
      else if (this.state.password != this.state.rePassword) {
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
                    title: "Passwords do not match",
                    message: "Enter the correct passwords.",
                  }
            }
        });
          return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => Navigation.pop(this.props.componentId))
      .catch(error =>  {
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
                    title: "Error",
                    message: error.toString(),
                  }
            }
        });
      });
    }
    catch (er) {
      console.log(er.toString());
    }
  }
  render(){
    const { email, password, rePassword } = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Recibo</Text>
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Enter Email"
            placeholderTextColor="#003f5c"
            selectionColor={'#e86fca'}
            onChangeText={text => this.setState({email:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Enter Password"
            placeholderTextColor="#003f5c"
            selectionColor={'#e86fca'}
            onChangeText={text => this.setState({password:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Re-enter Password"
            placeholderTextColor="#003f5c"
            selectionColor={'#e86fca'}
            onChangeText={text => this.setState({rePassword:text})}/>
        </View>
        <TouchableOpacity style={styles.registerBtn} onPress={() => {
            this.signUpUser(email, password, rePassword);
        }}>
          <Text style={styles.btnText}>
            Register
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelBtn} onPress={() => {
                  Navigation.pop(this.props.componentId);
                }}>
          <Text style={styles.btnText}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#e01b84",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    borderWidth: 2,
    borderColor: "grey",
    borderStyle: "solid",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"grey"
  },
  registerBtn: {
    width:"80%",
    backgroundColor:"#e01b84",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  cancelBtn:{
    width:"80%",
    backgroundColor:"#b0c4de",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginBottom:10,
  },
  btnText:{
    color: '#003f5c',
  }
});
