import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
  RefreshControl,
} from 'react-native';

import {styles} from '../Style/GlobalStyle/styles';
// import Categories from '../screen/data/category';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

export default class Confirm2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      status: [],
      token: '',
      isLoading: true,
      isError: false,
      refreshing: false,
    };
  }

  // Mount User Method
  componentDidMount() {
    this.getToken();
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.getOrder();
    this.getStatus().then(() => {
      this.setState({refreshing: false});
    });
  };

  getToken() {
    AsyncStorage.getItem('token').then((token) => {
      // console.log('TOKEN ==== ', token);
      if (token !== null) {
        this.setState({token: token});
        this._onRefresh();
      }
    });

    //setelah token muncul maka ambil data
  }

  //   Get Api Users

  getOrder = async () => {
    this.setState({addLoading: true});
    try {
      const response = await Axios.get(
        'https://mini-project-c.herokuapp.com/api/selesai',
        {
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          },
        },
      );

      if (response) {
        this.setState({
          isError: false,
          isLoading: false,
          addLoading: false,
          data: response.data.data,
        });
      }
    } catch (error) {
      this.setState({isLoading: false, isError: true});
    }
  };

  getStatus = async () => {
    this.setState({addLoading: true});
    try {
      const response = await Axios.get(
        'https://mini-project-c.herokuapp.com/api/status2',
        {
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          },
        },
      );

      if (response) {
        this.setState({
          isError: false,
          isLoading: false,
          addLoading: false,
          status: response.data,
        });
      }
    } catch (error) {
      this.setState({isLoading: false, isError: true});
    }
  };

  render() {
    //  If load data
    if (this.state.isLoading) {
      return (
        <View style={styles.isLoading}>
          <ActivityIndicator size="large" color="red" />
        </View>
      );
    }

    return (
      <View style={styles.fill}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
          <View style={styles.container}>
            <View>
              <FlatList
                onScrollEndDrag={this._onRefresh}
                onEndReached={this._onRefresh}
                onEndReachedThreshold={0.5}
                data={this.state.data}
                keyExtractor={({id}, index) => index}
                renderItem={({item}) => (
                  <View>
                    <TouchableWithoutFeedback>
                      <View>
                        <View style={styles.Penjual}>
                          <Image
                            style={styles.icon}
                            source={require('../assets/icon/store.png')}
                          />
                          <Text style={styles.fontGreySize20White}>
                            Toko : {item.penjual}
                          </Text>
                        </View>
                        <View style={styles.containerOrder}>
                          <Image
                            source={{uri: `${item.gambar_barang}`}}
                            style={styles.ImageOrder}
                          />
                          <Text style={styles.textItemOrder}>
                            {item.nama_barang} {'\n'}
                            <Text style={styles.textItemOrder1}>
                              Jumlah Pesanan : {item.jumlah_pesanan} {'\n'}
                              <Text>
                                Harga : Rp {item.harga_barang} {'\n'}
                                <Text>
                                  Total Pesanan : Rp {item.total_harga}
                                  {' \n'}
                                </Text>
                              </Text>
                            </Text>
                          </Text>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                )}
              />
            </View>
            <View>
              <Text style={styles.fontSize16White}>
                Status Pemesanan :{'\n '}
                <Text style={styles.fontSize17White}>
                  {this.state.status.message}
                </Text>
              </Text>
            </View>
          </View>
          <View style={styles.scrollContainer}>
            <Text style={styles.fontContainerLoading}>
              {this.state.data === '' ? (
                <Text>empty</Text>
              ) : (
                <Text>Scroll when empty!</Text>
              )}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
