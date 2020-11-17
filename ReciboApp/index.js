/**
 * @format
 */

import { Navigation } from "react-native-navigation";

import Alert from './Alert';
import App from './App';
import PageTwo from './PageTwo';
import LogIn from './LogIn';
import RegisterPage from './RegisterPage';
import Activity from './Activity';

Navigation.registerComponent('com.Recibo.LogIn', () => LogIn);
Navigation.registerComponent('com.Recibo.RegisterPage', () => RegisterPage);
Navigation.registerComponent('com.Recibo.PageTwo', () => PageTwo);
Navigation.registerComponent('com.Recibo.Alert', () => Alert);
Navigation.registerComponent('com.Recibo.Activity', () => Activity);

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
