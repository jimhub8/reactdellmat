import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Text, Item, Input, Container, Content, Left, Right, Icon, Header } from 'native-base';
import FAIcon from 'react-native-vector-icons/FontAwesome'


import { DrawerActions } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import CardDeck from './inc/CardDeck';
import MyCarousel from './inc/MyCarousel';
import Infinitscroll from './inc/Infinitscroll';

import axios from 'axios';

const api_url = 'http://2b151179.ngrok.io/'

let { height, width } = Dimensions.get("window");

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: {
      visible: false
    }
  };

  constructor(props) {
    super(props);
    this.getItems = this.getItems.bind(this)

    this.state = ({
      api_products: [],
      best_sellers: [],
      featured: [],
      newproduct: [],
    })
  }
  getItems = () => {
    let headers = {
      // Authorization: 'Bearer ' + token //the token is a variable which holds the token
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
    axios.get(api_url + `api/products`, headers)
      .then(res => {
        console.log(res.data);
        this.setState({
          best_sellers: res.data.bestsellers.data,
          featured: res.data.featured.data,
          newproduct: res.data.newproduct.data
        })

        // const persons = res.data;
        // this.setState({ persons });
      }).catch((error) => {
        console.log(error);

      })
    return

  }

  componentDidMount() {
    this.getItems()
    console.log(this.props.parent_products);

  }


  render() {

    return (
      <>
      
        <Header style={styles.header}>
          <Left style={styles.left}>
            <Icon name="menu" style={styles.menu} onPress={() => {
              this.props.navigation.dispatch(DrawerActions.openDrawer())
            }} />
            <FAIcon name="apple" style={styles.amazon} />
          </Left>
          <Right>
            <Icon name="cart" style={styles.menu} />
          </Right>
        </Header>
        <ScrollView >
          <Container style={{ flexWrap: 'wrap' }}>
            <View style={styles.body}>
              <TouchableOpacity>
                <View style={styles.category}>
                  <Text style={{ fontSize: 12 }}>Shop by</Text>
                  <Text style={{ fontWeight: 'bold' }}>category</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.search}>
                <Item style={{ backgroundColor: 'white', paddingHorizontal: 10, borderRadius: 4 }}>
                  <Icon name="search" style={{ fontSize: 20, paddingTop: 5 }} />
                  <Input placeholder="search" />
                </Item>
              </View>
            </View>

            <Content style={styles.content}>
              <View style={styles.con_view}>
                <Text>Hello, Jimmy</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text>Your account</Text>
                  <Icon name="arrow-forward" style={{ fontSize: 18 }} />
                </View>
              </View>

                {/* <CardDeck featured={this.state.featured} />
                <MyCarousel newproduct={this.state.newproduct} featured={this.state.featured} best_sellers={this.state.best_sellers} /> */}
                <Infinitscroll newproduct={this.state.newproduct} featured={this.state.featured} best_sellers={this.state.best_sellers} />

            </Content>
          </Container>
        </ScrollView>
      </>
    );
  }
}


const styles = StyleSheet.create({
  body: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: 70,
    backgroundColor: '#3a455c',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  category: {
    width: 100,
    backgroundColor: '#e7e7eb',
    height: 50,
    borderRadius: 4,
    padding: 10,
  },
  content: {
    marginTop: 70,
    // backgroundColor: '#d5d5d6',
  },
  search: {
    flex: 1,
    height: '100%',
    marginLeft: 5,
    justifyContent: 'center',
  },
  con_view: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 5,
    height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },

  items: {
    margin: 10,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 5,
    // height: 400,
  },

  header: {
    backgroundColor: '#3a455c',
    height: 90,
    borderBottomColor: '#757575',
    borderBottomWidth: .5
  },
  left: {
    flexDirection: 'row'
  },
  menu: {
    color: Colors.lighter,
    marginRight: 15,
  },
  amazon: {
    fontSize: 32,
    color: '#ffffff',
  }
});


