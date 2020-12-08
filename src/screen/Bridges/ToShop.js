import React, {Component} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../../Style/GlobalStyle/styles';

export default class index extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
    };
  }

  componentDidMount() {
    this.getToken();
  }

  getToken() {
    AsyncStorage.getItem('token').then((token) => {
      if (token !== null) {
        console.log('TOKEN ', token);
        this.setState({token: token});
        this.props.navigation.navigate('Shop', {screen: 'Shop'});
      } else {
        this.props.navigation.navigate('Login', {screen: 'Login'});
      }
    });
  }
  catch(error) {
    this.setState({isLoading: false, isError: true});
  }

  render() {
    return <View style={styles.fill} />;
  }
}
