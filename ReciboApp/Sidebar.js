

import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
 
const { width, height } = Dimensions.get('window');

//For React Navigation 4+
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';

import Page4 from './Page4';
import Page5 from './Page5';
import HomeScreen from './HomeScreen';

class NavigationDrawerStructure extends Component {
  //Structure for the navigatin Drawer
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Image
            source={require('./menu.png')}
            style={{ width: 28, height: 25, marginLeft: 8 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

// To Add Header on top of side Menu
const DrawerTopView = (props) => (
  <ScrollView 
    contentContainerStyle={{flexGrow: 1,  flexDirection: 'column', justifyContent: 'flex-start'}} 
    style = {{backgroundColor: '#fff', height: height}}
    >
      <View style={styles.item}>
        <View style={styles.iconContainer}>
          <Image source={require('./bill.png')} style={styles.icon}></Image>
        </View>
        <Text style={styles.label}>Welcome, Recibo User</Text>
      </View>
    <SafeAreaView forceInset={{ top: 'always', horizontal: 'never', }}>
      <DrawerItems {...props} />
    </SafeAreaView>

      <View style={styles.bottom}>
      <Text style={styles.version}>Version 1.0</Text>
      <Text style={styles.copyright}>Copyright Recibo Team. All Rights Reserved</Text>

      </View>

  </ScrollView>
);

// Common navigation style for all Pages
const navigations = ({ navigation }) => ({
  headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
  headerStyle: {
        backgroundColor: 'transparent',
  },
  headerTintColor: 'transparent',
  
});

const Page1_Stack = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: navigations,

  }
 
});

const Page4_Stack = createStackNavigator({
  Page4: {
    screen: Page4,
    navigationOptions: navigations,
  }
});

const Page5_Stack = createStackNavigator({
  Page5: {
    screen: Page5,
    navigationOptions: navigations,
  }
});

const DrawerNavigator = createDrawerNavigator({
  
  HomeScreen: {
    screen: Page1_Stack,
    navigationOptions: {
      drawerLabel: 'Home',
    },
  },
  Page4: {
    screen: Page4_Stack,
    navigationOptions: {
      drawerLabel: 'About Us',
    },
  },
  Page5: {
    screen: Page5_Stack,
    navigationOptions: {
      drawerLabel: 'Sign Out',
    },
  },
}, 
{
  contentComponent: DrawerTopView,
});

const styles = StyleSheet.create({
  item: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 325,
    backgroundColor: '#fff'
  },
  label: {
    fontSize: 18,
    marginTop: 0,
    marginBottom: 0,
    fontWeight: 'bold',
    color: '#FF0090',
  },
  iconContainer: {
    //marginLeft: 15,
    marginTop: 45,
    backgroundColor: 'transparent'
  },
  icon: {
    width: 50,
    height: 50,
  },
  bottom: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "center",
    height: 70,
    backgroundColor: '#FF0090', 
  },
  version: {
    fontSize: 13,
    fontWeight: '500',
    color: '#fff',
    marginTop: -10,
  },
  copyright: {
    fontSize: 12,
    fontWeight: '500',
    color: '#fff',
    marginTop: 5,
    textAlign: 'center'
  },
});

export default createAppContainer(DrawerNavigator);