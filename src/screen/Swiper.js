import React, {Component} from 'react';
import {AppRegistry, View, Image} from 'react-native';
import Swiper from 'react-native-swiper';

const styles = {
  container: {
    flex: 1,
  },

  wrapper: {},

  slide: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  image: {
    flex: 1,
    alignSelf: 'center',
  },
};
export default class Carousel extends Component {
  render() {
    return (
      <Swiper autoplay>
        <View style={styles.slide}>
          <Image
            resizeMode="contain"
            source={require('../assets/images/pamflet4.jpg')}
            style={styles.image}
          />
        </View>
        <View style={styles.slide}>
          <Image
            resizeMode="contain"
            source={require('../assets/images/pamflet.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.slide}>
          <Image
            resizeMode="contain"
            source={require('../assets/images/pamflet2.png')}
            style={styles.image}
          />
        </View>

        <View style={styles.slide}>
          <Image
            resizeMode="contain"
            source={require('../assets/images/pamflet3.jpeg')}
            style={styles.image}
          />
        </View>
        <View style={styles.slide}>
          <Image
            resizeMode="contain"
            source={require('../assets/images/pamflet5.jpg')}
            style={styles.image}
          />
        </View>
      </Swiper>
    );
  }
}

AppRegistry.registerComponent('myproject', () => Carousel);
