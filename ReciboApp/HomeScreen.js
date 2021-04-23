/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import FriendList from './FriendList';
import PageTwo from './PageTwo';
import ReceiptsDisplay from './ReceiptsDisplay';
import SearchPage from './SearchPage';
import {
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
import Icon from 'react-native-vector-icons/Ionicons';
import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: ReceiptsDisplay,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-home'} />
          </View>
        ),
      }
    },

    Search: {
      screen: SearchPage,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-search'} />
          </View>
        ),
        activeColor: '#ffffff',
        inactiveColor: '#C0C0C0',
        barStyle: { backgroundColor: '#FF1493'},
      }
    },
    Scan: {
      screen: PageTwo,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-camera'} />
          </View>
        ),
        activeColor: '#ffffff',
        inactiveColor: '#C0C0C0',
        barStyle: { backgroundColor: '#FF1493'},
      }
    },
    

   
  
  },
  {
    initialRouteName: 'Home',
    activeColor: '#ffffff',
    inactiveColor: '#C0C0C0',
    barStyle: { backgroundColor: '#FF1493' },
  }
);

export default createAppContainer(TabNavigator);