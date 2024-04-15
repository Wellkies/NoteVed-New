import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../assets/Colors';
// import {IsMobileScreen, IsTabScreen} from '../services/Constants';

const ww = Dimensions.get('window').width;
const wh = Dimensions.get('window').height;

const spinner_typ = 'Wave';
const spinner_size = 70;
const spinner_color = '#4f4958';
const device_width = Dimensions.get('window').width;
const device_height = Dimensions.get('window').height;

export {spinner_color};
export {spinner_size};
export {spinner_typ};
export {device_width};
export {device_height};

export default StyleSheet.create({
  tabbox: {
    backgroundColor: '#ccc',
    // height: 490,
    width: '100%',
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  slide_timeline: {
    height: 55,
    width: 90,
    paddingBottom: 10,
    marginBottom: 10,
    marginLeft: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  header: {
    backgroundColor: '#4372b8',
    height: 190,
    width: '100%',
  },
  lg_timeline: {
    height: 55,
    paddingTop: 2,
    paddingBottom: 5,
    width: '100%',
    // marginLeft:10,
    borderRadius: 10,
  },
  fadingContainer: {
    padding: 20,
    margin: 10,
    backgroundColor: 'powderblue',
  },
  fadingText: {
    fontSize: 18,
  },
  body: {
    marginTop: 30,
    paddingTop: 5,
    height: 120,
    backgroundColor: '#f9f9f9',
  },
  body2: {
    paddingLeft: 10,
    height: 35,
    backgroundColor: '#4372b8',
  },
  body3: {
    marginTop: 10,
    paddingLeft: 20,
    paddingBottom: 5,
    // height:25,
    marginBottom: 10,
  },
 
  avatar_img: {
    width: 55,
    height: 55,
    borderRadius: 30,
  },
  mytab: {
    height: 800,
  },
  bgimage: {
    width: 150,
    height: 126,
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
  },

  h_three: {
    fontSize: 22,
    paddingLeft: 10,
    paddingTop: 20,
    color: '#4372b8',
    fontWeight: '800',
    fontFamily: 'Yaldevi-Regular',
  },

  /////////////////////HOME///////////////////////
  txth2: {
    fontSize: 22,
    // color: '#4372b8',
    color: Colors.primary,
    fontWeight: '800',
    fontFamily: 'Yaldevi-Regular',
  },
  myname: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 26,
    color: '#fff',
    fontWeight: '400',
    fontFamily: 'Yaldevi-Regular',
  },
  mycity: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 16,
    color: '#ccc',
    //fontWeight: '400',
    fontFamily: 'Yaldevi-Regular',
  },

  cont: {
    flex: 1,
    alignItems: 'center',
  },
  linearGradient: {
    height: 73,
    paddingTop: 5,
    paddingLeft: 20,
    width: '100%',
    borderRadius: 6,
  },

  slide_itemz: {
    height: 75,
    width: '25%',
    borderRadius: 6,
    //justifyContent: 'center',

    //alignItems:  'center',
    marginBottom: 10,
    marginRight: 13,

    //backgroundColor: "#ccc",
    //color:'#fff',
  },

  slide_btntxt: {
    color: '#fff',
    fontSize: 14,
    //textAlign: 'center',
    paddingTop: 2,
    // fontWeight: 'bold',
    fontFamily: 'Yaldevi-Regular',
  },

  slide_iconsize: {
    color: '#fff',
    fontSize: 22,
    paddingBottom: 6,
    paddingTop: 4,
  },

  footer: {
    flex: Platform.OS === 'ios' ? 3 : 12,
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  avatar_img_doc: {
    width: 82,
    height: 82,
    borderRadius: 50,
  },

  header_doc: {
    backgroundColor: '#eaeef2',
    height: 150,
    paddingBottom: 50,
    width: '100%',
    paddingHorizontal: 10,
    shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 7,
    // },
    // shadowOpacity: 0.43,
    // shadowRadius: 9.51,
    elevation: 15,
  },

  header_doc2: {
    backgroundColor: '#f4f4f4',
    // height:100,
    width: '100%',
    paddingTop: 10,
  },
  header_doc3: {
    backgroundColor: '#f4f4f4',

    width: '100%',
    paddingTop: 10,
  },

  inner_doc: {
    backgroundColor: '#cccccc',
    // height:550,
    width: '100%',
  },

  inner_docform: {
    backgroundColor: '#f4f4f4',
    // height: 550,
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
  },

  avatar_mm: {
    alignItems: 'center',
    width: 87,
    height: 87,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 10,
    marginLeft: 10,
    // position: 'absolute',
    borderColor: '#000',
    // marginTop: 25,
    resizeMode: 'contain',
  },

  bgimage_doc: {
    width: 150,
    height: 126,
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
  },
  myname_doc: {
    position: 'absolute',
    top: 45,
    left: 120,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    fontWeight: '400',
    fontFamily: 'Yaldevi-Regular',
  },
  listbox_timev2: {
    minHeight: 20,
    marginTop: 12,
    marginLeft: 4,
    marginRight: 6,
    padding: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderWidth: 1,
    borderColor: '#353738',
    backgroundColor: '#f2f2f2',
    borderRadius: 4,
  },

  myname_docsmall: {
    position: 'absolute',
    top: 75,
    left: 120,
    fontSize: 12,
    color: '#fff',
    //fontWeight: '400',
    fontFamily: 'Yaldevi-Regular',
  },

  myname_docsmall2: {
    position: 'absolute',
    top: 95,
    left: 120,
    fontSize: 12,
    color: '#fff',
    //fontWeight: '400',
    fontFamily: 'Yaldevi-Regular',
  },

  listbox_clinic: {
    // flexDirection: "row",
    // width: screen_width * 0.93,
    width:'90%',
    minHeight: 70,
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    marginTop: 5,
    marginHorizontal: 5,
    padding: 0,
    paddingLeft: 7,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  bookIn2: {
    width: '100%',
    fontSize: 10,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 5,
  },
  // listboxTxt: {
  //   fontSize: 20,
  //   padding: 5,
  //   paddingLeft: 10,
  //   paddingRight: 10,
  //   flex: 5,
  // },

  listbox_tmbox: {
    flexDirection: 'row',
    // width: screen_width * 0.9,
    width:'90%',
    minHeight: 100,
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    marginTop: 5,
    marginLeft: 20,
    marginRight: 6,
    padding: 0,
    paddingLeft: 2,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },


  container: {
    flex: 1,
    alignItems: 'center',
  },

  listbox: {
    flexDirection: 'row',
    width: ww * 0.92,
    minHeight: 130,
    // backgroundColor: '#f3f3f3',
    borderRadius: 20,
    marginTop: 8,
    // marginLeft: 15,
    // marginRight: 6,
    marginHorizontal:10,
    padding: 0,
    paddingLeft: 0,
    borderWidth: 2,
    borderColor: '#fff',
  },
  listbox_left: {
    flex: 3,
    height: 110,
    backgroundColor: '#79848a',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  listbox_right: {
    flex: 5,
    paddingLeft: 10,
    paddingTop: 10,
    height: 110,
    backgroundColor: '#f4f4f4',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },

  listboxTxt: {
    fontSize: 20,
    paddingLeft: 20,
    paddingRight: 10,
    flex: 5,
  },
  listboxImg: {
    flex: 1,
    width: 40,
    height: 55,
    borderWidth: 1,
    borderColor: '#ccc',
    resizeMode: 'contain',
  },

  listboxImg4: {
    backgroundColor: '#bfd4f2',
    width:  65,
    height:  65,
    borderRadius: 50,
    alignSelf: 'center',
    // flex: 1,
    // width: IsMobileScreen ? 40 : 100,
    // height: IsMobileScreen ? 55 : 100,
    // marginTop: 6,
    // marginRight: 4,
    // borderWidth: 1,
    // borderColor: '#4372b8',
  },

  center: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 10,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  /////////////////////////////////DRAWER START

  drawer_lbl_style: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal:-10,
    marginBottom:-5
  },
  dr_itm: {
    backgroundColor: '#fff',
    borderBottomColor: '#ccc',
  },
  userInfoSection: {
    height: 90,
    width: '100%',
    marginTop: -4,
    paddingTop: 0,
    backgroundColor: '#4372b8',
    paddingLeft: 20,
  },

  /////////////////////////////////DRAWER ENDS

  text: {
    fontSize: 30,
    color: '#ffffff',
    marginBottom: 130,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
  fadingContainer: {
    padding: 20,
    margin: 10,
    backgroundColor: 'powderblue',
  },
  fadingText: {
    fontSize: 18,
  },
});
