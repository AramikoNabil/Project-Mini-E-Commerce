import React from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  ToastAndroid,
} from 'react-native';
import {styles} from '../Style/GlobalStyle/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-picker';
import {Picker} from '@react-native-community/picker';

class Shop extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      isError: false,
      addLoading: false,
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

  logOut() {
    this.props.navigation.navigate('Login', {screen: 'Login'});
  }

  signOut = () => {
    AsyncStorage.clear();
    this.props.navigation.navigate('Homepage');
  };

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
      };
      fetch('https://mini-project-c.herokuapp.com/api/product', {
        method: 'POST',
        body: this.createFormData(gambar, Product),
        headers: {
          // 'Content-Type': 'multipart/from-data',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response) console.log('upload succes', response);
          ToastAndroid.show(
            'Berhasil Tambah Produk',
            ToastAndroid.LONG,
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
        })
        .catch((error) => {
          console.log('upload error', error);
          ToastAndroid.show(
            'Coba Lagi',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
          this.setState({isLoading: false, addLoading: false});
        });
    } else {
      ToastAndroid.show(
        'Coba Lagi',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
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

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.isLoading}>
          <ActivityIndicator size="large" color="red" />
        </View>
      );
    }

    return (
      <ScrollView style={styles.fill}>
        <View style={styles.headerProfile}>
          <TouchableOpacity
            style={styles.containerOpenDrawer}
            onPress={() => this.props.navigation.openDrawer()}>
            <Image
              style={styles.buttonOpenDrawer}
              source={require('../assets/icon/menu.png')}
            />
          </TouchableOpacity>
          <Text style={styles.fontHeaderProfile}>Tambah Produk</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.containeraddImage}>
            <TouchableWithoutFeedback onPress={() => this.handleChoosePhoto()}>
              {this.state.gambar !== '' ? (
                <Image
                  resizeMode="cover"
                  source={{uri: this.state.gambar.uri}}
                  style={styles.ImageAddImage}
                />
              ) : (
                <Image
                  source={require('../assets/icon/addImage.png')}
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
                  Tambah
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Shop;
