import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  Left,
  Body,
  Button,
  Icon,
  Text,
  ListItem,
  Thumbnail,
  Item,
  Input,
} from 'native-base';
import {
  StyleSheet,
} from 'react-native'
let helperArray = require('./userList.json');// use firestore
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: helperArray,
      usersFiltered: helperArray,
    };
  }
  componentDidMount() {}
  searchUser = text => {
    this.setState({
      usersFiltered: this.state.allUsers.filter(i =>
        i.name.toLowerCase().includes(text.toLowerCase()),
      ),
    });
  };
  render() {
    return (
      <Container>
        <Header searchBar rounded style={styles.searchBarStyle}>
          <Item style={styles.inputBoxStyle}>
            <Icon name="ios-search" />
            <Input
              selectionColor="#f194ff"
              placeholder="Search here..."
              onChangeText={text => this.searchUser(text)}
            />
          </Item>
        </Header>
        <Content>
          {this.state.usersFiltered.map(item => (
            <ListItem avatar>
              <Left>
                <Thumbnail source={{uri: item.image}} />
              </Left>
              <Body>
                <Text>{item.name}</Text>
                <Text note>{item.address}</Text>
              </Body>
            </ListItem>
          ))}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  searchBarStyle: {
    justifyContent:"center",
    backgroundColor: '#e01b84',
  },
  inputBoxStyle: {
    justifyContent:"center",
    borderRadius:50,
    height:"65%",
  },
  inputText: {
    color:"#f194ff",
  }
});