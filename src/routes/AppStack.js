import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
// import {styles} from '../Style/GlobalStyle/styles';
import Splashscreen from '../../Auth/Splashscreen';
import Register from '../../Auth/Register';
import Login from '../../Auth/Login';
import Homepage from '../screen/Homepage';
import DrawerContent from '../screen/DrawerContents';
import Details from '../screen/data/Details/index';
import DetailsSeller from '../screen/data/detailSeller/index';
import Profile from '../screen/data/Profile/index';
import Shop from '../screen/Shop';
import ShopPost from '../screen/ShopPost';
import Order from '../screen/Order';
import Setting from '../screen/Setting';
import toProfile from '../screen/Bridges/ToProfile';
import toCart from '../screen/Bridges/ToCart';
import toShop from '../screen/Bridges/ToShop';
import toShopPost from '../screen/Bridges/ToShopPost';
import toChatPerson from '../screen/Bridges/toChatPerson';
import toChat from '../screen/Bridges/toChat';
import ChatPerson from '../screen/ChatPerson';
import Chat from '../screen/Chat';
import ChatAll from '../screen/ChatAll';
import SearchBar from '../screen/data/Search/index';
import PayScreen from '../screen/PayScreen';
import ConfirmScreen from '../screen/ConfirmScreen';
import toConfirm from '../screen/Bridges/toConfirm';
import ListOrder from '../screen/data/Shop/ListOrder';
import ShopConfirm from '../screen/data/Shop/ShopConfirm';
import HistoryShop from '../screen/data/Shop/HistoryShop';
import Novel from '../screen/data/CategoryProduk/novel/index';
import Comic from '../screen/data/CategoryProduk/comic/index';
import Fantasy from '../screen/data/CategoryProduk/fantasy/index';
import Horror from '../screen/data/CategoryProduk/horror/index';
import Comedy from '../screen/data/CategoryProduk/comedy/index';
import Science from '../screen/data/CategoryProduk/science/index';
import Documentary from '../screen/data/CategoryProduk/documentary/index';
import Psycho from '../screen/data/CategoryProduk/psychology/index';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MyTabs = (token) => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Homepage" component={Homepage} />
      <Drawer.Screen name="Details" component={Details} />
      <Drawer.Screen name="Novel" component={Novel} />
      <Drawer.Screen name="Comic" component={Comic} />
      <Drawer.Screen name="Fantasy" component={Fantasy} />
      <Drawer.Screen name="Horror" component={Horror} />
      <Drawer.Screen name="Comedy" component={Comedy} />
      <Drawer.Screen name="Science" component={Science} />
      <Drawer.Screen name="Documentary" component={Documentary} />
      <Drawer.Screen name="Psycho" component={Psycho} />

      {token !== '' ? (
        <>
          <Drawer.Screen name="Shop" component={Shop} />
          <Drawer.Screen name="DetailsSeller" component={DetailsSeller} />
          {/* <Drawer.Screen name="Order" component={Order} /> */}
          <Drawer.Screen name="ShopPost" component={ShopPost} />
          <Drawer.Screen name="Profile" component={Profile} />
          <Drawer.Screen name="ChatPerson" component={ChatPerson} />
          <Drawer.Screen name="Chat" component={Chat} />
          {/* <Drawer.Screen name="PayScreen" component={PayScreen} /> */}
          <Drawer.Screen name="ConfirmScreen" component={ConfirmScreen} />
          <Drawer.Screen name="ListOrder" component={ListOrder} />
          <Drawer.Screen name="ShopConfirm" component={ShopConfirm} />
          <Drawer.Screen name="HistoryShop" component={HistoryShop} />
        </>
      ) : null}
    </Drawer.Navigator>
  );
};

class AppStack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
    };
  }

  componentDidMount() {
    this.getToken();
    this.forceUpdate();
  }

  getToken() {
    AsyncStorage.getItem('token').then((token) => {
      if (token !== null) {
        console.log('TOKEN ', token);
        this.setState({token: token});
      } else {
        this.setState({token: ''});
      }
    });

    //setelah token muncul maka ambil data
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode={false}>
          <Stack.Screen name="Splashscreen" component={Splashscreen} />
          <Stack.Screen
            name="Homepage"
            component={MyTabs}
            token={this.state.token}
          />
          {/* <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Shop" component={Shop} />
          <Stack.Screen name="ShopPost" component={ShopPost} /> */}
          <Stack.Screen name="toProfile" component={toProfile} />
          <Stack.Screen name="toCart" component={toCart} />
          <Stack.Screen name="toShop" component={toShop} />
          <Stack.Screen name="toShopPost" component={toShopPost} />
          <Stack.Screen name="toChatPerson" component={toChatPerson} />
          <Stack.Screen name="toChat" component={toChat} />
          <Stack.Screen name="toConfirm" component={toConfirm} />
          <Stack.Screen name="Setting" component={Setting} />
          <Stack.Screen name="SearchBar" component={SearchBar} />
          <Stack.Screen name="ChatAll" component={ChatAll} />
          <Stack.Screen name="Order" component={Order} />
          <Stack.Screen name="PayScreen" component={PayScreen} />

          {this.state.token === '' ? (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </>
          ) : null}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default AppStack;
