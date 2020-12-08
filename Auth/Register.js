import React from 'react';
import {
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';

import {styles} from '.././src/Style/GlobalStyle/styles';
import fb from '.././src/assets/icon/fb.png';
import google from '.././src/assets/icon/google.png';
import backButton from '../src/assets/icon/go-back-left-arrow.png';
import closeButton from '../src/assets/icon/close-button.png';
import mobil from '../src/assets/images/mobil.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      showModal: false,
      isLoading: true,
      addLoading: false,
    };
  }

  _handleButtonPress = () => {
    this.setModalVisible(true);
  };

  setModalVisible = (visible) => {
    this.setState({showModal: visible});
  };
  SignUp = () => {
    this.setState({addLoading: true});
    const {name, Username, email, password, password_confirmation} = this.state;
    var dataToSend = {
      name: name,
      username: Username,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
      // mobile: false,
    };
    //making data to send on server
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    //POST request
    fetch('https://mini-project-c.herokuapp.com/api/register', {
      method: 'POST', //Request Type
      body: formBody, //post body
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      //If response is in json then in success
      .then((responseJson) => {
        console.log(responseJson);
        const {token} = responseJson;
        if (token) {
          AsyncStorage.setItem('token', JSON.stringify(token));
          this.setState({addLoading: false});
          this.props.navigation.replace('Login');
        } else {
          this.setState({addLoading: false});
          ToastAndroid.show(
            'Pastikan Email dan Password BENAR!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        }
      })
      //If response is not in json then in error
      .catch((error) => {
        this.setState({addLoading: false});
        ToastAndroid.show(
          'Pastikan Email dan Password BENAR!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      });
  };
  render() {
    return (
      <ScrollView>
        <View style={styles.headerLogin}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}>
            <Image source={backButton} style={styles.backButton} />
          </TouchableOpacity>
          <Text style={styles.fontLogin}>Daftar</Text>
        </View>
        <View style={styles.container}>
          <View>
            <View style={styles.mobil}>
              <Image source={mobil} />
            </View>

            <View>
              <Text style={styles.fontAuth}>Name</Text>
            </View>
            <View>
              <TextInput
                keyboardType="name-phone-pad"
                underlineColorAndroid
                onChangeText={(name) => this.setState({name})}
              />
            </View>

            <View>
              <Text style={styles.fontAuth}>Username</Text>
            </View>
            <View>
              <TextInput
                keyboardType="name-phone-pad"
                underlineColorAndroid
                onChangeText={(Username) => this.setState({Username})}
              />
            </View>

            <View>
              <Text style={styles.fontAuth}>Email</Text>
            </View>
            <View>
              <TextInput
                keyboardType="email-address"
                underlineColorAndroid
                onChangeText={(email) => this.setState({email})}
              />
            </View>
            <View>
              <Text style={styles.fontAuth}>Password</Text>
            </View>
            <View>
              <TextInput
                underlineColorAndroid
                secureTextEntry={true}
                onChangeText={(password) => this.setState({password})}
              />
            </View>
            <View>
              <Text style={styles.fontAuth}>Re-Password</Text>
            </View>
            <View>
              <TextInput
                underlineColorAndroid
                secureTextEntry={true}
                onChangeText={(password_confirmation) =>
                  this.setState({password_confirmation})
                }
              />
            </View>
            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.SignUp()}>
                {this.addLoading ? (
                  <ActivityIndicator
                    color="white"
                    style={styles.ActivityIndicator}
                  />
                ) : (
                  <Text style={styles.buttonText} onPress={() => this.SignUp()}>
                    Masuk
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            <View>
              <Text style={styles.fontloginAnother}>
                ---------------------- atau masuk dengan ----------------------
              </Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.buttonSocial}
                onPress={this._handleButtonPress}>
                <Text
                  style={styles.buttonTextSocial}
                  onPress={this._handleButtonPress}>
                  Akun Media Sosial
                </Text>
              </TouchableOpacity>
            </View>

            <Modal
              transparent={true}
              visible={this.state.showModal}
              onRequestClose={() => this.setModalVisible(false)}
              animationType="slide">
              <View style={styles.containerModal}>
                <View style={styles.popupModal}>
                  <View style={styles.containerOption}>
                    <TouchableOpacity
                      onPress={this.setModalVisible.bind(this, false)}>
                      <Image source={closeButton} style={styles.icon} />
                    </TouchableOpacity>
                    <Text style={styles.fontLogin}>Pilih akun untuk masuk</Text>
                  </View>
                  <View style={styles.socialMedia}>
                    <TouchableOpacity
                      onPress={() => {}}
                      style={styles.buttonFacebook}>
                      <Image source={fb} style={styles.logo} />
                      <Text style={styles.textFacebook}>Facebook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {}}
                      style={styles.buttonGoogle}>
                      <Image source={google} style={styles.logo} />
                      <Text style={styles.fontGoogle}>Google</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Register;
