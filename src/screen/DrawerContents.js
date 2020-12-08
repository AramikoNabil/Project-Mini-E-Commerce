import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import {styles} from '../Style/GlobalStyle/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

class DrawerContent extends React.Component {
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
      }
    });
  }

  render() {
    const showToast = () => {
      ToastAndroid.show('Under Developement', ToastAndroid.SHORT);
    };

    return (
      <ScrollView>
        {this.state.token === '' ? (
          <>
            <View style={styles.headerDrawer}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('Login', {screen: 'Login'})
                }>
                <Text style={styles.fontHeaderDrawer}>Hello. Sign In</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.headerDrawer}>
            <Text style={styles.fontHeaderDrawer2}>
              Welcome to {''}
              <Text style={styles.titleDrawer}>
                Borneo <Text>BookStore</Text>
              </Text>
            </Text>
          </View>
        )}

        <View style={styles.containerDrawer}>
          <View>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Homepage', {screen: 'Homepage'})
              }>
              <Text
                style={styles.fontGreySize18Black}
                onPress={() =>
                  this.props.navigation.navigate('Homepage', {
                    screen: 'Homepage',
                  })
                }>
                Home
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('toCart', {screen: 'toCart'})
              }>
              <Text
                style={styles.fontGreySize18Black}
                onPress={() =>
                  this.props.navigation.navigate('toCart', {screen: 'toCart'})
                }>
                Wishlist
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('toConfirm', {
                  screen: 'toConfirm',
                })
              }>
              <Text
                style={styles.fontGreySize18Black}
                onPress={() =>
                  this.props.navigation.navigate('toConfirm', {
                    screen: 'toConfirm',
                  })
                }>
                Your Order
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('toShopPost', {
                  screen: 'toShopPost',
                })
              }>
              <Text
                style={styles.fontGreySize18Black}
                onPress={() =>
                  this.props.navigation.navigate('toShopPost', {
                    screen: 'toShopPost',
                  })
                }>
                Sell Product
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('toShop', {screen: 'toShop'})
              }>
              <Text
                style={styles.fontGreySize18Black}
                onPress={() =>
                  this.props.navigation.navigate('toShop', {screen: 'toShop'})
                }>
                My Store
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Profile', {
                  screen: 'Profile',
                })
              }>
              <Text
                style={styles.fontGreySize18Black}
                onPress={() =>
                  this.props.navigation.navigate('toProfile', {
                    screen: 'toProfile',
                  })
                }>
                Your Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.underLine} />
        <View style={styles.containerDrawer}>
          <View>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Setting', {
                  screen: 'Setting',
                })
              }>
              <Text
                style={styles.fontGreySize18Black}
                onPress={() =>
                  this.props.navigation.navigate('Setting', {
                    screen: 'Setting',
                  })
                }>
                Setting
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => showToast()}>
              <Text
                style={styles.fontGreySize18Black}
                onPress={() => showToast()}>
                Customer Service
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default DrawerContent;
