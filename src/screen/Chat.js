import React, {Component} from 'react';
import {
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  FlatList,
  View,
  BackHandler,
} from 'react-native';
import {styles} from '../Style/GlobalStyle/styles';
import {
  Container,
  Header,
  List,
  ListItem,
  Left,
  Body,
  // Right,
  Thumbnail,
  Text,
  Button,
  Title,
} from 'native-base';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Pusher from 'pusher-js/react-native';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      token: '',
      isLoading: true,
      isError: false,
      refreshing: false,
    };
  }

  // Mount User Method
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    this.getToken();
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  handleBackButtonClick = () => {
    this.props.navigation.navigate('Homepage', {screen: 'Homepage'});
    return true;
  };

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.getContact().then(() => {
      this.setState({refreshing: false});
    });
  };

  getToken() {
    AsyncStorage.getItem('token').then((token) => {
      console.log('TOKEN ==== ', token);
      if (token !== null) {
        console.log('TOKEN ', token);
        this.setState({token: token});
        this._onRefresh();
      }
    });

    var pusher = new Pusher('db781967d49829d1c8a0', {
      cluster: 'ap1',
    });
    var channel = pusher.subscribe('my-channel');
    //bind and listen for chat events
    channel.bind('my-event', (data) => {
      this.getContact();
    });
    //setelah token muncul maka ambil data
  }

  getContact = async () => {
    console.log(this.state.token);
    try {
      const response = await Axios.get(
        'https://mini-project-c.herokuapp.com/api/kontak',
        {
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          },
        },
      );

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
  render() {
    //  If load data
    if (this.state.isLoading) {
      return (
        <View style={styles.isLoading}>
          <ActivityIndicator size="large" color="red" />
        </View>
      );
    }
    return (
      <Container>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
          <Header
            style={styles.backgroundChat}
            iosBarStyle="light-content"
            androidStatusBarColor="#2e3c48">
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.goBack()}>
                <Image
                  source={require('../assets/icon/go-back-left-arrow.png')}
                  style={styles.iconBack}
                />
              </Button>
            </Left>
            <Body>
              <Title> Borneo BookStore </Title>
            </Body>
          </Header>

          <FlatList
            data={this.state.data}
            keyExtractor={({id}, index) => index}
            renderItem={({item}) => (
              <List>
                <ListItem avatar>
                  <Left>
                    <Thumbnail source={{uri: `${item.avatar}`}} />
                  </Left>
                  <Body>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('ChatAll', {
                          item: item,
                        })
                      }>
                      <Text>{item.username}</Text>
                      {/* <Text note>{item.message} </Text> */}
                    </TouchableOpacity>
                  </Body>
                  {/* <Right>
                      <Text note>{item.time}</Text>
                    </Right> */}
                </ListItem>
              </List>
            )}
          />
        </ScrollView>
      </Container>
    );
  }
}
