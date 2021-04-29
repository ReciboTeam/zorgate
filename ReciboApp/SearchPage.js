import React, { Component } from "react";
import { FlatList,  StyleSheet, View, ActivityIndicator, StatusBar } from "react-native";
import { Card } from "react-native-paper";
import {
  Container,
  Header,
  Content,
  Left,
  Right,
  Body,
  Button,
  Icon,
  Text,
  ListItem,
  Thumbnail,
  Item,
  Input,
  Footer,
  Segment,
  TouchableOpacity,
} from 'native-base';


import firebase from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore';

import firebaseConfig from "./firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}

const db = firestore();


export default class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        allData: [],
        limit: 10,
        lastVisible: null,
        loading: false,
        refreshing: false,
        selected : 0,
      };
    }
    searchName = text => {
      this.setState({
        data: this.state.allData.filter(i =>
          i.storeName.toLowerCase().includes(text.toLowerCase()),
        ),
      },);
    };
      
        // Component Did Mount
    componentDidMount = () => {
      try {
        // Cloud Firestore: Initial Query
        this.retrieveData();
      }
      catch (error) {
        console.log(error);
      }
    };
    // Retrieve Data
    retrieveData = async () => {
      try {
        // Set State: Loading
        this.setState({
          loading: true,
        });
        console.log('Retrieving Data');
        // Cloud Firestore: Query
        let initialQuery = await db.collection('receipts')
          .orderBy("dateTime", "desc")
          .limit(10)
          
          
        // Cloud Firestore: Query Snapshot
        let documentSnapshots = await initialQuery
        .get()
        .catch(error => console.log(error));

        if(documentSnapshots.empty) {
            console.log("No Documents.");
        }
        console.log(documentSnapshots);
        // Cloud Firestore: Document Data
        let documentData = documentSnapshots.docs.map(document => document.data());
        console.log(documentData);
        
        // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
        //let lastVisible = documentData[documentData.length - 1];
        let lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1]
        // Set State
        this.setState({
          data: documentData,
          allData: documentData,
          lastVisible: lastVisible,
          loading: false,
        });
      }
      catch (error) {
        console.log(error);
      }
    };
    
    retrieveMore = async () => {
      try {
        // Set State: Refreshing
        this.setState({
          refreshing: true,
        });
        console.log('Retrieving additional Data');
        console.log(this.state.lastVisible.data().dateTime);
        let lastDateTime = this.state.lastVisible.data().dateTime;
        // Cloud Firestore: Query (Additional Query)
        let additionalQuery = await db.collection('receipts')
          .orderBy("dateTime", "desc")
          //.startAfter(this.state.lastVisible.data[dateTime])
          .where("dateTime", "<", lastDateTime)
          .limit(this.state.limit)

        console.log("Query done");
        // Cloud Firestore: Query Snapshot
        let documentSnapshots = await additionalQuery.get().catch(error => console.log(error));
        // Cloud Firestore: Document Data
        console.log(documentSnapshots);
        let documentData = documentSnapshots.docs.map(document => document.data());
        // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
        let lastVisible = documentData[documentData.length - 1];
        // Set State
        console.log("set state");
        this.setState({
          data: [...this.state.data, ...documentData],
          // allData: [...this.state.data, ...documentData],
          lastVisible: lastVisible,
          refreshing: false,
        });
      }
      catch (error) {
        console.log(error);
      }
    };
    // Render Header
    renderHeader = () => {
        try {
        return (
            <Text style={styles.headerText}>Items</Text>
        )
        }
        catch (error) {
            console.log(error);
        }
    };
    // Render Footer
    renderFooter = () => {
        try {
        // Check If Loading
        if (this.state.loading) {
            return (
            <ActivityIndicator />
            )
        }
        else {
            return null;
        }
        }
        catch (error) {
        console.log(error);
        }
    };
  // state = { selected: 1 }
  render() {
    return (
      <Container style={styles.containerStyle}>
        <Header hasSegment searchBar rounded 
          // androidStatusBarColor="#2c3e50"
          style={styles.searchBarStyle}>
          <StatusBar 
            barStyle="light-content"
            backgroundColor="black"/>
          <Item style={styles.inputBoxStyle}>
            <Icon name="ios-search" />
            <Input
              selectionColor="#e86fca"
              placeholder="Search here..."
              onChangeText={text => this.searchName(text)}
              // onChangeText={text => this.searchCat(text)}
              // onChangeText={text => {
              //   this.searchName(text);
              //   this.searchCat(text);
              // }}
            />
          </Item>
        </Header>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => {
            return (
              <Content style={{paddingTop: 20, paddingBottom: 20}}>
                <Card style={{marginHorizontal: 25, borderWidth: 0.5, marrginVerticle: 1}}>
                  <Text style={styles.centerTextBold}>{item.storeName}</Text>
                  <Text style={styles.time}>{item.dateTime}</Text>
                  <Text style={{textAlign: "center",paddingTop: 10, paddingBottom: 10}}>*****************************************</Text>

                  <View style={styles.description}>
                    <Text style={styles.boldItem}>Items</Text>
                    <Text style={styles.boldItem}>Unit Price</Text>  
                  </View>
                  <FlatList
                    data={item.entries}
                    renderItem={({ item }) => {
                      return(
                        <View style={styles.description}>
                          <Text style={styles.item}>{item.quantity} x {item.itemName}</Text>
                          <Text  style={styles.item}>{item.price}</Text>
                        </View>
                      )}}
                    keyExtractor={(item, index) => index}
                  />

                    <Text style={{textAlign: "center", paddingTop: 20, paddingBottom: 10}}>===================================</Text>

                    <View style={styles.description}>
                      <Text style={styles.boldItem}>Total Amount</Text>
                      <Text style={styles.boldItem}>{item.total}</Text>  
                    </View>
                    <Text style={{textAlign: "center", paddingTop: 10, paddingBottom: 10}}>===================================</Text>
                    <Text style={styles.centerTextBold}>{item.footer}</Text>
                    <Text style={{textAlign: "center", paddingTop: 10, paddingBottom: 10}}>===================================</Text>
                    
                </Card>
                  
              </Content>
              
            );
            
          }}
          keyExtractor={(item, index) => index}
          
          // Footer (Activity Indicator)
          ListFooterComponent={this.renderFooter}
          // On End Reached (Takes a function)
          onEndReached={this.retrieveMore}
          // How Close To The End Of List Until Next Data Request Is Made
          onEndReachedThreshold={0.1}
          // Refreshing (Set To True When End Reached)
          refreshing={this.state.refreshing}
        />
        
      </Container>
    
    );
  }
}

const styles = StyleSheet.create({
    centerTextBold: {
        fontSize: 24,
        textAlign: "center",
        fontWeight: "bold"
    },
    time: {
        flex: 1,
        fontSize: 15,
        textAlign: "center"
    },
    item: {
        fontSize: 16,
    },
    boldItem: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    description: {
        flex:1,
        flexDirection:'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20
    },
    footer: {
        paddingTop: 20
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderColor: 'grey',
        backgroundColor: 'white',
    },

    containerStyle: {
      backgroundColor: 'lightgrey',
    },
    searchBarStyle: {
      justifyContent:"center",
      backgroundColor: 'lightgrey',
    },
    inputBoxStyle: {
      justifyContent:"center",
      borderRadius:50,
      height:"65%",
    },
    inputText: {
      color:"#e86fca",
    },
});