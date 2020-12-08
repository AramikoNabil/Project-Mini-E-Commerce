import React from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {styles} from '../Style/GlobalStyle/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
class Shop extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      isError: false,
      token: '',
      data: {},
      dataUser: {},
      refreshing: false,
    };
  }

  componentDidMount() {
    this.getToken();
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.getUser();
    this.getStoreProduct().then(() => {
      this.setState({refreshing: false});
    });
  };

  getToken() {
    AsyncStorage.getItem('token').then((token) => {
      if (token !== null) {
        console.log('TOKEN ', token);
        this.setState({token: token});
        this.getUser();
        this.getStoreProduct();
      }
    });

    //setelah token muncul maka ambil data
  }

  //   Get Api Users
  getStoreProduct = async () => {
    console.log(this.state.token);
    try {
      const response = await Axios.get(
        'https://mini-project-c.herokuapp.com/api/toko',
        {
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          },
        },
      );

      console.log(response.data);
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
          dataUser: response.data.user,
        });
      }
    } catch (error) {
      this.setState({isLoading: false, isError: true});
    }
  };
  deleteOrder = async (item) => {
    try {
      const response = await Axios.delete(
        `https://mini-project-c.herokuapp.com/api/product/${item.id}`,

        {
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          },
        },
      );
      console.log(response.data.message);
      this.setState({
        isError: false,
        isLoading: false,
      });
      this.getStoreProduct();
    } catch (error) {
      this.setState({isLoading: true});
    }
  };

  render() {
    console.log(this.state.data);
    if (this.state.isLoading) {
      return (
        <View style={styles.isLoading}>
          <ActivityIndicator size="large" color="red" />
        </View>
      );
    }

    // // If data finish load
    return (
      <View style={styles.fill}>
        <View style={styles.headerProfile}>
          <TouchableOpacity
            style={styles.containerOpenDrawer}
            onPress={() => this.props.navigation.openDrawer()}>
            <Image
              style={styles.buttonOpenDrawer}
              source={require('../assets/icon/menu.png')}
            />
          </TouchableOpacity>
          <Text style={styles.fontWhiteSize20}>My Store</Text>
        </View>

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
          <View style={styles.containerUsername}>
            <View>
              <Image
                source={{uri: `${this.state.dataUser.avatar}`}}
                style={styles.ImageUserOrder}
              />
            </View>
            <View style={styles.containerUsernameChild}>
              <Text style={styles.fontSize20White}>
                {this.state.dataUser.username}
              </Text>
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.containerTitle}>
              <TouchableWithoutFeedback
                onPress={() =>
                  this.props.navigation.navigate('ListOrder', {
                    screen: 'ListOrder',
                  })
                }>
                <Text style={styles.fontTitle}>List Order</Text>
              </TouchableWithoutFeedback>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('ListOrder', {
                    screen: 'ListOrder',
                  })
                }>
                <Image
                  source={require('../assets/icon/LeftArrow.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.containerTitle}>
              <TouchableWithoutFeedback
                onPress={() =>
                  this.props.navigation.navigate('HistoryShop', {
                    screen: 'HistoryShop',
                  })
                }>
                <Text style={styles.fontTitle}>History</Text>
              </TouchableWithoutFeedback>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('HistoryShop', {
                    screen: 'HistoryShop',
                  })
                }>
                <Image
                  source={require('../assets/icon/LeftArrow.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.containerTitle}>
              <TouchableWithoutFeedback>
                <Text style={styles.fontTitle}>My product</Text>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.containerBodyShop}>
              <FlatList
                numColumns={2}
                data={this.state.data}
                renderItem={({item}) => (
                  <View style={styles.viewList}>
                    <View style={styles.viewList1}>
                      <TouchableWithoutFeedback
                        onPress={() =>
                          this.props.navigation.navigate('DetailsSeller', {
                            item: item,
                          })
                        }>
                        <View>
                          <Image
                            source={{uri: `${item.gambar}`}}
                            style={styles.ImageShop}
                          />
                          <Text style={styles.textItemName}> {item.nama}</Text>
                          <Text style={styles.textItemPrice}>
                            {' '}
                            Stok :{item.stok}
                            <TouchableOpacity
                              onPress={() => this.deleteOrder(item)}>
                              <Image
                                source={require('../assets/icon/remove.png')}
                                style={styles.removeIconShop}
                              />
                            </TouchableOpacity>
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
                )}
                keyExtractor={({id}, index) => index}
              />
            </View>
          </View>
          <View style={styles.scrollContainer}>
            <Text style={styles.fontContainerLoading}>
              Scroll when updated!
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Shop;
