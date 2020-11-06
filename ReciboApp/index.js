/**
 * @format
 */

import { Navigation } from "react-native-navigation";

import App from './App';
import PageTwo from './PageTwo';
import LogIn from './LogIn';

Navigation.registerComponent('com.Recibo.LogIn', () => LogIn);
Navigation.registerComponent('com.Recibo.PageTwo', () => PageTwo);

Navigation.events().registerAppLaunchedListener(() => {
   Navigation.setRoot({
     root: {
       stack: {
         children: [
            {
              component: {
                name: 'com.Recibo.LogIn'
              }
            } // ,
            // {
            //   component: {
            //     name: 'com.myApp.PageTwo'
            //   }
            // }
         ]
       }
     }
  });
});
