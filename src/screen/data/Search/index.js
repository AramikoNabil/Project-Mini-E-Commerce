import React, {Component} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  Text,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {styles} from '../../../Style/GlobalStyle/styles';
import Axios from 'axios';

export default class novel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      text: '',
      isLoading: false,
      isError: false,
    };
  }

  getSearh = async () => {
    this.setState({isLoading: true});
    try {
      const response = await Axios.get(
        `https://mini-project-c.herokuapp.com/api/cari/${this.state.text}`,
      );

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
    return (
      <ScrollView ScrollView style={styles.fill}>
        <View style={styles.container}>
          <View style={styles.containerSearch}>
            <TextInput
              value={this.state.text}
              style={styles.textInputSearch}
              placeholder="Search"
              autoFocus
              placeholderTextColor="grey"
              onSubmitEditing={() => this.getSearh()}
              onChangeText={(data) => this.setState({text: data})}
            />
            <View style={styles.justify}>
              <TouchableOpacity onPress={() => this.getSearh()}>
                <Image
                  source={require('../../../assets/icon/magnifier.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
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
