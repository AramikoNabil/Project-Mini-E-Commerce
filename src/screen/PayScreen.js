import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
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

export default class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      harga: {},
      data: [],
      dataConfirm: {},
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
    this.getUser();
    this.getOrder();
    this.getTotal().then(() => {
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
        'https://mini-project-c.herokuapp.com/api/pesan2',
        {
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          },
        },
      );
      // console.log(response.data.data);
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

  getConfirm = async () => {
    console.log(this.state.token);
    try {
      const response = await Axios.get(
        'https://mini-project-c.herokuapp.com/api/konfirmasi',
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
          dataConfirm: response.data.data,
        });
        this.props.navigation.navigate('ConfirmScreen', {
          screen: 'ConfirmScreen',
        });
      }
    } catch (error) {
      this.setState({isLoading: false, isError: true});
    }
  };

  getUser = async () => {
    try {
      const response = await Axios.get(
        'https://mini-project-c.herokuapp.com/api/user',
        {
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          },
        },
      );
      console.log(response.data.user);
      if (response) {
        this.setState({
          isError: false,
          isLoading: false,
          user: response.data.user,
        });
      }
    } catch (error) {
      this.setState({isLoading: false});
    }
  };

  getTotal = async () => {
    try {
      const response = await Axios.get(
        'https://mini-project-c.herokuapp.com/api/harga',
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
          harga: response.data,
        });
      }
    } catch (error) {
      this.setState({isLoading: false});
    }
  };

  deleteOrder = async (item) => {
    try {
      const response = await Axios.delete(
        `https://mini-project-c.herokuapp.com/api/pesan/${item.id}`,
        {
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          },
        },
      );
      console.log(response.data.message);
      if (response) {
        this.setState({
          isError: false,
          isLoading: true,
          data: [],
        });
        this.getOrder();
      }
    } catch (error) {
      this.setState({isLoading: true});
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
    console.log(this.state);
    return (
      <View style={styles.fill}>
        <View style={styles.headerProfile}>
          <TouchableOpacity
            style={styles.containerOpenDrawer}
            onPress={() => this.props.navigation.navigate('Details')}>
            <Image
              style={styles.iconBack2}
              source={require('../assets/icon/go-back-left-arrow.png')}
            />
          </TouchableOpacity>
          <Text style={styles.fontWhiteSize20}> My Order</Text>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          ref={(ref) => {
            this.scrollView = ref;
          }}
          onContentSizeChange={() =>
            this.scrollView.scrollToEnd({animated: false})
          }>
          <View style={styles.container}>
            <View>
              <View style={styles.containerjustflexdirection}>
                <Image
                  source={require('../assets/icon/pinLocation.png')}
                  style={styles.iconPin}
                />
                <Text style={styles.fontGreySize18White}>
                  Alamat Pengiriman{' '}
                </Text>
              </View>
              <Text style={styles.fontGreySize18White}>
                {'     '}
                {this.state.user.name} ||{' '}
                <Text style={styles.textItemName}>
                  {' '}
                  {this.state.user.no_hp}
                </Text>
              </Text>

              <Text style={styles.textItemName}>
                {' '}
                {'     '}
                {this.state.user.alamat}
              </Text>
            </View>
            <View>
              <FlatList
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
                                  Total : Rp {item.total_harga} {'\n'}{' '}
                                  <TouchableOpacity
                                    onPress={() => this.deleteOrder(item)}>
                                    <Image
                                      source={require('../assets/icon/remove.png')}
                                      style={styles.removeIcon}
                                    />
                                  </TouchableOpacity>
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
        <View style={styles.containerbuttonConfirm}>
          <View style={styles.buttonConfirm2}>
            <Text style={styles.fontSize17White}>
              Total Pembayaran {'\n'}
              <Text style={styles.fontSize17blue}>
                {'               '}

                {this.state.harga.data}
              </Text>
            </Text>
          </View>
          <TouchableOpacity
            style={styles.buttonConfirm1}
            onPress={() => this.getConfirm()}>
            <Text style={styles.fontConfirm}>Buat Pesanan</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
