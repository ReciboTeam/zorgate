import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firebaseConfig from "./firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}

export default class SignOut extends Component {
    signOut = auth().signOut().then(function() {
        console.log('Signed Out');
        Navigation.pop(this.props.componentId, {
            component: {
                name: 'com.Recibo.Sidebar'
            }
        });
      }, function(error) {
        console.error('Sign Out Error', error);
    });
    render() {
        this.signOut();
      return (
        
        <View>
            
        </View>
      );
    }
  }