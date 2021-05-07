/**
 * @format
 */

import { Navigation } from "react-native-navigation";

import Alert from './Alert';
import App from './App';
import PageTwo from './PageTwo';
import LogIn from './LogIn';
import RegisterPage from './RegisterPage';
import HomeScreen from "./HomeScreen";
import ReceiptsDisplay from "./ReceiptsDisplay";
import Sidebar from './Sidebar';
import SearchPage from './SearchPage';
//import SignOut from './SignOut';

Navigation.registerComponent('com.Recibo.LogIn', () => LogIn);
Navigation.registerComponent('com.Recibo.RegisterPage', () => RegisterPage);
Navigation.registerComponent('com.Recibo.PageTwo', () => PageTwo);
Navigation.registerComponent('com.Recibo.Alert', () => Alert);
Navigation.registerComponent('com.Recibo.HomeScreen', () => HomeScreen);
Navigation.registerComponent('com.Recibo.ReceiptsDisplay', () => ReceiptsDisplay);
Navigation.registerComponent('com.Recibo.Sidebar', () => Sidebar);
Navigation.registerComponent('com.Recibo.SearchPage', () => SearchPage);
//Navigation.registerComponent('com.Recibo.SignOut', () => SignOut);

Navigation.events().registerAppLaunchedListener(() => {
   Navigation.setRoot({
     root: {
       stack: {
         children: [
            {
              component: {
                name: 'com.Recibo.LogIn'
              }
            }
         ]
       }
     }
  });
});
