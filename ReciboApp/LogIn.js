import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

import { Navigation } from 'react-native-navigation';

import { Alert } from './Alert'

export default class LogIn extends React.Component {
  state={
    email:"",
    password:""
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>RECIBO</Text>
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Enter Your Email"
            placeholderTextColor="grey"
            onChangeText={text => this.setState({email:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput style={styles.inputText}
            secureTextEntry
            placeholder="Enter Your Password"
            placeholderTextColor="grey"
            onChangeText={text => this.setState({password:text})}/>
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={() => {
                  Navigation.push(this.props.componentId, {
                    component: {
                      name: 'com.Recibo.Activity'
                    }
                  });
                }}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgot} onPress={() => {
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
                  title: "Oof...",
                  message: "Oh well. ¯\\_(ツ)_/¯"
                }
              },
            });
          }}>
          Forgot Password?
        </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgot} onPress={() => {
                  Navigation.push(this.props.componentId, {
                    component: {
                      name: 'com.Recibo.RegisterPage'
                    }
                  });
                }}>
            Don't have an account? Sign up here
          </Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
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
  forgot:{
    color:"#e01b84",
    fontSize:11,
    marginTop:5
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#e01b84",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:10,
    marginBottom:10
  },
  loginText:{
    color:"white",
    fontSize: 15,
    fontWeight:"bold"
  }
});
