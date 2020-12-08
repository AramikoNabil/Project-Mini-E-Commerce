import React, {Component} from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import {Container, Header, Tab, Tabs, Body, Left, Title} from 'native-base';
import Tab1 from '../screen/Confirm1';
import Tab2 from '../screen/Confirm2';
import {styles} from '../Style/GlobalStyle/styles';
export default class TabsScrollableExample extends Component {
  render() {
    return (
      <Container>
        <Header
          hasTabs
          style={styles.backgroundChat}
          iosBarStyle="light-content"
          androidStatusBarColor="#2e3c48">
          <Left>
            <View style={styles.headerProfile}>
              <TouchableOpacity
                style={styles.containerOpenDrawer}
                onPress={() => this.props.navigation.openDrawer()}>
                <Image
                  style={styles.buttonOpenDrawer}
                  source={require('../assets/icon/menu.png')}
                />
              </TouchableOpacity>
            </View>
          </Left>
          <Body>
            <Title>Your Order </Title>
          </Body>
        </Header>
        <Tabs tabBarBackgroundColor="#2e3c48" tabStyle={styles.backgroundChat}>
          <Tab
            heading="Dikemas"
            tabStyle={styles.backgroundChat}
            textStyle={{color: '#aeaeb1', fontFamily: 'Poppins'}}
            activeTabStyle={{backgroundColor: 'white'}}
            activeTextStyle={{
              color: 'Black',
            }}>
            <Tab1 />
          </Tab>
          <Tab
            heading="Selesai"
            tabStyle={styles.backgroundChat}
            textStyle={{color: '#aeaeb1', fontFamily: 'Poppins'}}
            activeTabStyle={{backgroundColor: 'white'}}
            activeTextStyle={{
              color: 'Black',
            }}>
            <Tab2 />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
