/**
 * @format
 */

import { Navigation } from "react-native-navigation";

import App from './App';
import PageTwo from './PageTwo';

Navigation.registerComponent('com.myApp.WelcomeScreen', () => App);
Navigation.registerComponent('com.myApp.PageTwo', () => PageTwo);
Navigation.events().registerAppLaunchedListener(() => {
   Navigation.setRoot({
     root: {
       stack: {
         children: [
            {
              component: {
                name: 'com.myApp.WelcomeScreen'
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
