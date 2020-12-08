import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
  RefreshControl,
  ToastAndroid,
} from 'react-native';
import {styles} from '../../../Style/GlobalStyle/styles';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-community/picker';
import Axios from 'axios';

export default class index extends Component {
  constructor(props) {
    super();
    this.state = {
      isLoading: true,
      isError: false,
      addLoading: false,
      showModal: false,
      refreshing: false,
      token: '',
      nama: '',
      harga: '',
      stok: '',
      deskripsi: '',
      berat: '',
      gambar: '',
      halaman: '',
      publisher: '',
      kategori_id: '',
    };
  }

  componentDidMount() {
    this.getToken();
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.getDetail().then(() => {
      this.setState({refreshing: false});
    });
  };

  _handleButtonPress = () => {
    this.setModalVisible(true);
  };

  setModalVisible = (visible) => {
    this.setState({showModal: visible});
  };

  logOut() {
    this.props.navigation.navigate('Login', {screen: 'Login'});
  }

  setAddLoading(isLoading) {
    this.setState({addLoading: isLoading});
  }

  getToken() {
    AsyncStorage.getItem('token').then((token) => {
      if (token !== null) {
        console.log('TOKEN ', token);
        this.setState({token: token, isLoading: false});
      } else {
        this.logOut();
      }
    });

    //setelah token muncul maka ambil data
  }

  //   Get Api Users
  postItem() {
    const {
      token,
      nama,
      harga,
      stok,
      berat,
      gambar,
      halaman,
      publisher,
      deskripsi,
      kategori_id,
    } = this.state;
    this.setAddLoading(true);
    if (
      nama !== '' &&
      harga !== '' &&
      stok !== '' &&
      berat !== '' &&
      gambar !== '' &&
      halaman !== '' &&
      publisher !== '' &&
      kategori_id !== '' &&
      deskripsi !== ''
    ) {
      const Product = {
        nama: nama,
        harga: harga,
        stok: stok,
        berat: berat,
        gambar: gambar,
        halaman: halaman,
        publisher: publisher,
        deskripsi: deskripsi,
        kategori_id: kategori_id,
        _method: 'put',
      };
      fetch(
        `https://mini-project-c.herokuapp.com/api/product/${this.props.route.params.item.id}`,
        {
          method: 'POST',
          body: this.createFormData(gambar, Product),
          headers: {
            // 'Content-Type': 'multipart/from-data',
            Authorization: `Bearer ${token}`,
          },
        },
      )
        .then((response) => response.json())
        .then((response) => {
          if (response) console.log('upload succes', response);
          ToastAndroid.show(
            'Updated',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
          this.setState({
            isError: false,
            isLoading: false,
            addLoading: false,
            nama: '',
            harga: '',
            stok: '',
            deskripsi: '',
            berat: '',
            gambar: '',
            halaman: '',
            publisher: '',
            kategori_id: '',
          });
          this.props.navigation.navigate('toShop', {screen: 'toShop'});
        })
        .catch((error) => {
          console.log('upload error', error);
          ToastAndroid.show(
            'Gagal Update',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
          this.setState({isLoading: false, addLoading: false});
        });
    } else {
      ToastAndroid.show(
        'isi dengan benar',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      this.setState({addLoading: false});
    }
  }

  createFormData = (gambar, body) => {
    const data = new FormData();

    data.append('gambar', {
      name: gambar.fileName,
      type: gambar.type,
      uri:
        Platform.OS === 'android'
          ? gambar.uri
          : gambar.uri.replace('file://', ''),
    });

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    return data;
  };

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };

    try {
      ImagePicker.launchImageLibrary(options, (response) => {
        if (response.uri) {
          this.setState({gambar: response});
        }
        console.log(response);
      });
    } catch (e) {
      console.log(e);
    }
  };

  getDetail = async () => {
    console.log(this.state.token);
    try {
      const response = await Axios.get(
        `https://mini-project-c.herokuapp.com/api/product/${this.props.route.params.item.id}`,
        {
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          },
        },
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

  render() {
    const {item} = this.props.route.params;

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
          <Text style={styles.fontWhiteSize20}>My Store</Text>
        </View>
        <View style={styles.containerBodyDetails}>
          <Image source={{uri: `${item.gambar}`}} style={styles.Image} />
          <Text style={styles.detailItemName}>
            {item.nama} {'\n'} <Text style={styles.fontTitle}>Stok </Text>
            <Text style={styles.textItemPrice}>
              {item.stok} {'\n'}
              {''} {''} <Text style={styles.fontTitle}>Terjual </Text>
              <Text style={styles.textItemPrice}> {item.terjual}</Text>
            </Text>
          </Text>
        </View>
        <View style={styles.containerBodyDetailSeller}>
          <Text style={styles.fontTitle}>Publisher </Text>
          <Text style={styles.textItemPrice}> {item.publisher}</Text>
        </View>
        <View style={styles.containerBodyDetailSeller}>
          <Text style={styles.fontTitle}>Halaman </Text>
          <Text style={styles.textItemPrice}> {item.halaman}</Text>
        </View>
        <View style={styles.containerBodyDetailSeller}>
          <Text style={styles.fontTitle}>Berat </Text>
          <Text style={styles.textItemPrice}> {item.berat} gr</Text>
        </View>

        <View style={styles.containerBodyDetails}>
          <Text style={styles.fontTitle}>Deskrpsi </Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.textItemPrice}> {item.deskripsi}</Text>
        </View>
        <View style={styles.containerButtonEditProduk}>
          <TouchableOpacity onPress={this._handleButtonPress}>
            <Text
              style={styles.textButtonEdit}
              onPress={this._handleButtonPress}>
              --- Edit Produk ---
            </Text>
          </TouchableOpacity>
        </View>
        <Modal
          transparent={true}
          visible={this.state.showModal}
          onRequestClose={() => this.setModalVisible(false)}
          animationType="fade">
          <TouchableOpacity
            activeOpacity={1}
            onPress={this.setModalVisible.bind(this, false)}
            style={styles.containerModalEdit}
          />

          <ScrollView style={styles.fillModal}>
            <View style={styles.headerProfile}>
              <TouchableOpacity
                style={styles.containerOpenDrawer}
                onPress={this.setModalVisible.bind(this, false)}>
                <Image
                  style={styles.iconBack}
                  source={require('../../../assets/icon/go-back-left-arrow.png')}
                />
              </TouchableOpacity>
              <Text style={styles.fontHeaderProfile}>Tambah Produk</Text>
            </View>
            <View style={styles.container}>
              <View style={styles.containeraddImage}>
                <TouchableWithoutFeedback
                  onPress={() => this.handleChoosePhoto()}>
                  {this.state.gambar !== '' ? (
                    <Image
                      resizeMode="cover"
                      source={{uri: this.state.gambar.uri}}
                      style={styles.ImageAddImage}
                    />
                  ) : (
                    <Image
                      source={require('../../../assets/icon/addImage.png')}
                      style={styles.ImageAddImage}
                    />
                  )}
                </TouchableWithoutFeedback>
              </View>
              <View>
                <Text style={styles.fontGreySize18White}>Nama Produk</Text>
                <TextInput
                  style={styles.inputProduct}
                  placeholder={'Nama Produk* '}
                  maxLength={40}
                  keyboardType="default"
                  returnKeyType="done"
                  multiline={true}
                  autoCapitalize="sentences"
                  value={this.state.nama}
                  onChangeText={(nama) => this.setState({nama: nama})}
                />
                <Text style={styles.fontGreySize18White}>Publisher</Text>

                <TextInput
                  style={styles.inputProduct}
                  placeholder={'Publisher* '}
                  maxLength={40}
                  keyboardType="default"
                  returnKeyType="done"
                  multiline={true}
                  autoCapitalize="sentences"
                  value={this.state.publisher}
                  onChangeText={(publisher) =>
                    this.setState({publisher: publisher})
                  }
                />
                <Text style={styles.fontGreySize18White}>Jumlah Halaman</Text>

                <TextInput
                  style={styles.inputProduct}
                  placeholder={'Jumlah Halaman* '}
                  maxLength={15}
                  keyboardType="numeric"
                  returnKeyType="done"
                  multiline={true}
                  autoCapitalize="sentences"
                  value={this.state.halaman}
                  onChangeText={(halaman) => this.setState({halaman: halaman})}
                />
                <Text style={styles.fontGreySize18White}>Harga</Text>

                <TextInput
                  style={styles.inputProduct}
                  placeholder={'Harga *(Rp) '}
                  maxLength={15}
                  keyboardType="numeric"
                  returnKeyType="done"
                  multiline={true}
                  autoCapitalize="sentences"
                  value={this.state.harga}
                  onChangeText={(harga) => this.setState({harga: harga})}
                />
                <Text style={styles.fontGreySize18White}>Kategori</Text>

                <Picker
                  style={styles.textFacebook}
                  selectedValue={this.state.kategori_id}
                  onValueChange={(itemValue) =>
                    this.setState({kategori_id: itemValue})
                  }>
                  <Picker.Item label="Novel" value={1} />
                  <Picker.Item label="Komik" value={2} />
                  <Picker.Item label="Pendidikan" value={3} />
                  <Picker.Item label="Agama" value={4} />
                </Picker>

                <View style={styles.flexDirection}>
                  <TextInput
                    style={styles.inputProduct}
                    placeholder={'Stok (pcs)* '}
                    maxLength={40}
                    keyboardType="numeric"
                    returnKeyType="done"
                    multiline={true}
                    autoCapitalize="sentences"
                    value={this.state.stok}
                    onChangeText={(stok) => this.setState({stok: stok})}
                  />
                  <TextInput
                    style={styles.inputProduct}
                    placeholder={'Berat (gr)*'}
                    maxLength={15}
                    keyboardType="numeric"
                    returnKeyType="done"
                    multiline={true}
                    autoCapitalize="sentences"
                    value={this.state.berat}
                    onChangeText={(berat) => this.setState({berat: berat})}
                  />
                </View>
                <Text style={styles.fontGreySize18White}>Deskripsi</Text>
                <TextInput
                  style={styles.inputProduct}
                  placeholder={'Deskripsi*'}
                  // maxLength={15}
                  keyboardType="default"
                  returnKeyType="done"
                  multiline={true}
                  autoCapitalize="sentences"
                  value={this.state.deskripsi}
                  onChangeText={(deskripsi) =>
                    this.setState({deskripsi: deskripsi})
                  }
                />
              </View>

              <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.postItem()}>
                  {this.state.addLoading ? (
                    <ActivityIndicator
                      color="white"
                      style={styles.ActivityIndicator}
                    />
                  ) : (
                    <Text
                      style={styles.fontAddProduct}
                      onPress={() => this.postItem()}>
                      Update
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </ScrollView>
    );
  }
}
