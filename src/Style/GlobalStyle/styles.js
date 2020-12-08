import {StyleSheet} from 'react-native';

const HEADER_MAX_HEIGHT = 220;

export const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: '#0b0909',
  },
  fillModal: {
    backgroundColor: '#0b0909',
  },
  container: {
    flex: 1,
    padding: 15,
  },
  containerDrawer: {
    flex: 1,
    padding: 20,
  },
  containerIcon: {
    height: 58,
    width: 58,
    borderWidth: 0.3,
    borderColor: 'grey',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerIcon1: {
    alignItems: 'center',
    width: '25%',
  },
  containerIcon2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 18,
  },
  container3: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    marginTop: 18,
  },

  containerBody: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerBodyShop: {
    flexDirection: 'row',
  },
  containerHeader: {
    zIndex: 100,
    position: 'absolute',
    padding: 5,
    flexDirection: 'row',
  },
  headerLogin: {
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.4,
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
  },
  fontLogin: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
  fontDiLogin: {
    fontSize: 23,
    fontWeight: 'bold',
    marginLeft: 115,
  },
  fontDaftar: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 65,
    color: 'deepskyblue',
  },
  fontTitle: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },
  containerSwiper: {
    flex: 1,
    height: HEADER_MAX_HEIGHT,
  },
  slide: {
    backgroundColor: 'transparent',
  },

  mobil: {
    alignSelf: 'center',
    bottom: -20,
  },
  header: {
    padding: 15,
    flexDirection: 'row',
    elevation: 2,
  },

  headerBody: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonOpenDrawer: {
    height: 34,
    width: 34,
    tintColor: 'white',
  },
  containerOpenDrawer: {
    margin: 5,
  },
  icon: {
    height: 23,
    width: 23,
    tintColor: 'white',
  },
  justify: {
    justifyContent: 'center',
  },
  iconPin: {
    height: 23,
    width: 23,
    tintColor: 'deepskyblue',
  },
  iconBack: {
    height: 18,
    width: 18,
    tintColor: 'white',
  },
  iconBack2: {
    height: 18,
    width: 18,
    tintColor: 'white',
    marginTop: 8,
    marginLeft: 10,
  },
  iconSearch: {
    height: 25,
    width: 25,
  },
  iconCategory: {
    height: 30,
    width: 30,
    tintColor: 'grey',
  },
  iconSearch1: {
    height: 25,
    width: 25,
    marginLeft: 240,
    marginTop: 10,
  },
  fontAuth: {
    color: 'grey',
  },

  button: {
    backgroundColor: '#74acfb',
    width: 327,
    height: 48,
    borderRadius: 6,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'grey',
    justifyContent: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    width: 15,
    height: 15,
    marginLeft: 15,
  },
  buttonSocial: {
    width: 327,
    height: 48,
    borderRadius: 6,
    alignSelf: 'center',
    marginTop: 40,
    elevation: 1.5,
  },
  buttonTextSocial: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  fontForgetPass: {
    color: '#B0B0B0',
    alignSelf: 'center',
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 15,
  },
  fontloginAnother: {
    alignSelf: 'center',
    marginTop: 25,
    fontSize: 13,
    color: '#B0B0B0',
  },
  socialMedia: {
    marginTop: 40,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonFacebook: {
    height: 48,
    width: 250,
    backgroundColor: '#36589E',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    flexDirection: 'row',
    bottom: 15,
  },
  textFacebook: {
    color: 'white',
    fontSize: 14,
  },
  buttonGoogle: {
    height: 48,
    width: 250,
    backgroundColor: '#EB4132',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    flexDirection: 'row',
    bottom: 10,
  },
  fontGoogle: {
    color: 'white',
    fontSize: 14,
  },
  textSignUp: {
    color: '#36589E',
    fontWeight: 'bold',
    fontSize: 18,
  },
  logo: {
    marginRight: 10,
    width: 20,
    height: 20,
  },
  containerModal: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    flexDirection: 'column-reverse',
  },
  containerModalEdit: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
  },
  popupModal: {
    backgroundColor: '#fff',
    padding: 10,
  },
  containerOption: {
    flexDirection: 'row',
    padding: 25,
    marginBottom: -10,
  },
  textDetailsModal: {
    color: 'grey',
    fontSize: 18,
    width: 150,
    alignSelf: 'center',
    marginLeft: 20,
  },
  buttonDetailsModal: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    borderTopWidth: 0.3,
    borderTopColor: '#dddada',
  },
  fontGreySize18: {
    fontSize: 18,
    color: 'grey',
  },
  count: {
    borderWidth: 1,
    height: 40,
    width: 50,
    borderColor: 'grey',
  },
  textCount: {
    fontSize: 17,
  },
  countMinus: {
    height: 23,
    width: 23,
    marginLeft: 150,
    borderWidth: 1,
    borderColor: 'grey',
    marginRight: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countPlus: {
    height: 23,
    width: 23,
    borderWidth: 1,
    borderColor: 'grey',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 3,
  },
  fontCount: {
    color: 'grey',
    fontSize: 30,
    textAlignVertical: 'center',
  },
  imageBuy: {width: 60, height: 80},
  /////////// flatList Style/////////////
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 20,
  },
  containerSearch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  viewList: {
    flexBasis: '50%',

    width: 160,
  },
  viewList1: {
    borderWidth: 0.1,
    borderColor: 'grey',
    borderRadius: 3,
    marginLeft: 3,
    alignItems: 'center',
    backgroundColor: '#100f0f',
  },
  viewListHorizontal: {
    width: 115,
  },
  Image: {
    marginTop: 20,
    width: 150,
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  ImageShop: {
    marginTop: 20,
    width: 150,
    height: 200,
    borderRadius: 3,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  ImageHorizontal: {
    width: 100,
    height: 150,
    borderRadius: 3,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  textItemName: {
    fontSize: 15,
    color: 'white',
    marginTop: 10,
  },
  textItemPrice: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'grey',
  },
  isLoading: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'black',
  },
  // Details Style //
  containerBodyDetails: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: -18,
  },
  buttonKeranjang: {
    backgroundColor: 'deepskyblue',
    height: 40,
    borderRadius: 3,
    width: 260,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  ContainerButtonKeranjang: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonChat: {
    backgroundColor: 'deepskyblue',
    width: 70,
    height: 40,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  detailItemName: {
    color: 'white',
    fontSize: 25,
    width: 150,
    alignSelf: 'center',
    marginLeft: 20,
    fontWeight: 'bold',
  },
  buttonPrice: {
    flexDirection: 'row',
    flexBasis: '50%',
  },
  textButtonPrice: {
    fontSize: 16,
    fontWeight: '900',
    backgroundColor: 'deepskyblue',
    width: 140,
    height: 40,
    borderRadius: 5,
    textAlignVertical: 'center',
    textAlign: 'center',
    marginLeft: 12,
  },
  textButtonFree: {
    fontSize: 17,
    fontWeight: '900',
    backgroundColor: 'transparent',
    color: 'deepskyblue',
    width: 140,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    textAlignVertical: 'center',
    textAlign: 'center',
    marginLeft: 12,
  },

  //Profile//
  textButtonEdit: {
    fontSize: 15,
    color: 'white',
    borderRadius: 1,
  },
  ImageAddUpdate: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: 'grey',
  },
  containerButtonEdit: {
    marginTop: 100,
    borderColor: 'grey',
    borderWidth: 1,
    width: 80,
    alignContent: 'center',
  },
  containerButtonEditProduk: {
    margin: 20,
    borderColor: 'grey',
    borderWidth: 1,
    width: 130,
    alignSelf: 'center',
  },
  headerProfile: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'white',
    flexDirection: 'row',
  },
  fontHeaderProfile: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    margin: 5,
  },

  fontGreySize18White: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  fontSize15White: {
    fontSize: 10,
    color: 'grey',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 6,
  },
  fontSize17White: {
    fontSize: 15,
    color: 'white',
  },
  fontSize17blue: {
    fontSize: 17,
    color: 'deepskyblue',
    fontWeight: 'bold',
  },
  fontSize16White: {
    fontSize: 16,
    color: 'white',
  },
  fontGreySize20White: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  fontGreySize20WhiteMargin: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
  },
  fontGreySize18WhiteMargin: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 20,
  },
  fontGreySize18Black: {
    fontSize: 16,
    marginTop: 15,
  },
  fontSize20White: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 20,
  },
  underLine: {
    borderTopWidth: 0.4,
    borderTopColor: 'grey',
    width: 300,
  },
  buttonSignOut: {
    backgroundColor: 'deepskyblue',
    height: 30,
    width: 70,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },

  // SHOP POST///
  containeraddImage: {
    padding: 30,
  },
  ImageAddImage: {
    width: 120,
    height: 115,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  // SHOP///
  containerBodyDetailSeller: {
    padding: 20,
    marginBottom: -20,
  },
  toDesc: {
    alignSelf: 'center',
  },
  inputProduct: {
    borderRadius: 5,
    backgroundColor: 'white',
    marginTop: 10,
  },
  buttonAddProduct: {
    backgroundColor: 'deepskyblue',
    height: 40,
    width: 150,
    borderRadius: 10,
    marginTop: 40,
    alignSelf: 'center',
  },
  flexDirection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 30,
    marginTop: -30,
    marginBottom: -30,
  },
  fontAddProduct: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  // Order//
  containerOrder: {
    flexDirection: 'row',
    marginTop: 20,
  },
  containerbuttonConfirm: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  containerOrderChat: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#100f0f',
    borderRadius: 5,
  },
  buttonConfirm: {
    backgroundColor: 'deepskyblue',
    height: 50,
  },
  buttonConfirmShop: {
    backgroundColor: '#141429',
    height: 50,
  },
  buttonConfirm1: {
    backgroundColor: 'deepskyblue',
    height: 50,
    width: 170,
    borderRadius: 4,
    alignSelf: 'flex-end',
  },

  fontConfirm: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 7,
  },
  ImageOrder: {
    width: 120,
    height: 170,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  ImageOrderChat: {
    width: 100,
    height: 120,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  ImageUserOrder: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  containerUsername: {
    flexDirection: 'row',
    backgroundColor: '#042834',
    height: 150,
    padding: 20,
  },
  containerjustflexdirection: {
    flexDirection: 'row',
  },
  containerUsernameChild: {
    marginLeft: 130,
    zIndex: 100,
    position: 'absolute',
    borderBottomWidth: 0.3,
    borderBottomColor: 'white',
  },
  textItemOrder: {
    color: 'white',
    fontSize: 16,
    marginLeft: 15,
    marginTop: 8,
  },
  textItemOrder1: {
    color: 'white',
    fontSize: 14,
  },
  fontWhiteSize20: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    margin: 5,
  },
  Penjual: {
    marginTop: 25,
    borderWidth: 0.4,
    borderTopColor: 'grey',
    borderBottomColor: 'grey',
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  removeIcon: {
    height: 33,
    width: 33,
  },
  removeIconShop: {
    height: 33,
    width: 33,
    tintColor: 'white',
    marginLeft: 70,
  },
  //Drawer//
  titleDrawer: {fontWeight: 'bold'},
  headerDrawer: {
    backgroundColor: 'deepskyblue',
    height: 100,
    justifyContent: 'center',
  },
  fontHeaderDrawer: {fontSize: 25, marginLeft: 10},
  fontHeaderDrawer2: {fontSize: 19, marginTop: -20, marginLeft: 7},
  publisher: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },

  // Loading ini button//
  scrollContainer: {alignItems: 'center'},
  fontContainerLoading: {color: 'grey', fontSize: 12},
  ActivityIndicator: {alignItems: 'center'},

  // Chat //

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  bubble_you: {
    maxWidth: '70%',
    minWidth: '0%',
    backgroundColor: '#2e3c48',
    borderRadius: 10,
    padding: 7,
    marginBottom: 2,
    alignSelf: 'flex-end',
  },
  bubble_they: {
    maxWidth: '70%',
    minWidth: '0%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 7,
    marginBottom: 2,
    alignSelf: 'flex-start',
  },
  backgroundChat: {backgroundColor: '#2e3c48'},
  textInputChat: {
    width: '80%',
    color: 'white',
  },
  textInputSearch: {
    width: '90%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  texMessage: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: '900',
    fontSize: 13,
  },
  texMessageThey: {
    alignSelf: 'center',
    fontWeight: '900',
    fontSize: 13,
  },
  timechat: {color: 'grey', fontSize: 11, top: 2},
});
