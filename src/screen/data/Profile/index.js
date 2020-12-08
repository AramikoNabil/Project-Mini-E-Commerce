import React from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Platform,
  TextInput,
  Modal,
  ScrollView,
  RefreshControl,
  ToastAndroid,
} from 'react-native';
import {styles} from '../../../Style/GlobalStyle/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-picker';
import Axios from 'axios';

class index extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      isError: false,
      addLoading: false,
      token: '',
      name: '',
      avatar: '',
      alamat: '',
      no_hp: '',
      editName: '',
      editAvatar: '',
      editAlamat: '',
      editNo_hp: '',
      showModal: false,
      data: {},
    };
  }

  initialData = (data) => {
    this.setState({
      avatar: data.avatar,
      name: data.name,
      alamat: data.alamat,
      no_hp: data.no_hp,
      editName: data.name,
      // editAvatar: data.avatar,
      editAlamat: data.alamat,
      editNo_hp: data.no_hp,
    });
  };

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.getUser().then(() => {
      this.setState({refreshing: false});
    });
  };

  componentDidMount() {
    this.getToken();
  }

  signOut = () => {
    AsyncStorage.clear();
    this.props.navigation.replace('Homepage', {screen: 'Homepage'});
  };

  _handleButtonPress = () => {
    this.setModalVisible(true);
  };

  setModalVisible = (visible) => {
    this.setState({showModal: visible});
  };

  setAddLoading(isLoading) {
    this.setState({addLoading: isLoading});
  }

  getToken() {
    AsyncStorage.getItem('token')
      .then((token) => {
        if (token !== null) {
          console.log('TOKEN ', token);
          this.setState({token: token});
          this.getUser();
        }
      })
      .catch(() => this.getUser());

    //setelah token muncul maka ambil data
  }

  //   Get Api Users
  getUser = async () => {
    console.log(this.state.token);
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
          data: response.data.user,
        });
        this.initialData(response.data.user);
        this.setModalVisible(false);
      }
    } catch (error) {
      this.setState({isLoading: false, isError: true});
    }
  };

  postUpdate() {
    const {editName, editAvatar, editAlamat, editNo_hp} = this.state;
    this.setAddLoading(true);
    if (editName !== '') {
      const updateUser = {
        _method: 'patch',
        name: editName,
        alamat: editAlamat,
        no_hp: editNo_hp,
      };

      console.log('updateUser', updateUser);
      fetch('https://mini-project-c.herokuapp.com/api/user', {
        method: 'POST',
        body: this.createFormData(editAvatar, updateUser),
        headers: {
          Accept: 'application/json',
          // 'Content-Type': 'multipart/from-data',
          Authorization: `Bearer ${this.state.token}`,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response) console.log('upload succes', response);

          this.getUser();
          this.setModalVisible(false);
          this.setAddLoading(false);
        })
        .catch((error) => {
          console.log('upload error', error);

          this.setState({isLoading: false, addLoading: false});
          ToastAndroid.show(
            'please fulfill image again',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
          );
        });
    }
  }

  createFormData = (image, body) => {
    const data = new FormData();

    data.append('avatar', {
      name: image.fileName,
      type: image.type,
      uri:
        Platform.OS === 'android'
          ? image.uri
          : image.uri.replace('file://', ''),
    });

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    return data;
  };

  handleEditPhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        this.setState({editAvatar: response});
        console.log(JSON.stringify(response) + ' image');
      }
    });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.isLoading}>
          <ActivityIndicator size="large" color="red" />
        </View>
      );
    }

    // If data finish load
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
          <Text style={styles.fontHeaderProfile}>Akun Saya</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.containerBodyDetails}>
            <Image
              source={{uri: `${this.state.data.avatar}`}}
              style={styles.Image}
            />
          </View>
          <View>
            <Text style={styles.fontGreySize20White}>
              Nama : {this.state.data.name}
            </Text>
            <Text style={styles.fontGreySize18White}>
              Username : {this.state.data.username}
            </Text>
            <Text style={styles.textItemName}>
              Email : {this.state.data.email}
            </Text>
            <Text style={styles.textItemName}>
              Hp : {this.state.data.no_hp}
            </Text>
            <Text style={styles.textItemName}>
              Alamat : {this.state.data.alamat}
            </Text>
          </View>
          <View style={styles.containerButtonEdit}>
            <TouchableOpacity onPress={this._handleButtonPress}>
              <Text
                style={styles.textButtonEdit}
                onPress={this._handleButtonPress}>
                Edit Profil
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.buttonSignOut}
              onPress={() => this.signOut()}>
              <Text style={styles.fontSignOut} onPress={() => this.signOut()}>
                Keluar
              </Text>
            </TouchableOpacity>
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
                <View style={styles.container}>
                  <View style={styles.containeraddImage}>
                    <TouchableWithoutFeedback
                      onPress={() => this.handleEditPhoto()}>
                      {this.state.editAvatar === '' ? (
                        <Image
                          source={{uri: `${this.state.data.avatar}`}}
                          resizeMode="cover"
                          style={styles.Image}
                        />
                      ) : (
                        <Image
                          source={{uri: this.state.editAvatar.uri}}
                          resizeMode="cover"
                          style={styles.Image}
                        />
                      )}
                    </TouchableWithoutFeedback>
                  </View>
                  <View>
                    <Text style={styles.fontAuth}>Name</Text>
                  </View>
                  <View>
                    <TextInput
                      keyboardType="name-phone-pad"
                      underlineColorAndroid
                      value={this.state.editName}
                      onChangeText={(name) => this.setState({editName: name})}
                    />
                  </View>

                  <View>
                    <Text style={styles.fontAuth}>Alamat</Text>
                  </View>
                  <View>
                    <TextInput
                      keyboardType="name-phone-pad"
                      underlineColorAndroid
                      value={this.state.editAlamat}
                      onChangeText={(alamat) =>
                        this.setState({editAlamat: alamat})
                      }
                    />
                  </View>

                  <View>
                    <Text style={styles.fontAuth}>Hp</Text>
                  </View>
                  <View>
                    <TextInput
                      keyboardType="phone-pad"
                      underlineColorAndroid
                      value={this.state.editNo_hp}
                      onChangeText={(no_hp) =>
                        this.setState({editNo_hp: no_hp})
                      }
                    />
                  </View>

                  <View>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.postUpdate()}>
                      {this.state.addLoading ? (
                        <ActivityIndicator
                          color="white"
                          style={styles.ActivityIndicator}
                        />
                      ) : (
                        <Text
                          style={styles.buttonText}
                          onPress={() => this.postUpdate()}>
                          Save
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    );
  }
}

export default index;
