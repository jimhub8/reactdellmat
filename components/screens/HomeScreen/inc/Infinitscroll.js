import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, View, Image } from 'react-native';
import { Container, Content, Text, Grid, Col, Card, CardItem, Left, Body, Right, List } from 'native-base';
import axios from 'axios';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import StarRating from 'react-native-star-rating';
import Spinner from 'react-native-loading-spinner-overlay';


import CardDeck from './CardDeck';
import MyCarousel from './MyCarousel';

const api_url = 'http://2b151179.ngrok.io/'


const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    // alert('test')
    const paddingToBottom = 40;
    let result = layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    //true if the end is reached other wise false
    return result;
};

export default class Infinitscroll extends Component {
    constructor(props) {
        super(props);
        //initialize state values
        this.state = {
            spinner: false,
            pageNo: 1,
            pageSize: 20,
            showLoadingMore: false,
            data: [],
            loadMoreData: true,//to denote whether bottom of list is reached
            shouldHit: true, //whether more data needs to be fetched
            dataReceived: false, //whether initial data is fetched
        }
    }
    componentDidMount = () => {
        // window.addEventListener('scroll');

        this.fetchData();

    }

    apiScroll = ({ nativeEvent }) => {
        // alert('test')
        // const scrollTop = this.myRef.current.scrollTop
        // console.log(`myRef.scrollTop: ${scrollTop}`)
        // this.setState({
        //    scrollTop: scrollTop
        // })
        // console.log('nativeEvent')
        // console.log(nativeEvent)

        if (isCloseToBottom(nativeEvent)) {
            // console.log(isCloseToBottom);

            //prevent multiple hits for same page number
            if (this.state.loadMoreData) {
                //bottom reached start loading data
                this.setState({
                    loadMoreData: false
                })
                this.fetchData();
            }

        }
    }

    //function to fetch more data as per current page number
    fetchData = () => {
        // alert('test')
        if (this.state.pageNo != 1) {
            //when we try to fetch more data show loader at the bottom
            this.setState({
                showLoadingMore: true,
                spinner: true
            })
        }
        var url = api_url + 'api/scroll_products?page=' + this.state.pageNo;
        // console.log(this.state.pageNo);

        axios
            .get(url)
            .then(response => {
                // console.log('ededededed')

                if (response.data) {
                    //add data to list and change the state to render new content
                    // console.log(response.data.data);
                    let receivedDataList = response.data.data;
                    let currentDataList = this.state.data;
                    //append to existing list
                    let newDataList = currentDataList.concat(receivedDataList);
                    //render new list
                    // console.log(newDataList);

                    //once new list is set we are ready to load more data if bottom is reached
                    let loadMoreData = true;
                    this.setState({
                        pageNo: this.state.pageNo + 1,
                        data: newDataList,
                        spinner: false,
                        dataReceived: true,
                        loadMoreData: loadMoreData,
                        showLoadingMore: false
                    })
                } else {
                    //no more data to be loaded
                    this.setState({
                        shouldHit: false,
                        spinner: false,
                        showLoadingMore: false
                    })
                }
            })
            .catch(error => {
                console.log(error)
            });
    }

    chunk(array, chunkSize) {
        return [].concat.apply([],
            array.map(function (elem, i) {
                return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
            })
        );
    };

    render() {

        let dataForChunk = this.state.data
        let chunkedArr = this.chunk(dataForChunk, 2);

        //initially display loader at the center
        let listSection =
            <View style={styles.container} >
                <ActivityIndicator size="large" color="#0000ff" />
            </View>

        if (this.state.dataReceived) {
            if (this.state.data.length > 0) {
                listSection =
                    chunkedArr.map((arr, index) => {
                        return (
                            <Grid key={index}>
                                {arr.map(item => {
                                    return (
                                        <Col key={item.id}>
                                            <Card>
                                                <CardItem cardBody>
                                                    <Image source={{ uri: api_url + '/storage/products/qEJzbwb3WF4vJt4hvZX5ERiRqpu0QOGzj8vQW01z.jpeg' }} style={{ height: 100, flex: 1 }} />
                                                    {/* <Image source={{ uri: api_url + item.image }} style={{ height: 100, flex: 1 }} /> */}
                                                    {/* <Image source={'http://lorempixel.com/640/480'} style={{ height: 100, flex: 1 }} /> */}
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
                    })
            } else {
                listSection = null;
            }
        }

        if (this.state.dataReceived && this.state.data.length == 0) {
            return (
                <View style={styles.container}>
                    <Text>No records to display</Text>
                </View>
            )
        } else {
            return (
                <Container>
                    <Spinner
                        visible={this.state.spinner}
                        textContent={'Loading more data'}
                        textStyle={'red'}
                        overlayColor={'#000000b8'}
                        textStyle={styles.spinnerTextStyle}
                    />
                    <ScrollView style={{ flexWrap: 'nowrap' }} onScroll={this.apiScroll}>
                        <CardDeck featured={this.props.featured} />
                        <MyCarousel newproduct={this.props.newproduct} featured={this.props.featured} best_sellers={this.props.best_sellers} />
                        <ScrollView>
                            {listSection}
                            {this.state.showLoadingMore ? <ActivityIndicator size="large" color="#0000ff" /> : null}
                        </ScrollView>
                    </ScrollView>
                </Container>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
});