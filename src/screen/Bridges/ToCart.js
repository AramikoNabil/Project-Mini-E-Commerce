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

  // componentDidUpdate() {
  //   this.getToken();
  // }

  componentDidMount() {
    this.getToken();
  }

  getToken() {
    AsyncStorage.getItem('token').then((token) => {
      if (token !== null) {
        this.setState({token: token});
        this.props.navigation.navigate('Order', {screen: 'Order'});
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
