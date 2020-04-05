import React, { Component } from 'react';

import { Text, Card, CardItem, Body, View, Icon, Footer, Left, Right } from 'native-base';
import { Dimensions, Image, StyleSheet } from 'react-native';

import StarRating from 'react-native-star-rating';
import axios from 'axios';

let { height, width } = Dimensions.get("window");
const api_url = 'http://101c8ecb.ngrok.io/'

export default class CardDeck extends Component {
    constructor(props) {
        super(props);
    }
 

    render() {

        var prods = [];

        for (let i = 0; i < this.props.featured.length; i++) {

            prods.push(
                <Card key={i} style={{ borderBottomColor: '#eee', borderBottomWidth: 1, }}>
                    <CardItem>
                        <Image source={{ uri: api_url + this.props.featured[i]['image'] }} style={{ height: 200, width: null, flex: 1 }} />
                        {/* <Image style={{ height: 100, width: 100 }} source={uri: this.props.featured[i]['image_url']} /> */}
                        <Body style={{ marginLeft: 20 }}>
                            <Text>{this.props.featured[i]['product_name']}</Text>
                            <Text note>KES {this.props.featured[i]['price']}</Text>
                            <StarRating disabled={false} emptyStar={'ios-star-outline'} fullStar={'ios-star'} halfStar={'ios-star-half'} iconSet={'Ionicons'} maxStars={5} rating={this.props.featured[i]['rating']} fullStarColor={'orange'} starSize={15} />
                        </Body>
                    </CardItem>
                </Card>
            )
        }

        return (
            <>
                <View style={styles.items}>
                    <View style={{ flexDirection: 'column' }}>
                        <View>
                            <Text style={{ fontSize: 23, borderBottomColor: '#eee', borderBottomWidth: 1, }}>Your Recomendations</Text>
                        </View>
                        {prods}

                        <CardItem footer>
                            <Left>

                            </Left>
                            <Right>
                                <Text>See more></Text>
                            </Right>

                        </CardItem>
                    </View>
                </View>
            </>
        );
    }
}



const styles = StyleSheet.create({
    items: {
        margin: 10,
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 5,
        // height: 400,
    },

});


