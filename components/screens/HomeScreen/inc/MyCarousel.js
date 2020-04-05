import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { Grid, Col, Item, Card, CardItem, Body, Left, Right, Header } from 'native-base';
import StarRating from 'react-native-star-rating';
const api_url = 'http://2b151179.ngrok.io/'

export default class MyCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chunk: this.chunk
    };
  }


  chunk(array, chunkSize) {
    return [].concat.apply([],
      array.map(function (elem, i) {
        return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
      })
    );
  };


  render() {

    // let { data, chunk } = this.state;
    // let dataForChunk = [...data];
    // dataForChunk.splice(0, 1); //removes 1st index of array
    let dataForChunk = this.props.best_sellers
    let dataForFeatured = this.props.featured
    let dataForNew = this.props.newproduct
    let chunkedArr = this.chunk(dataForChunk, 2);
    let FeaturedArr = this.chunk(dataForFeatured, 2);
    let newArr = this.chunk(dataForNew, 2);


    return (
      <>
        <Header style={{ backgroundColor: '#e5e5e5' }}>
          <Left>
            <Text style={{ fontWeight: '700', fontSize: 16, justifyContent: 'center' }}>Best Sellers</Text>
          </Left>
          <Right>
            <Text style={{ fontWeight: '700', fontSize: 16, justifyContent: 'center' }}>See more></Text>
          </Right>
        </Header>
        <Swiper style={styles.wrapper} autoplay dot={
          <View
            style={{
              display: 'none'
            }}
          />
        }
          activeDot={
            <View
              style={{
                display: 'none'
              }}
            />
          }>
          {chunkedArr.map((arr, index) => {
            return (
              <Grid key={index}>
                {arr.map(item => {
                  return (
                    <Col key={item.id}>
                      <Card>
                        <CardItem cardBody>
                        <Image source={{ uri: api_url + item.image }} style={{ height: 100, flex: 1 }} />
                          {/* <Image source={item.image} style={{ height: 100, flex: 1 }} /> */}
                        </CardItem>
                        <CardItem>
                          <Left>
                            <Text>{item.product_name}</Text>
                          </Left>
                          <Body>
                            <Text note>KES {item.price}</Text>
                          </Body>
                          <Right>
                            <StarRating disabled={false} emptyStar={'ios-star-outline'} fullStar={'ios-star'} halfStar={'ios-star-half'} iconSet={'Ionicons'} maxStars={5} rating={item.rating} fullStarColor={'orange'} starSize={10} />
                          </Right>
                        </CardItem>
                      </Card>

                    </Col>
                  );
                })}
              </Grid>
            )
          })}
        </Swiper>

        <Header style={{ backgroundColor: '#e5e5e5', marginTop: -70 }}>
          <Left>
            <Text style={{ fontWeight: '700', fontSize: 16, justifyContent: 'center' }}>New products</Text>
          </Left>
          <Right>
            <Text style={{ fontWeight: '700', fontSize: 16, justifyContent: 'center' }}>See more></Text>
          </Right>
        </Header>
        <Swiper style={styles.wrapper} autoplay
          dot={
            <View
              style={{
                display: 'none'
              }}
            />
          }
          activeDot={
            <View
              style={{
                display: 'none'
              }}
            />
          }
        >
          {newArr.map((arr, index) => {
            return (
              <Grid key={index}>
                {arr.map(item => {
                  return (
                    <Col key={item.id}>
                      <Card>
                        <CardItem cardBody>
                        <Image source={{ uri: api_url + item.image }} style={{ height: 100, flex: 1 }} />
                        </CardItem>
                        <CardItem>
                          <Left>
                            <Text>{item.product_name}</Text>
                          </Left>
                          <Body>
                            <Text note>KES {item.price}</Text>
                          </Body>
                          <Right>
                            <StarRating disabled={false} emptyStar={'ios-star-outline'} fullStar={'ios-star'} halfStar={'ios-star-half'} iconSet={'Ionicons'} maxStars={5} rating={item.rating} fullStarColor={'orange'} starSize={10} />
                          </Right>
                        </CardItem>
                      </Card>

                    </Col>
                  );
                })}
              </Grid>
            )
          })}
        </Swiper>



        <Header style={{ backgroundColor: '#e5e5e5', marginTop: -70 }}>
          <Left>
            <Text style={{ fontWeight: '700', fontSize: 16, justifyContent: 'center' }}>Featured</Text>
          </Left>
          <Right>
            <Text style={{ fontWeight: '700', fontSize: 16, justifyContent: 'center' }}>See more></Text>
          </Right>
        </Header>
        <Swiper style={styles.wrapper} autoplay
          dot={
            <View
              style={{
                display: 'none'
              }}
            />
          }
          activeDot={
            <View
              style={{
                display: 'none'
              }}
            />
          }
        >
          {FeaturedArr.map((arr, index) => {
            return (
              <Grid key={index}>
                {arr.map(item => {
                  return (
                    <Col key={item.id}>
                      <Card>
                        <CardItem cardBody>
                        <Image source={{ uri: api_url + item.image }} style={{ height: 100, flex: 1 }} />
                        </CardItem>
                        <CardItem>
                          <Left>
                            <Text>{item.product_name}</Text>
                          </Left>
                          <Body>
                            <Text note>KES {item.price}</Text>
                          </Body>
                          <Right>
                            <StarRating disabled={false} emptyStar={'ios-star-outline'} fullStar={'ios-star'} halfStar={'ios-star-half'} iconSet={'Ionicons'} maxStars={5} rating={item.rating} fullStarColor={'orange'} starSize={10} />
                          </Right>
                        </CardItem>
                      </Card>

                    </Col>
                  );
                })}
              </Grid>
            )
          })}
        </Swiper>
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

  wrapper: {
    height: 230
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})