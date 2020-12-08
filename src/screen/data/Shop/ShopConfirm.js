import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {styles} from '../../../Style/GlobalStyle/styles';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Axios from 'axios';

export default class index extends Component {
  constructor(props) {
    super();
    this.state = {
      data: [],
      token: '',
      isLoading: true,
      isError: false,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.getToken();
  }

  setAddLoading(isLoading) {
    this.setState({addLoading: isLoading});
  }

  getToken() {
    AsyncStorage.getItem('token').then((token) => {
      if (token !== null) {
        this.setState({token: token, isLoading: false});
      }
    });

    //setelah token muncul maka ambil data
  }

  getConfirm = async () => {
    console.log(this.state.token);
    try {
      const response = await Axios.get(
        'https://mini-project-c.herokuapp.com/api/toko_konfirmasi',
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
        this.props.navigation.navigate('HistoryShop', {
          screen: 'HistoryShop',
        });
      }
    } catch (error) {
      this.setState({isLoading: false, isError: true});
    }
  };

  render() {
    const {item} = this.props.route.params;

    return (
      <View style={styles.fill}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
          <View style={styles.headerProfile}>
            <TouchableOpacity
              style={styles.containerOpenDrawer}
              onPress={() => this.props.navigation.openDrawer()}>
              <Image
                style={styles.buttonOpenDrawer}
                source={require('../../../assets/icon/menu.png')}
              />
            </TouchableOpacity>
            <Text style={styles.fontWhiteSize20}>My Store</Text>
          </View>
          <View style={styles.containerBodyDetails}>
            <Image
              source={{uri: `${item.gambar_barang}`}}
              style={styles.Image}
            />
            <Text style={styles.detailItemName}>
              {item.nama_barang} {'\n'}{' '}
              <Text style={styles.fontSize17White}>Jumlah Pesanan: </Text>
              <Text style={styles.fontGreySize18White}>
                {item.jumlah_pesanan}
              </Text>
            </Text>
          </View>
          <View style={styles.containerBodyDetailSeller}>
            <Text style={styles.fontSize17White}>Pembeli an. : </Text>
            <Text style={styles.fontGreySize18White}> {item.pembeli}</Text>
          </View>
          <View style={styles.containerBodyDetailSeller}>
            <Text style={styles.fontSize17White}>Total harga pesanan: </Text>
            <Text style={styles.fontGreySize18White}> {item.total_harga}</Text>
          </View>
          <View style={styles.containerBodyDetailSeller}>
            <Text style={styles.fontSize17White}>Berat :</Text>
            <Text style={styles.fontGreySize18White}>
              {' '}
              {item.total_berat} gr
            </Text>
          </View>
        </ScrollView>
        <View>
          <TouchableOpacity
            style={styles.buttonConfirm}
            onPress={() => this.getConfirm()}>
            <Text style={styles.fontConfirm}>Konfirmasi Pesanan</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
