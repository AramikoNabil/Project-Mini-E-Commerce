import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
// import native base components

//import pusher
import Pusher from 'pusher-js/react-native';
import AsynStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import {
  Container,
  Header,
  Left,
  Button,
  Title,
  Footer,
  Body,
} from 'native-base';
import {styles} from '../Style/GlobalStyle/styles';

//react-native class

export default class ChatPerson extends Component {
  //load constructor
  constructor(props) {
    super(props);

    // var messages_array = [];
    // Mendeklarasikan Initial State
    this.state = {
      messages_array: [],
      text: '',
      token: '',
      isLoading: true,
    };
  }
  componentDidMount() {
    this.getToken();
  }

  getToken() {
    AsynStorage.getItem('token').then((token) => {
      if (token !== null) {
        // console.log('TOKEN', token);
        this.setState({token: token, isLoading: false});
        this.getMessage();
      }
    });

    //instantiate pusher
    var pusher = new Pusher('db781967d49829d1c8a0', {
      cluster: 'ap1',
    });
    var channel = pusher.subscribe('my-channel');
    //bind and listen for chat events
    channel.bind('my-event', (data) => {
      this.state.messages_array.push(data);
      this.getMessage();
      this.setState({
        text: '',
      });
    });
  }

  //function untuk Mengirim
  send_message() {
    //check that the text input isnt empty
    if (this.state.text !== '') {
      fetch(
        `https://mini-project-c.herokuapp.com/api/kirim/${this.props.route.params.item.user}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.state.token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: this.state.text,
          }),
        },
      )
        .then((response) => response.json())
        .then((response) => {
          if (response) console.log('Terkirim', response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  getMessage = async () => {
    console.log(this.state.token);
    try {
      const response = await Axios.get(
        `https://mini-project-c.herokuapp.com/api/terima/${this.props.route.params.item.user_id}`,
        {
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          },
        },
      );
      console.log(response.data.data);
      if (response) {
        this.setState({
          isLoading: false,
          messages_array: response.data.data,
        });
      }
    } catch (error) {
      this.setState({isLoading: false});
    }
  };

  loop() {
    var element = [];
    for (var index = 0; index < this.state.messages_array.length; index++) {
      element.push(
        <View key={'container' + index}>
          <View
            style={
              this.state.messages_array[index].from !==
              this.props.route.params.item.user_id
                ? styles.bubble_you
                : styles.bubble_they
            }>
            <Text
              key={index}
              style={
                this.state.messages_array[index].from !==
                this.props.route.params.item.user_id
                  ? styles.texMessage
                  : styles.texMessageThey
              }>
              {this.state.messages_array[index].message} {'\n'}{' '}
              <Text key={index} style={styles.timechat}>
                {this.state.messages_array[index].time}
              </Text>
            </Text>
          </View>
        </View>,
      );
    }
    return element;
  }

  render() {
    const {item} = this.props.route.params;

    //Mengeksekusi store and loop
    var myloop = this.loop();

    if (this.state.isLoading) {
      return (
        <View style={styles.isLoading}>
          <ActivityIndicator size="large" color="red" />
        </View>
      );
    }

    return (
      <Container>
        <Header
          style={styles.backgroundChat}
          iosBarStyle="light-content"
          androidStatusBarColor="#2e3c48">
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Image
                source={require('../assets/icon/go-back-left-arrow.png')}
                style={styles.iconBack}
              />
            </Button>
          </Left>
          <Body>
            <Title> @ {item.user} </Title>
          </Body>
        </Header>
        <ScrollView
          ref={(ref) => {
            this.scrollView = ref;
          }}
          onContentSizeChange={() =>
            this.scrollView.scrollToEnd({animated: false})
          }
          style={{backgroundColor: '#0f151a'}}>
          <View style={styles.container}>
            <View style={styles.containerOrderChat}>
              <Image
                source={{uri: `${item.gambar}`}}
                style={styles.ImageOrderChat}
              />
              <View style={styles.fontGreySize18WhiteMargin}>
                <Text style={styles.fontGreySize20WhiteMargin}>
                  {' '}
                  Judul:
                  {item.nama} {'\n'}{' '}
                  <Text style={styles.fontGreySize18WhiteMargin}>
                    Harga : Rp {item.harga}
                  </Text>
                </Text>
              </View>
            </View>
            {/* <Text style={styles.welcome}>Welcome to the public chat room!</Text> */}
            {myloop}
          </View>
        </ScrollView>
        <Footer style={styles.backgroundChat}>
          <TextInput
            value={this.state.text}
            style={styles.textInputChat}
            placeholder="Message"
            placeholderTextColor="grey"
            multiline={true}
            onChangeText={(messageText) => this.setState({text: messageText})}
          />
          <View style={{justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => this.send_message()}>
              <Image
                source={require('../assets/icon/iconSend.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </Footer>
      </Container>
    );
  }
}
