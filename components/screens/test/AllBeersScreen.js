import React, { Component } from 'react';

// axios service
import axiosService from '../../../config/axiosService';
import { FlatList } from 'react-native';

export default class AllBeersScreen extends Component {
  state = {
    data: [],
    page: 1,
    loading: true,
    error: null
  };

  componentDidMount() {
    this._fetchAllBeers();
  }

  _fetchAllBeers = () => {
    const { page } = this.state;
    const URL = `/beers?page=${page}&per_page=10`;

    axiosService
      .request({
        url: URL,
        method: 'GET'
      })
      .then(response => {
          console.log(response);
          
        this.setState((prevState, nextProps) => ({
          data:
            page === 1
              ? Array.from(response.data)
              : [...this.state.data, ...response.data],
          loading: false
        }));
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

 render() {
    return (
        <FlatList
         contentContainerStyle={{
           flex: 1,
           flexDirection: 'column',
           height: '100%',
           width: '100%'
         }}
         data={this.state.data}
         keyExtractor={item => item.id.toString()}
         renderItem={({ item }) => (
           <View
             style={{
               marginTop: 25,
               width: '50%'
             }}
           >
             <BeerPreviewCard name={item.name} imageUrl={item.image_url} />
           </View>
         )}
       />
   );
}