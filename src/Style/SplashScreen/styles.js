import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  bg: {
    justifyContent: 'center',
    height: height,
    width: width,
    backgroundColor: 'white',
  },

  indicator: {
    marginTop: 350,
  },
  splash: {
    flex: 1,
  },
  img: {
    position: 'absolute',
    alignSelf: 'center',
    height: 350,
    width: 350,
  },
  containerSplashScreen: {
    justifyContent: 'center',
    position: 'absolute',
    alignSelf: 'center',
  },
});
