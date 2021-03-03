import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { Navigation } from 'react-native-navigation';

export default class RegisterPage extends React.Component {
  state={
    name:"",
    email:"",
    password:"",
    rePassword:"",
  }
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.appName}>Recibo</Text>
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Enter Name"
            placeholderTextColor="#003f5c"
            selectionColor={'#e86fca'}
            onChangeText={text => this.setState({name:text})}/>
        </View>
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
        <TouchableOpacity style={styles.loginBtn} onPress={() => {
                  Navigation.push(this.props.componentId, {
                    component: {
                      name: 'com.Recibo.PageTwo'
                    }
                  });
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
  appName: {
    fontWeight:"bold",
    fontSize:50,
    color:"#e86fca",
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
  loginBtn: {
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
