import React from "react";
import { Image, View, StyleSheet, Text } from "react-native";

export default class UserActivity extends React.Component {
    render() {
      return (
        <View style={styles.userActivityParent}>
          <Image source={require('./icons/icons8-male-user-96.png')} style={styles.profilePic} />
          <View>
            <Text>
              { this.props.sent &&
                <Text>
                  <Text style={styles.userName}>{this.props.user}</Text>
                  <Text> sent you a receipt from </Text>
                </Text>
              }
              { !(this.props.sent) &&
                <Text>
                  You sent <Text style={styles.userName}>{this.props.user}</Text>
                  <Text> a receipt from </Text>
                </Text>
              }
              <Text style={styles.merchantName}>{this.props.merchant}</Text>
            </Text>
            <Text style={styles.age}>{this.props.age}</Text>
            <View style={styles.responseRow}>
              <Image source={require('./icons/icons8-speech-96.png')} style={styles.responseIcon} />
              <Image source={require('./icons/icons8-heart-96.png')} style={styles.responseIcon} />
            </View>
          </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    age: {
      color: 'gray',
    },
    userName: {
      fontWeight: 'bold',
    },
    merchantName: {
      fontWeight: 'bold',
    },
    profilePic: {
      marginRight: 10,
      width: 40,
      height: 40,
      resizeMode: 'stretch',
    },
    responseIcon: {
      width: 20,
      height: 20,
      marginRight: 10,
      resizeMode: 'stretch',
    },
    responseRow: {
      marginTop: 10,
      flexDirection: 'row',
    },
    userActivityParent: {
      flexDirection: 'row',
      marginVertical: 10,
    }
  });
