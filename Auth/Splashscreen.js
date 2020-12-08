import React from 'react';
import {View, Image, ActivityIndicator} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '.././src/Style/SplashScreen/styles';
import img from '.././src/assets/images/img.png';

class Splashscreen extends React.Component {
  state = {
    role: true,
  };
  splash = () => {
    if (this.state.role) {
      return (
        <View style={styles.bg}>
          <Image source={img} style={styles.img} />
          <View style={styles.containerSplashScreen}>
            <ActivityIndicator
              size="large"
              color="deepskyblue"
              style={styles.indicator}
            />
          </View>
        </View>
      );
    } else {
      this.props.navigation.replace('Homepage');
    }
    // else {
    //   AsyncStorage.getItem('token').then((value) => {
    //     console.log(value);
    //     if (value != null) {
    //       this.props.navigation.navigate('AppStack', {screen: 'AppStack'});
    //     } else {
    //       this.props.navigation.navigate('AppStack', {screen: 'AppStack'});
    //     }
    //   });
    // }
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        role: false,
      });
    }, 2000);
  }
  render() {
    return (
      <View>
        <View style={styles.splash}>{this.splash()}</View>
      </View>
    );
  }
}

export default Splashscreen;
