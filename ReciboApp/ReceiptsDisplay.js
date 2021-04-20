import React, { Component } from "react";
import { FlatList, Text, StyleSheet, View, ActivityIndicator } from "react-native";
import { Card } from "react-native-paper";
import firebase from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAi9nwlRo8BWVO2NherGDsWfHWvoGBdXUU",
    authDomain: "recibo-fdb05.firebaseapp.com",
    databaseURL: "https://recibo-fdb05-default-rtdb.firebaseio.com",
    projectId: "recibo-fdb05",
    storageBucket: ""
  }  

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }

const db = firestore();

const data = [
    {
        "storeName": "Target",
        "dateTime": "2021-01-30T23:30:11.040Z",
        "entries": [
            {
                "itemName": "Socks",
                "quantity": 2,
                "price": 3.50
            },
            {
                "itemName": "Cup",
                "quantity": 1,
                "price": 10.99
            }
        ],
        "total": 17.99,
        "footer": "K Thx Bye"
    },
    {
        "storeName": "Walmart",
        "dateTime": "2021-06-30T23:30:11.040Z",
        "entries": [
            {
                "itemName": "Socks",
                "quantity": 2,
                "price": 3.50
            },
            {
                "itemName": "Cup",
                "quantity": 1,
                "price": 10.99
            }
        ],
        "total": 17.99,
        "footer": "K Thx Bye"
    },
    {
        "storeName": "Ross",
        "dateTime": "2021-04-30T23:30:11.040Z",
        "entries": [
            {
                "itemName": "Socks",
                "quantity": 2,
                "price": 3.50
            },
            {
                "itemName": "Cup",
                "quantity": 1,
                "price": 10.99
            }
        ],
        "total": 17.99,
        "footer": "K Thx Bye"
    },
];


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          limit: 10,
          lastVisible: null,
          loading: false,
          refreshing: false,
        };
      }
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

  render() {
    return (
    <View>
        
      <FlatList
        data={this.state.data}
        renderItem={({ item }) => {
          return (
            <View style={{paddingTop: 20, paddingBottom: 20}}>
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
            </View>

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
        refreshControl={
            <RefreshControl
             refreshing={this.state.refreshing}
             onRefresh={this._handleRefresh}
            />
          }
      />
    </View>
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
        
});