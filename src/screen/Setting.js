import React from 'react';
import {Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';

import {styles} from '../Style/GlobalStyle/styles';
import backButton from '../assets/icon/go-back-left-arrow.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
      token: '',
    };
  }

  componentDidMount() {
    this.getToken;
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

  render() {
    return (
      <ScrollView>
        <View style={styles.headerLogin}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Homepage')}>
            <Image source={backButton} style={styles.backButton} />
          </TouchableOpacity>
          <Text style={styles.fontLogin}>Setting</Text>
        </View>
      </ScrollView>
    );
  }
}

export default Register;
