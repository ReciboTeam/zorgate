import React, { Component } from "react";
import { FlatList,  StyleSheet, View, ActivityIndicator, StatusBar } from "react-native";
import { Card } from "react-native-paper";
import firebase from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
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
        let currentUser = auth().currentUser.uid;
        console.log('Current user: ', currentUser);
        let arraySnapshots = await db
          .collection('users')
          .doc(currentUser)
          .get()
          .catch(error => console.log(error));
        console.log(arraySnapshots);
        let receipts = arraySnapshots.get('receipts');
        console.log('Array: ' , receipts);

        //Get the receipts 5 at a time
        let documentData = [];
          await db.collection('receipts')
          .where(firebase.firestore.FieldPath.documentId(), 'in', receipts.slice(Math.max(receipts.length - 5, 0)))
          .get()
          .then((snapshot) => {
              documentData = snapshot.docs.map(doc => doc.data());
          });

        if(documentData.empty) {
            console.log("No document found");
        }
        console.log(documentData);
          
        let allData = [];
          await db.collection('receipts')
          .where(firebase.firestore.FieldPath.documentId(), 'in', receipts)
          .get()
          .then((snapshot) => {
              allData = snapshot.docs.map(doc => doc.data());
          });

        if(allData.empty) {
            console.log("No document found");
        }
        console.log(allData);
        // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
        //let lastVisible = documentData[documentData.length - 1];
        // let lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1]
        let lastVisible = (receipts.length < 5) ? 0 : receipts.length - 5;
        // Set State
        this.setState({
          data: documentData.sort((a, b) => (a.dateTime < b.dateTime) ? 1 : -1),
          allData: allData.sort((a, b) => (a.dateTime < b.dateTime) ? 1 : -1),
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

        if (this.state.lastVisible == 0) {
            console.log('No more receipts');
            return;
        }

        // Cloud Firestore: Query
        let arraySnapshots = await db
          .collection('users')
          .doc(currentUser)
          .get()
          .catch(error => console.log(error));
        console.log(arraySnapshots);
        let receipts = arraySnapshots.get('receipts');
        console.log('Array: ' , receipts);

        let start = (this.state.lastVisible < 5) ? 0 : this.state.lastVisible - 5; // get the start receipt index
        console.log("receipts slice: ", receipts.slice(start , this.state.lastVisible));
        
        let documentData = [];
          await db.collection('receipts')
          .where(firebase.firestore.FieldPath.documentId(), 'in', receipts.slice(start, this.state.lastVisible))
          .get()
          .then((snapshot) => {
              documentData = snapshot.docs.map(doc => doc.data());
            });

        if(documentData.empty) {
            console.log("No document found");
        }
        console.log('documentData: ', documentData);
      
        // Set State
        console.log("set state");
        this.setState({
          data: [...this.state.data, ...documentData.sort((a, b) => (a.dateTime < b.dateTime) ? 1 : -1)],
          lastVisible: start,
          refreshing: false,
        });
      }
      catch (error) {
        console.log(error);
      }
    };

    // Pull to Refresh
    onRefresh() {
      this.setState({loading: true,},() => {this.retrieveData();});
    }
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
          keyExtractor={(item, index) => index.toString()}
        
          // Footer (Activity Indicator)
          onEndReached={this.retrieveMore}
          // How Close To The End Of List Until Next Data Request Is Made
          onEndReachedThreshold={0.1}
          // Refreshing (Set To True When End Reached)

          onRefresh={() => this.onRefresh()}
          refreshing={this.state.loading}
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
      backgroundColor: '#EFEFFF',
    },
    searchBarStyle: {
      justifyContent:"center",
      backgroundColor: '#EFEFFF',
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