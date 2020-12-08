import React, {Component} from 'react';
import {
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  Text,
  ActivityIndicator,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {styles} from '../../../../Style/GlobalStyle/styles';

import Axios from 'axios';

export default class Searcbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      text: '',
      isLoading: false,
      isError: false,
    };
  }

  componentDidMount() {
    this.forceUpdate();
    this.getSearh();
  }

  getSearh = async () => {
    this.setState({isLoading: true});
    try {
      const response = await Axios.get(
        'https://mini-project-c.herokuapp.com/api/kategori/7',
      );
      console.log(response.data.data);
      if (response) {
        this.setState({
          isLoading: false,
          data: response.data.data,
        });
      }
    } catch (error) {
      this.setState({isLoading: false});
      ToastAndroid.show('not found', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.isLoading}>
          <ActivityIndicator size="large" color="red" />
        </View>
      );
    }

    // const {val} = this.props.route.params;
    return (
      <ScrollView ScrollView style={styles.fill}>
        <View style={styles.headerProfile}>
          <TouchableOpacity
            style={styles.containerOpenDrawer}
            onPress={() => this.props.navigation.openDrawer()}>
            <Image
              style={styles.buttonOpenDrawer}
              source={require('../../../../assets/icon/menu.png')}
            />
          </TouchableOpacity>
          <Text style={styles.fontWhiteSize20}> Documentary</Text>
        </View>
        <View style={styles.container}>
          <View>
            <FlatList
              numColumns={2}
              data={this.state.data}
              renderItem={({item}) => (
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
              )}
              keyExtractor={({id}, index) => index}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}
