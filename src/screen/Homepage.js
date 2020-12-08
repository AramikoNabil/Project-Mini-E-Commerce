import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  RefreshControl,
  LogBox,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import Carousel from '../screen/Swiper';
import {styles} from '../Style/GlobalStyle/styles';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import Axios from 'axios';

let backPressed = 0;
export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataComic: [],
      isLoading: true,
      isError: false,
      refreshing: false,
      backPressed: 1,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  // Mount User Method
  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    this.getProductComic();
    this.getProduct();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.getProductComic();
    this.getProduct().then(() => {
      this.setState({refreshing: false});
    });
  };

  handleBackButtonClick = () => {
    if (backPressed > 0) {
      BackHandler.exitApp();
      backPressed = 0;
    } else {
      backPressed++;
      ToastAndroid.show('Press Again To Exit', ToastAndroid.SHORT);
      setTimeout(() => {
        backPressed = 0;
      }, 2000);
    }
    return true;
  };

  //   Get Api Users
  getProduct = async () => {
    try {
      const response = await Axios.get(
        'https://mini-project-c.herokuapp.com/api/product',
      );

      this.setState({
        isError: false,
        isLoading: false,
        data: response.data.data,
      });
    } catch (error) {
      this.setState({isLoading: false, isError: true});
    }
  };

  getProductComic = async () => {
    try {
      const response = await Axios.get(
        'https://mini-project-c.herokuapp.com/api/kategori/2',
      );
      console.log(response.data.data);
      this.setState({
        isError: false,
        isLoading: false,
        dataComic: response.data.data,
      });
    } catch (error) {
      this.setState({isLoading: false, isError: true});
    }
  };

  render() {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs(); //Ignore all log notifications
    return (
      <ScrollView
        style={styles.fill}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }>
        <View style={styles.containerHeader}>
          <TouchableOpacity
            style={styles.containerOpenDrawer}
            onPress={() => this.props.navigation.openDrawer()}>
            <Image
              style={styles.buttonOpenDrawer}
              source={require('../assets/icon/menu.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SearchBar')}>
            <Image
              source={require('../assets/icon/magnifier.png')}
              style={styles.iconSearch1}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.containerOpenDrawer}
            onPress={() =>
              this.props.navigation.navigate('toChat', {screen: 'toChat'})
            }>
            <Image
              source={require('../assets/icon/chat.png')}
              style={styles.buttonOpenDrawer}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.containerSwiper}>
          <Carousel />
        </View>

        <View style={styles.container}>
          <View style={styles.containerIcon3}>
            <View style={styles.containerIcon2}>
              <TouchableWithoutFeedback
                onPress={() => this.props.navigation.navigate('Novel')}>
                <View style={styles.containerIcon1}>
                  <View style={styles.containerIcon}>
                    <Image
                      source={require('../assets/icon/iconA.png')}
                      style={styles.iconCategory}
                    />
                  </View>
                  <Text style={styles.fontSize15White}>Novel</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => this.props.navigation.navigate('Comic')}>
                <View style={styles.containerIcon1}>
                  <View style={styles.containerIcon}>
                    <Image
                      source={require('../assets/icon/iconB.png')}
                      style={styles.iconCategory}
                    />
                  </View>
                  <Text style={styles.fontSize15White}>Comic</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => this.props.navigation.navigate('Fantasy')}>
                <View style={styles.containerIcon1}>
                  <View style={styles.containerIcon}>
                    <Image
                      source={require('../assets/icon/iconC.png')}
                      style={styles.iconCategory}
                    />
                  </View>
                  <Text style={styles.fontSize15White}>Fantasy</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => this.props.navigation.navigate('Horror')}>
                <View style={styles.containerIcon1}>
                  <View style={styles.containerIcon}>
                    <Image
                      source={require('../assets/icon/iconD.png')}
                      style={styles.iconCategory}
                    />
                  </View>
                  <Text style={styles.fontSize15White}>Horror</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.containerIcon2}>
              <TouchableWithoutFeedback
                onPress={() => this.props.navigation.navigate('Comedy')}>
                <View style={styles.containerIcon1}>
                  <View style={styles.containerIcon}>
                    <Image
                      source={require('../assets/icon/iconE.png')}
                      style={styles.iconCategory}
                    />
                  </View>
                  <Text style={styles.fontSize15White}>Comedy</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => this.props.navigation.navigate('Science')}>
                <View style={styles.containerIcon1}>
                  <View style={styles.containerIcon}>
                    <Image
                      source={require('../assets/icon/iconF.png')}
                      style={styles.iconCategory}
                    />
                  </View>
                  <Text style={styles.fontSize15White}>Science Fiction</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => this.props.navigation.navigate('Documentary')}>
                <View style={styles.containerIcon1}>
                  <View style={styles.containerIcon}>
                    <Image
                      source={require('../assets/icon/iconG.png')}
                      style={styles.iconCategory}
                    />
                  </View>
                  <Text style={styles.fontSize15White}>Documentary</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => this.props.navigation.navigate('Psycho')}>
                <View style={styles.containerIcon1}>
                  <View style={styles.containerIcon}>
                    <Image
                      source={require('../assets/icon/iconH.png')}
                      style={styles.iconCategory}
                    />
                  </View>
                  <Text style={styles.fontSize15White}>Psychology</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>

          <View style={styles.containerTitle}>
            <Text style={styles.fontTitle}>Komik Populer</Text>
          </View>
          <View>
            <FlatList
              horizontal
              data={
                this.state.isLoading
                  ? [
                      1,
                      2,
                      3,
                      4,
                      5,
                      6,
                      7,
                      8,
                      9,
                      10,
                      11,
                      12,
                      13,
                      14,
                      15,
                      16,
                      17,
                      18,
                      19,
                      20,
                    ]
                  : this.state.dataComic
              }
              keyExthgractor={({id}, index) => index}
              renderItem={({item, index}) => (
                <SkeletonContent
                  containerStyle={styles.viewListHorizontal}
                  boneColor="#121212"
                  highlightColor="#333333"
                  animationType="pulse"
                  isLoading={this.state.isLoading}
                  layout={[
                    {
                      key: 'Image',
                      width: 100,
                      height: 150,
                      borderRadius: 10,
                      marginBottom: 6,
                    },
                    {
                      key: 'text1',
                      width: 70,
                      height: 10,
                      borderRadius: 10,
                      marginBottom: 6,
                    },
                    {
                      key: 'text2',
                      width: 50,
                      height: 10,
                      borderRadius: 10,
                    },
                  ]}
                  duration={2500}>
                  <View style={styles.viewListHorizontal}>
                    <View style={styles.viewList1}>
                      <TouchableWithoutFeedback
                        onPress={() =>
                          this.props.navigation.navigate('Details', {
                            item: item,
                          })
                        }>
                        <View>
                          <Image
                            source={{uri: `${item.gambar}`}}
                            style={styles.ImageHorizontal}
                          />
                          <Text style={styles.textItemName}> {item.nama}</Text>
                          <Text style={styles.textItemPrice}>
                            Rp {item.harga}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
                </SkeletonContent>
              )}
            />
          </View>
          <View style={styles.containerTitle}>
            <Text style={styles.fontTitle}>Buku Terbaru</Text>
          </View>
          <View>
            <FlatList
              numColumns={2}
              data={
                this.state.isLoading
                  ? [
                      1,
                      2,
                      3,
                      4,
                      5,
                      6,
                      7,
                      8,
                      9,
                      10,
                      11,
                      12,
                      13,
                      14,
                      15,
                      16,
                      17,
                      18,
                      19,
                      20,
                    ]
                  : this.state.data
              }
              renderItem={({item}) => (
                <SkeletonContent
                  containerStyle={styles.viewList}
                  boneColor="#121212"
                  highlightColor="#333333"
                  animationType="pulse"
                  isLoading={this.state.isLoading}
                  layout={[
                    {
                      key: 'Image',
                      width: 150,
                      height: 200,
                      borderRadius: 10,
                      marginBottom: 6,
                      marginLeft: 10,
                    },
                    {
                      key: 'text1',
                      width: 70,
                      height: 10,
                      borderRadius: 10,
                      marginBottom: 6,
                      marginLeft: 10,
                    },
                    {
                      key: 'text2',
                      width: 50,
                      height: 10,
                      borderRadius: 10,
                      marginBottom: 6,
                      marginLeft: 10,
                    },
                  ]}
                  duration={2500}>
                  <View style={styles.viewList}>
                    <View style={styles.viewList1}>
                      <TouchableWithoutFeedback
                        onPress={() =>
                          this.props.navigation.navigate('Details', {
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
                            Rp {item.harga}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
                </SkeletonContent>
              )}
              keyExtractor={({id}, index) => index}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}
