import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  ToastAndroid,
  BackHandler,
} from 'react-native';
import {styles} from '../../../Style/GlobalStyle/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      count: 1,
      token: '',
      isLoading: true,
      addLoading: false,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.getToken();
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.getDetail().then(() => {
      this.setState({refreshing: false});
    });
  };

  handleBackButtonClick = () => {
    this.props.navigation.navigate('Homepage', {screen: 'Homepage'});
    return true;
  };

  setAddLoading(isLoading) {
    this.setState({addLoading: isLoading});
  }

  getDetail = async () => {
    console.log(this.state.token);
    try {
      const response = await Axios.get(
        `https://mini-project-c.herokuapp.com/api/product/${this.props.route.params.item.id}`,
      );
      console.log(response.data.data);
      if (response) {
        this.setState({
          isError: false,
          isLoading: false,
          data: response.data.data,
        });
      }
    } catch (error) {
      this.setState({isLoading: false, isError: true});
    }
  };

  getToken() {
    AsyncStorage.getItem('token').then((token) => {
      if (token !== null) {
        console.log('TOKEN ', token);
        this.setState({token: token});
      }
    });

    //setelah token muncul maka ambil data
  }

  addTocart = (item) => {
    this.setState({addLoading: true});
    const {token, count} = this.state;

    if (count !== '') {
      const data = {
        jumlah_pesanan: count,
      };

      fetch(
        `https://mini-project-c.herokuapp.com/api/pesan/${this.props.route.params.item.id}`,
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
        .then((response) => response.json())
        .then((response) => {
          if (response) console.log('upload succes', response);
          this.setState({
            showModal: false,
            isLoading: false,
            addLoading: false,
            count: 1,
          });
          ToastAndroid.show(
            'Menambahkan ke My Order',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
          this.props.navigation.navigate('toCart');
        });
    }
  };

  countPlus = () => {
    this.setState({count: this.state.count + 1});
  };

  countMinus = () => {
    this.setState({count: this.state.count - 1});
  };

  _handleButtonPress = () => {
    this.setModalVisible(true);
  };

  setModalVisible = (visible) => {
    this.setState({showModal: visible});
  };

  render() {
    const {item} = this.props.route.params;
    const {count} = this.state;
    // const barang = this.props.route.params.item.stok;
    // console.log(barang);
    return (
      <ScrollView
        style={styles.fill}
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
        </View>
        <View style={styles.containerBodyDetails}>
          <Image source={{uri: `${item.gambar}`}} style={styles.Image} />
          <Text style={styles.detailItemName}>
            {item.nama} {'\n'}
            {'\n '}
            <Text style={styles.publisher}>Publisher: {item.publisher} </Text>
          </Text>
        </View>
        <View style={styles.containerBodyDetails}>
          <View style={styles.buttonPrice}>
            <Text style={styles.textButtonFree}>Free sample</Text>
            <View>
              <TouchableWithoutFeedback onPress={this._handleButtonPress}>
                <Text style={styles.textButtonPrice}>Beli Rp {item.harga}</Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>

        <View style={styles.containerBodyDetails}>
          <Text style={styles.fontTitle}>Deskrpsi </Text>
          <TouchableOpacity onPress={() => {}}>
            <Image
              source={require('../../../assets/icon/LeftArrow.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Text style={styles.textItemPrice}> {item.deskripsi}</Text>
        </View>
        <Modal
          transparent={true}
          visible={this.state.showModal}
          onRequestClose={() => this.setModalVisible(false)}
          animationType="slide">
          <TouchableOpacity
            activeOpacity={1}
            onPress={this.setModalVisible.bind(this, false)}
            style={styles.containerModal}
          />
          <View style={styles.popupModal}>
            <View style={styles.containerOption}>
              <Image source={{uri: `${item.gambar}`}} style={styles.imageBuy} />
              <Text style={styles.textDetailsModal}>Stok:{item.stok}</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.buttonDetailsModal}>
              <Text style={styles.fontGreySize18}>Jumlah</Text>
              <TouchableOpacity
                onPress={() =>
                  this.state.count > 1 ? this.countMinus() : {count}
                }
                style={styles.countMinus}>
                <Text style={styles.fontCount}>-</Text>
              </TouchableOpacity>

              <TextInput keyboardType="numeric" style={styles.count}>
                <Text style={styles.textCount}>{count}</Text>
              </TextInput>
              <TouchableOpacity
                onPress={() =>
                  this.state.count >= this.props.route.params.item.stok
                    ? ToastAndroid.show(
                        'Pembelian melebihi stok',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                      )
                    : this.countPlus()
                }
                style={styles.countPlus}>
                <Text style={styles.fontCount}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ContainerButtonKeranjang}>
              <View style={styles.buttonChat}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('toChatPerson', {
                      screen: 'toChatPerson',
                      item: item,
                    })
                  }>
                  <Image
                    source={require('../../../assets/icon/chat.png')}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.buttonKeranjang}>
                <TouchableWithoutFeedback onPress={() => this.addTocart()}>
                  {this.state.addLoading ? (
                    <ActivityIndicator
                      color="white"
                      style={styles.ActivityIndicator}
                    />
                  ) : (
                    <Text style={styles.textCount}>Masukkan Keranjang</Text>
                  )}
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}
