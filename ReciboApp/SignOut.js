import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firebaseConfig from "./firebaseConfig";
import { Navigation } from 'react-native-navigation';
import {Component} from 'react-native'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}

export default class SignOut extends Component {
    signOut = auth().signOut().then(function() {
        console.log('Signed Out');
        //Navigation.reset({
        //    index: 0,
        //    actions: [NavigationActions.navigate({ routeName: "com.Recibo.LogIn" })],
        //  });
        
      }, function(error) {
        console.error('Sign Out Error', error);
    });
    render() {
      return (
        <View>
            {this.signOut()}
        </View>
      );
    }
  }