import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  Dimensions,
  StatusBar,
  Alert,
  ToastAndroid,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {Avatar, Checkbox} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';

import DeviceInfo, {isTablet} from 'react-native-device-info';
import {useTheme} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import CommonMessage from '../constants/CommonMessage';
// import { IsTabScreen } from '../services/Constants';
import i18n from 'i18next';
import Colors from '../../../assets/Colors';
// import {loginOtp} from '../redux/actions/Action';
const {t: trans} = i18n;
import {useDispatch, useSelector} from 'react-redux';
import {device_height, device_width} from '../style';
import {ImageBackground} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../../redux/store/reducerHook';
import {selectStudentLanguage} from '../../redux/reducers/languageReducer';

const TermAndConditions = () => {
  // const orientation = useOrientation();
  const navigation = useNavigation();
  const [showprog, setshowprog] = React.useState(false);
  const height = Dimensions.get('screen').height;
  const width = Dimensions.get('screen').width;
  const {colors} = useTheme();
  const [checkForm, setCheckForm] = useState(false);
  //   const {itemId, phone = ''} = route.params;
  //   console.log(phone, 'phone/////');
  const dispatch = useDispatch();
  const selectedLanguage = useAppSelector(selectStudentLanguage);
  const agreementOdia = [
    {
      title: `ନୋଟଭେଦ ଆପ୍ ର ସମୀକ୍ଷା`,
      content: `ପିଲାମାନେ ସେମାନଙ୍କର ପାଠ୍ୟକ୍ରମ ସାମଗ୍ରୀ ଅଧ୍ୟୟନ ଏବଂ ଅଭ୍ୟାସ କରିବା ପାଇଁ ନୋଟଭେଦ ଆପ୍  ବିପ୍ଳବ ପରିବର୍ତ୍ତନ କରୁଛି | ଏହାର ଉପଭୋକ୍ତା-ଅନୁକୂଳ ଇଣ୍ଟରଫେସ୍ ଏବଂ ବିସ୍ତୃତ ମକ୍ ପରୀକ୍ଷଣ ସହିତ, ଏହି ଆପ୍ ଛାତ୍ର/ଛାତ୍ରୀମାନଙ୍କ ପାଇଁ ଏକ ମଜାଳିଆ ଏବଂ ଇଣ୍ଟରାକ୍ଟିଭ୍ ଅନୁଭୂତି କରିବାକୁ ତାଲାଷ୍ୟ ରଖିଛି | ଚାଲିଗଲାଣି ଦିନଗୁଡ଼ିକ ଚେତନାହୀନ ଭାବରେ ପାଠ୍ୟପୁସ୍ତକ ମାଧ୍ୟମରେ ଫ୍ଲପ୍ କରିବା କିମ୍ବା ବିରକ୍ତିକର ବକ୍ତୃତା ରେ ଯୋଗଦେବା | ନୋଟଭେଦ ପିଲାମାନଙ୍କୁ ଏକ ଆକର୍ଷଣୀୟ ଏବଂ ସୁବିଧାଜନକ  ସେମାନଙ୍କର ଜ୍ଞାନ ପରୀକ୍ଷା କରିବାକୁ ଅନୁମତି ଦେଇ ଶିକ୍ଷାକୁ ଜୀବନ୍ତ କରିଥାଏ | ନୋଟଭେଦ ଆପ୍ ର ଏକ ମୁଖ୍ୟ ବୈଶିଷ୍ଟ୍ୟ ହେଉଛି ଏହାର ପାଠ୍ୟକ୍ରମ ଅନୁଯାୟୀ ମକ୍ ପରୀକ୍ଷା | ଏହି ପରୀକ୍ଷଣଗୁଡିକ ପ୍ରତ୍ୟେକ ବିଷୟରୁ ସମସ୍ତ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ବିଷୟ ଏବଂ ଧାରଣାକୁ ଅନ୍ତର୍ଭୁକ୍ତ କରିଥାଏ, ପରବର୍ତ୍ତୀ ଅଧ୍ୟାୟକୁ ଯିବା ପୂର୍ବରୁ ଛାତ୍ରଛାତ୍ରୀଙ୍କ ପୁଙ୍ଖାନୁପୁଙ୍ଖ ବୁ ବୁଝିବା ନିଶ୍ଚିତ କରେ | ଆପ୍ ପ୍ରତ୍ୟେକ ପରୀକ୍ଷା ପରେ ବିସ୍ତୃତ ମତାମତ ପ୍ରଦାନ କରିଥାଏ, ଯେଉଁଠାରେ ଉନ୍ନତି ଆବଶ୍ୟକ ହୁଏ ସେହି ସ୍ଥାନଗୁଡିକୁ ଆଲୋକିତ କରେ | ଏହି ବ୍ୟକ୍ତିଗତ ପଦ୍ଧତି ପିଲାମାନଙ୍କୁ ସେମାନଙ୍କର ଦୁର୍ବଳ କ୍ଷେତ୍ର ଚିହ୍ନଟ କରିବାକୁ ଏବଂ ସେମାନଙ୍କ ଉପରେ ଫଳପ୍ରଦ ଭାବରେ କାର୍ଯ୍ୟ କରିବାକୁ ଅନୁମତି ଦିଏ | ଛାତ୍ରଛାତ୍ରୀମାନଙ୍କୁ ପରୀକ୍ଷା ପାଇଁ ଅଭ୍ୟାସ କରିବାରେ ସାହାଯ୍ୟ କରିବା ସହିତ, ନୋଟଭେଦ ଭିଡିଓ ଟ୍ୟୁଟୋରିଆଲ୍, ଷ୍ଟଡି ଗାଇଡ୍ ଏବଂ ଅଭ୍ୟାସ ବ୍ୟାୟାମ ଭଳି ସହାୟକ ଉତ୍ସ ମଧ୍ୟ ପ୍ରଦାନ କରିଥାଏ | ଏହା ବିଭିନ୍ନ ପ୍ରକାରର ଶିକ୍ଷାର୍ଥୀମାନଙ୍କୁ ଏକାଧିକ ନିର୍ଦ୍ଦେଶନାମା - ଭିଜୁଆଲ୍, ଅଡିଟୋରୀ, ଏବଂ କିନ୍ଥେଟିକ୍ ପ୍ରଦାନ କରି ଯୋଗାଇଥାଏ - ଯେଉଁଥିପାଇଁ ପ୍ରତ୍ୟେକ ପିଲା ଏକ ଶିକ୍ଷଣ ଶୈଳୀ ପାଇପାରିବେ ଯାହା ସେମାନଙ୍କ ପାଇଁ ସର୍ବୋତ୍ତମ ଅଟେ | ଭବିଷ୍ୟତରେ ଯୋଜନାବଦ୍ଧ ନିୟମିତ ଅଦ୍ୟତନ ଏବଂ ଯୋଡାଯାଇଥିବା ବୈଶିଷ୍ଟ୍ୟ ଗୁଡିକ ସହିତ, ନୋଟଭେଦ ଶୀଘ୍ର ଏକାଡେମିକ୍ ସଫଳତା ପାଇଁ ଚେଷ୍ଟା କରୁଥିବା ଛାତ୍ର/ଛାତ୍ରୀ ମାନଙ୍କ ପାଇଁ ଏକ ଅତ୍ୟାବଶ୍ୟକ ଉପକରଣରେ ପରିଣତ ହେଉଛି |`,
    },
    {
      title: `ନୋଟଭେଦ ଆପ୍ ପାଇଁ ସର୍ତ୍ତାବଳୀ `,
      content: `ନୋଟଭେଦ ଆପ୍ ବ୍ୟବହାର କରିବା ପାଇଁ ଏକ ପ୍ରମୁଖ ସର୍ତ୍ତ ଏବଂ ସର୍ତ୍ତଗୁଡିକ ହେଉଛି ଏହା କେବଳ ଶିକ୍ଷାଗତ ଉଦ୍ଦେଶ୍ୟ ପାଇଁ ଉଦ୍ଦିଷ୍ଟ | ଏହାର ଅର୍ଥ ହେଉଛି ଉପଭୋକ୍ତାମାନେ କୌଣସି ପ୍ରକାରେ ଆପର ଅପବ୍ୟବହାର କିମ୍ବା ଲାଭ ଉଠାଇବା ଉଚିତ୍ ନୁହେଁ | ପିଲାମାନଙ୍କୁ ଏହି ପାଠ୍ୟକ୍ରମରେ ମକ୍ ଟେଷ୍ଟ୍ ଅଭ୍ୟାସ କରିବା ପାଇଁ ଏକ ପ୍ଲାଟଫର୍ମ ଯୋଗାଇବା ପାଇଁ ଡିଜାଇନ୍ କରାଯାଇଛି, ସେମାନଙ୍କୁ ବିଭିନ୍ନ ବିଷୟ ଉପରେ ସେମାନଙ୍କର ଜ୍ଞାନ ଏବଂ କୌଶଳ ଉନ୍ନତି କରିବାରେ ସାହାଯ୍ୟ କରିଥାଏ | ଅନ୍ୟ ଏକ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ଶବ୍ଦ ଏବଂ ସର୍ତ୍ତ ହେଉଛି ଯେ ନୋଟଭେଦ ଆପ୍ ବ୍ୟବହାର କରିବା ସମୟରେ ଉପଭୋକ୍ତାମାନେ କରିବା ଉଚିତ୍ ନୁହେଁ | କୌଣସି ବେଆଇନ କାର୍ଯ୍ୟକଳାପରେ ନିୟୋଜିତ ହୁଅନ୍ତୁ କିମ୍ବା କ କପିରାଇଟ୍ କୌଣସି କପିରାଇଟ୍ ନିୟମ ଉଲ୍ଲଂଘନ କରନ୍ତୁ | ଆପରେ ଉପଲବ୍ଧ ସମସ୍ତ ବିଷୟବସ୍ତୁ, ଅଧ୍ୟୟନ ସାମଗ୍ରୀ, ପ୍ରଶ୍ନ, ଏବଂ ଉତ୍ତରଗୁଡିକ, ସଠିକ୍ ଭାବରେ ଲାଇସେନ୍ସପ୍ରାପ୍ତ କିମ୍ବା ନୋଟଭେଦର ମାଲିକାନା | ଏହି ବିଷୟବସ୍ତୁର କୌଣସି ଅନଧିକୃତ ବ୍ୟବହାର କିମ୍ବା ବଣ୍ଟନ ଆଇନଗତ ପରିଣାମ ସୃଷ୍ଟି କରିପାରେ | ଏହା ମଧ୍ୟ ଉଲ୍ଲେଖନୀୟ ଯେ ଏହି ସର୍ତ୍ତାବଳୀ ଏବଂ ସର୍ତ୍ତଗୁଡିକ ଗ୍ରହଣ କରି ଉପଭୋକ୍ତାମାନେ ସେମାନଙ୍କର ଆକାଉଣ୍ଟ୍ ସୂଚନା ଏବଂ ପାସୱାର୍ଡର ଗୋପନୀୟତା ବଜାୟ ରଖିବା ପାଇଁ ଦାୟୀ ହେବାକୁ ରାଜି ହୁଅନ୍ତି | ସେମାନେ ସେମାନଙ୍କର ଲଗଇନ୍ ପରିଚୟପତ୍ର ଅନ୍ୟମାନଙ୍କ ସହିତ ଅଂଶୀଦାର କରିବା ଉଚିତ୍ ନୁହେଁ କିମ୍ବା ବିନା ଅନୁମତିରେ ଅନ୍ୟ କାହାକୁ ସେମାନଙ୍କ ଆକାଉଣ୍ଟକୁ ପ୍ରବେଶ କରିବାକୁ ଅନୁମତି ଦେବା ଉଚିତ୍ ନୁହେଁ | ଏହା କରିବା ଦ୍ୱାରା, ସେମାନେ ସେମାନଙ୍କର ବ୍ୟକ୍ତିଗତ ତଥ୍ୟର ସୁରକ୍ଷା ଏବଂ ଗୋପନୀୟତା ଏବଂ ଆପ୍ ଢାଞ୍ଚାରେ ଅଗ୍ରଗତି ନିଶ୍ଚିତ କରିପାରିବେ |`,
    },
    {
      title: `ଉପଭୋକ୍ତା ଦାୟିତ୍ୱ ଏବଂ ସୀମା`,
      content: `ନୋଟଭେଦ ପରି ଏକ ଆପ୍ ବ୍ୟବହାର କରିବାବେଳେ, ଉପଭୋକ୍ତାମାନଙ୍କ ପାଇଁ, ବିଶେଷକରି ଯୁବକମାନଙ୍କ ପାଇଁ, ସେମାନଙ୍କର ଦାୟିତ୍  ଏବଂ ସୀମିତତା ବୁଝିବା ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ | ଯେତେବେଳେ ପିଲାମାନେ ପିଲାମାନଙ୍କ ପାଇଁ ପାଠ୍ୟକ୍ରମ ଅନୁଯାୟୀ ମକ୍ ପରୀକ୍ଷା ଅଭ୍ୟାସ କରିବା ଏବଂ ସେମାନଙ୍କର ଜ୍ଞାନ କୁ ବୃଦ୍ଧି କରେ ପାଇଁ ଏକ ପ୍ଲାଟଫର୍ମ ପ୍ରଦାନ କରନ୍ତି, ସେମାନେ ନିଶ୍ଚିତ ଭାବରେ ଏହାକୁ ଦାୟିତ୍ୱହୀନ ଭାବରେ ବ୍ୟବହାର କରିବେ | ଏକ ଶକ୍ତିଶାଳୀ ପାସୱାର୍ଡ ସୃଷ୍ଟି କରିବା ଏବଂ ଏହାକୁ କାହା ସହିତ ବାଣ୍ଟିବାକୁ ବାରଣ କରିବା ଅତ୍ୟନ୍ତ ଜରୁରୀ | ସାର୍ବଜନୀନ ନେଟୱାର୍କ କିମ୍ବା ଡିଭାଇସରେ ଆପକୁ ପ୍ରବେଶ କରିବା ସମୟରେ ଉପଭୋକ୍ତାମାନେ ମଧ୍ୟ ସତର୍କ ହେବା ଉଚିତ, ଯେହେତୁ ଏହା ସେମାନଙ୍କର ବ୍ୟକ୍ତିଗତ ସୂଚନାକୁ ସାଂଘାତିକ କରିପାରେ | ଦ୍ବିତୀୟତଃ, ଉପଭୋକ୍ତାମାନେ ଧ୍ୟାନ ଦେବା ଉଚିତ ଯେ ପାରମ୍ପାରିକ ଶିକ୍ଷାଗତ ପଦ୍ଧତିକୁ ବଦଳାଇବା ପରିବର୍ତ୍ତେ ଶିକ୍ଷଣ ପ୍ରୟାସକୁ ସପ୍ଲିମେଣ୍ଟ କରିବା ପାଇଁ ନୋଟଭେଦ ହେଉଛି ଏକ ଉପକରଣ | ପିଲାମାନେ ବୁଝିବା ଅତ୍ୟନ୍ତ ଜରୁରୀ ଯେ ଶ୍ରେଣୀଗୃହରେ ସକ୍ରିୟ ଅଂଶଗ୍ରହଣ ଏବଂ ଅଫଲାଇନ୍ ସାମଗ୍ରୀ ଅଧ୍ୟୟନ ଏକାଡେମିକ୍ ସଫଳତା ହାସଲ କରିବାରେ ସମାନ ମହତ୍ ପୂର୍ଣ ଅଟେ | ଶେଷରେ, ନୋଟଭେଦ ବ୍ୟବହାର କରିବା ଚିତ୍ତାକର୍ଷକ ଏବଂ ଆକର୍ଷଣୀୟ ହୋଇପାରେ, ଯେତେବେଳେ ସ୍କ୍ରିନ୍ ସମୟ ଆସେ ସେତେବେଳେ ଆତ୍ମ-ଶୃଙ୍ଖଳା ରହିବା ଆବଶ୍ୟକ | ଉପଯୋଗକର୍ତ୍ତାଗଣ କେବଳ ଏହି ଆପ୍ ଉପରେ ନିର୍ଭରଶୀଳ ହେବା ଉଚିତ୍ ନୁହେଁ ବରଂ ଏହା ବଦଳରେ ଅନ୍ୟାନ୍ୟ କାର୍ଯ୍ୟକଳାପ ଯେପରିକି ଶାରୀରିକ ବ୍ୟାୟାମ ଏବଂ ସାମାଜିକ ପାରସ୍ପରିକ କାର୍ଯ୍ୟକଳାପ ସହିତ ଏକ ସନ୍ତୁଳନ ସୃଷ୍ଟି କରିବା ଉଚିତ୍ | ନୋଟଭେଦ ପରି ଏକ ଶିକ୍ଷଣୀୟ ଆପ୍ ବ୍ୟବହାର ସହିତ ଜଡିତ ଏହି ଦାୟିତ୍ ଏବଂ ସୀମାବଦ୍ଧତାକୁ ଚିହ୍ନିବା ଦ୍ୱାରା, ଉପଭୋକ୍ତାମାନେ ଏହାର ସୁରକ୍ଷାକୁ ସାମ୍ନା ନକରି ଏହାର ଲାଭ ବୃଦ୍ଧି କରିପାରିବେ | କିମ୍ବା ସାମଗ୍ରିକ ଶିକ୍ଷଣ ଅଭିଜ୍ଞତା |,`,
    },
    {
      title: `ଗୋପନୀୟତା ନୀତି ଏବଂ ଡାଟା ସଂଗ୍ରହ`,
      content: `ପିତାମାତା ଏବଂ ଅଭିଭାବକମାନେ ନିଶ୍ଚିତ ହୋଇପାରିବେ ଯେ ନୋଟଭେଦ ଗୋପନୀୟତାକୁ ଗମ୍ଭୀରତାର ସହ ନେଇଥାଏ | ଯେତେବେଳେ ଏହାର ଯୁବ ଉପଭୋକ୍ତାମାନଙ୍କ ଠାରୁ ବ୍ୟକ୍ତିଗତ ସୂଚନା ସଂଗ୍ରହ କରିବାକୁ ଆସେ, ଆପ୍ କଡା ନିର୍ଦ୍ଦେଶାବଳୀ ଅନୁସରଣ କରେ | ଏହା ସୁନିଶ୍ଚିତ କରେ ଯେ ଏକ ନିରବିହୀନ ଶିକ୍ଷଣ ଅଭିଜ୍ଞତା ପ୍ରଦାନ ପାଇଁ କେବଳ ଆବଶ୍ୟକ ତଥ୍ୟ ସଂଗ୍ରହ କରାଯାଇଥାଏ, ଏବଂ ଏହି ସୂଚନା ସଠିକ୍ ସମ୍ମତି ବିନା ତୃତୀୟ ପକ୍ଷ ସହିତ କେବେବି ଅଂଶୀଦାର ହୁଏ ନାହିଁ | ନୋଟଭେଦ ରେ ଡାଟା ସଂଗ୍ରହ ମଧ୍ୟ ସାମଗ୍ରିକ ଉପଭୋକ୍ତା ଅଭିଜ୍ଞତାକୁ ଉନ୍ନତ କରିବାରେ ଏକ ପ୍ରମୁଖ ଭୂମିକା ଗ୍ରହଣ କରିଥାଏ | ପିଲାମାନେ ଆପ୍ ଏବଂ ସେମାନଙ୍କର ଶିକ୍ଷାଦାନ ଶୈଳୀ ସହିତ କିପରି କାର୍ଯ୍ୟ କରନ୍ତି ତାହା ବିଶ୍ଳେଷଣ କରି, ବିକାଶକାରୀମାନେ ବ୍ୟକ୍ତିଗତ ଆବଶ୍ୟକତାକୁ ଉନ୍ନତ କରିବା ପାଇଁ ଆବଶ୍ୟକ ସଂଶୋଧନ କରିପାରିବେ | ଏହାର ଅର୍ଥ ହେଉଛି ଯେ ଯେହେତୁ ପିଲାମାନେ ନୋଟଭେଦ ବ୍ୟବହାର କରି ମକ୍ ଟେଷ୍ଟ୍ ଅଭ୍ୟାସ କରନ୍ତି, ସେମାନେ କେବଳ ସେମାନଙ୍କର ଦକ୍ଷତାକୁ ତୀକ୍ଷ୍ଣ କରନ୍ତି ନାହିଁ ବରଂ ପରୋକ୍ଷରେ ଏକ ଅଧିକ ପ୍ରଭାବଶାଳୀ ଶିକ୍ଷଣ ପ୍ଲାଟଫର୍ମର ବିକାଶରେ ମଧ୍ୟ ଅବଦାନ ଦିଅନ୍ତି | ପରିଶେଷରେ, ଏକ ଶିକ୍ଷଣୀୟ ଆପ୍ ଆସିବାବେଳେ ଗୋପନୀୟତା ନୀତି ଏବଂ ତଥ୍ୟ ସଂଗ୍ରହ ହେଉଛି ମୁଖ୍ୟ ଚିନ୍ତା | ଟିପ୍ପଣୀ | ଆପ୍  ନିଆଯାଇଥିବା କଠୋର ପଦକ୍ଷେପ ନିଶ୍ଚିତ କରେ ଯେ ପିଲାମାନଙ୍କର ବ୍ୟକ୍ତିଗତ ସୂଚନା ସୁରକ୍ଷିତ ରହିଥାଏ ଏବଂ ତଥାପି ସେମାନଙ୍କର ଶିକ୍ଷଣ ଅଭିଜ୍ଞତାକୁ  ବୁଝିବା ପାଇଁ ମୂଲ୍ୟବାନ ଜ୍ଞାନ ପାଇଁ ଅନୁମତି ଦେଇଥାଏ | ଏକାଡେମିକ୍ ଅଭିବୃଦ୍ଧି ସହିତ ଗୋପନୀୟତାକୁ ପ୍ରାଧାନ୍ୟ ଦେଇ, ନୋଟଭେଦ ନିଜକୁ ଏକ ବିଶ୍ୱସ୍ତ ପ୍ଲାଟଫର୍ମ ଭାବରେ ପ୍ରମାଣ କରେ ଯେ ପାଠ୍ୟ-ଜ୍ଞାନ ମକ୍ ପରୀକ୍ଷଣ ମାଧ୍ୟମରେ ଅଭ୍ୟାସ ଖୋଜୁଥିବା ଯୁବ ଶିକ୍ଷାର୍ଥୀମାନଙ୍କ ପାଇଁ |`,
    },
    {
      title: `ଗୋପନୀୟତା ନୀତି`,
      content: `ତଥ୍ୟ ସଂଗ୍ରହ: ନୋଟଭେଦ ଆପ୍ ନିଶ୍ଚିତ କରେ ଯେ ଏହାର ସେବା ଯୋଗାଇବା ପାଇଁ କେବଳ ଆବଶ୍ୟକୀୟ ତଥ୍ୟ ସଂଗ୍ରହ କରାଯାଇଥାଏ | ଏଥିରେ ଉପଭୋକ୍ତା ପସନ୍ଦ, ଶିକ୍ଷଣ ଅଗ୍ରଗତି, ଏବଂ ମତାମତ ଅନ୍ତର୍ଭୁକ୍ତ | କୌଣସି ବ୍ୟକ୍ତିଗତ ଚିହ୍ନଟ ଯୋଗ୍ୟ ସୂଚନା ସ୍ପଷ୍ଟ ସମ୍ମତି ବିନା ସଂଗୃହିତ ହୁଏ |`,
    },
    {
      content: `ବ୍ୟବହାର ସୂଚନା: ନୋଟଭେଦ ବ୍ୟବହାର ସୂଚନା ସଂଗ୍ରହ କରିପାରେ ଯେପରିକି ଆପ୍ ବ୍ୟବହାରର ଅବଧି, ନିର୍ଦ୍ଦିଷ୍ଟ ବୈଶିଷ୍ଟ୍ୟ ଗୁଡିକର ଆକସେସ୍ ଫ୍ରିକ୍ୱେନ୍ସି, ଏବଂ ଉପଭୋକ୍ତା ଅଭିଜ୍ଞତାକୁ ଉନ୍ନତ କରିବା ଏବଂ ଆପର କାର୍ଯ୍ୟଦକ୍ଷତାକୁ ଅପ୍ଟିମାଇଜ୍ କରିବା ପାଇଁ ଡିଭାଇସ୍ ସୂଚନା |`,
    },
    {
      content: `ଡାଟା ଷ୍ଟୋରେଜ୍: ଅନାଧିକୃତ ପ୍ରବେଶ କିମ୍ବା ଡାଟା ଉଲ୍ଲଂଘନକୁ ରୋକିବା ପାଇଁ ଶିଳ୍ପ-ମାନକ ସୁରକ୍ଷା ବ୍ୟବସ୍ଥା ବ୍ୟବହାର କରି ଉପଭୋକ୍ତା ତଥ୍ୟ ନୋଟଭେଡର ସର୍ଭରରେ ସୁରକ୍ଷିତ ଭାବରେ ଗଚ୍ଛିତ ହୋଇଛି | ଆମେ କ୍ରେଡିଟ୍ କାର୍ଡ ବିବରଣୀ ପରି ସମ୍ବେଦନଶୀଳ ସୂଚନା ଗଚ୍ଛିତ କରୁନାହୁଁ |`,
    },

    {
      content: `ତୃତୀୟ-ପକ୍ଷ ସେବା: ନୋଟଭେଦ ଆନାଲିଟିକ୍ସ, ବିଜ୍ଞାପନ କିମ୍ବା ଦେୟ ପ୍ରକ୍ରିୟାକରଣ ପାଇଁ ତୃତୀୟ-ପକ୍ଷ ସେବା ବ୍ୟବହାର କରିପାରିବ | ଏହି ସେବାଗୁଡିକ କଠୋର ଗୋପନୀୟତା ନୀତି ମାନନ୍ତି, ଏବଂ ସେବା ପ୍ରଦାନ ପାଇଁ ଆବଶ୍ୟକ ସମୟରେ ଉପଭୋକ୍ତା ତଥ୍ୟ କେବଳ ସେମାନଙ୍କ ସହିତ ଅଂଶୀଦାର ହୁଏ |`,
    },
    {
      content: `ଡାଟା ସେୟାର୍: ବିନା ଅନୁମତିରେ ବିନା ମାର୍କେଟିଂ କିମ୍ବା ବିଜ୍ଞାପନ ଉଦ୍ଦେଶ୍ୟରେ ବ୍ୟବହାରକାରୀ ତଥ୍ୟ ତୃତୀୟ ପକ୍ଷ ସହିତ ଅଂଶୀଦାର ହୁଏ ନାହିଁ | ନୋଟଭେଦ ଉପଭୋକ୍ତା ଗୋପନୀୟତାକୁ ମୂଲ୍ୟ ଦେଇଥାଏ ଏବଂ ସୁନିଶ୍ଚିତ କରେ ଯେ ବ୍ୟକ୍ତିଗତ ସୂଚନା ଗୋପନୀୟ ରହିଥାଏ |`,
    },
    {
      content: `ପିତାମାତା ନିୟନ୍ତ୍ରଣ: ଆପ୍ ବ୍ୟବହାର କରୁଥିବା ପିଲାମାନଙ୍କର ସୁରକ୍ଷା ଏବଂ ଗୋପନୀୟତା ନିଶ୍ଚିତ କରିବାକୁ ନୋଟଭେଦ ପିତାମାତା ନିୟନ୍ତ୍ରଣ ପ୍ରଦାନ କରେ | ପିତାମାତାମାନେ ସେମାନଙ୍କର ପିଲାଙ୍କ କାର୍ଯ୍ୟକଳାପ ଉପରେ ନଜର ରଖିପାରିବେ ଏବଂ ସେହି ଅନୁଯାୟୀ ଗୋପନୀୟତା ସେଟିଂ ପରିଚାଳନା କରିପାରିବେ |
  `,
    },
    {
      content: `ଡାଟା ଏନକ୍ରିପସନ୍: ଆପ୍ ଏବଂ ସର୍ଭର ମଧ୍ୟରେ ଥିବା ସମସ୍ତ ଡାଟା ଟ୍ରାନ୍ସମିସନ୍ ବ୍ୟବହାରକାରୀଙ୍କ ଗୋପନୀୟତା ରକ୍ଷା କରିବାକୁ ଏନକ୍ରିପ୍ଟ ହୋଇଛି | ଏହି ଏନକ୍ରିପସନ୍ ସୁନିଶ୍ଚିତ କରେ ଯେ ସମ୍ବେଦନଶୀଳ ସୂଚନା ଅନଧିକୃତ ପ୍ରବେଶରୁ ସୁରକ୍ଷିତ ରହିଥାଏ |`,
    },
    {
      content: `ଅପ୍ଟ-ଆଉଟ୍ ଅପ୍ସନ୍ସ: ଆପ୍ ସେଟିଂସମୂହ ମଧ୍ୟରେ କିଛି ତଥ୍ୟ ସଂଗ୍ରହ ଅଭ୍ୟାସକୁ ଅପ୍ଟ-ଆଉଟ୍ କରିବାକୁ ଉପଭୋକ୍ତାଙ୍କର ବିକଳ୍ପ ଅଛି | ନୋଟଭେଦ ଡାଟା ଗୋପନୀୟତା ସମ୍ବନ୍ଧରେ ଉପଭୋକ୍ତା ପସନ୍ଦକୁ ସମ୍ମାନ କରେ ଏବଂ ଡାଟା ଅଂଶୀଦାର ପରିଚାଳନା ପାଇଁ ସହଜ-ବ୍ୟବହାର ନିୟନ୍ତ୍ରଣ ପ୍ରଦାନ କରେ |`,
    },
    {
      content: `ଡାଟା ଧାରଣ: ଏହି ଗୋପନୀୟତା ନୀତିରେ ବର୍ଣ୍ଣିତ ଉଦ୍ଦେଶ୍ୟ ପୂରଣ କରିବା ପାଇଁ କିମ୍ବା ଆଇନ ଅନୁଯାୟୀ ଆବଶ୍ୟକତା ଅନୁଯାୟୀ ନୋଟଭେଦ କେବଳ ଉପଭୋକ୍ତା ତଥ୍ୟକୁ ରଖେ | ଥରେ ଡାଟା ଆଉ ଆବଶ୍ୟକ ନହେବା ପରେ ଏହା ଆମ ସର୍ଭରରୁ ସୁରକ୍ଷିତ ଭାବରେ ଡିଲିଟ୍ ହୋଇଯାଏ |`,
    },
    {
      content: `ନୀତି ଅଦ୍ୟତନଗୁଡିକ: ଡାଟା ନିୟନ୍ତ୍ରଣ ଅଭ୍ୟାସ କିମ୍ବା ଆଇନଗତ ଆବଶ୍ୟକତାଗୁଡ଼ିକର ପରିବର୍ତ୍ତନକୁ ପ୍ରତିଫଳିତ କରିବା ପାଇଁ ନୋଟଭେଦ ଏହାର ଗୋପନୀୟତା ନୀତି ଅଦ୍ୟତନ କରିବାର ଅଧିକାର ସଂରକ୍ଷଣ କରେ | ଉପଯୋଗକର୍ତ୍ତାଗଣଙ୍କୁ କୌଣସି ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ପରିବର୍ତ୍ତନ ବିଷୟରେ ସୂଚିତ କରାଯିବ, ଏବଂ ଆପର କ୍ରମାଗତ ବ୍ୟବହାର ଅପଡେଟ୍ ପଲିସିର ଗ୍ରହଣୀୟ ହେବ |`,
    },
    {
      title: `ଫେରସ୍ତ ନୀତି`,
      content: `୧- ଥରେ “ପେ ଅନ୍ଲାଇନ୍” ମୋଡ୍ ବ୍ୟବହାର କରି କ୍ରୟ ହୋଇଗଲେ, ବାତିଲ୍ ଅନୁମତିପ୍ରାପ୍ତ ନୁହେଁ |ଆପଣ ଆମର ଅଧ୍ୟୟନ ସାମଗ୍ରୀର ସମସ୍ତ ପ୍ରିମିୟମ୍ ବୈଶିଷ୍ଟ୍ୟ ଗୁଡିକୁ ପ୍ରବେଶ କରିଥିବାରୁ କୌଣସି ଫେରସ୍ତ ପ୍ରଦାନ କରାଯିବ ନାହିଁ |`,
    },
    {
      content: `୨- ଯଦି ଏକ ଅନଲାଇନ୍ ଦେୟ ତ୍ରୁଟିରେ କରାଯାଇଥିଲା, ଦୟାକରି ଆମ ୱେବସାଇଟ୍ ରେ ତାଲିକାଭୁକ୍ତ “ଆମ ସହିତ ଯୋଗାଯୋଗ” ପୃଷ୍ଠା ମାଧ୍ୟମରେ ଆମର ସମର୍ଥନ କେନ୍ଦ୍ର ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ |`,
    },
    {
      content: `୩- ଅନୁମୋଦନ ପରେ 	୭-୧୦ ବ୍ୟବସାୟ ଦିନ ମଧ୍ୟରେ ଫେରସ୍ତ ପ୍ରକ୍ରିୟା କରାଯିବ |`,
    },
    {
      content: `୪- ଆମେ ଉତ୍ପାଦ କିମ୍ବା ସେବା ପାଇଁ ଆକ୍ସେସ୍ କିମ୍ବା ବ୍ୟବହୃତ ହୋଇଥିବା ଫେରସ୍ତ ଫେରସ୍ତ ପ୍ରଦାନ କରୁନାହୁଁ |`,
    },
    {
      title: `ଆମ ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ`,
      content: `ଆମର ଫେରସ୍ତ ଫେରସ୍ତ ନୀତି ସମ୍ବନ୍ଧରେ ଯଦି ଆପଣଙ୍କର କିଛି ପ୍ରଶ୍ନ କିମ୍ବା ଚିନ୍ତା ଅଛି, ଦୟାକରି ଆମ ୱେବସାଇଟରେ “ଆମ ସହିତ ଯୋଗାଯୋଗ” ପୃଷ୍ଠା ମାଧ୍ୟମରେ ଆମର ସମର୍ଥନ ଦଳକୁ ପହଞ୍ଚିବାକୁ ମୁକ୍ତ ମନ ଦିଅନ୍ତୁ |`,
    },
    {
      content: `ପୂର୍ବ ବିଜ୍ଞାପନ ବିନା ଯେ କୌଣସି ସମୟରେ ଏହି ଫେରସ୍ତ ଫେରସ୍ତ ନୀତିକୁ ଅଦ୍ୟତନ କିମ୍ବା ରୂପାନ୍ତର କରିବାର ଅଧିକାର ନୋଟଭେଦ ଏକାଡେମୀ ସଂରକ୍ଷିତ ରଖେ | କୌଣସି ପରିବର୍ତ୍ତନ ପାଇଁ ଦୟାକରି ଏହି ପୃଷ୍ଠାକୁ ପର୍ଯ୍ୟାୟକ୍ରମେ ଯାଞ୍ଚ କରନ୍ତୁ |`,
    },
  ];

  const agreement = [
    {
      title: `Overview of the NoteVed App`,
      content: `The NoteVed App is revolutionizing the way kids study and practice their course material. With its user-friendly interface and comprehensive mock tests, this app aims to make learning a fun and interactive experience for students. Gone are the days of mindlessly flipping through textbooks or attending boring lectures; NoteVed brings education to life by allowing children to test their knowledge in an engaging and convenient manner.One of the key features of the NoteVed App is its course-wise mock tests. These tests cover all the important topics and concepts from each subject, ensuring that students have a thorough understanding before moving on to the next chapter. The app provides detailed feedback after every test, highlighting areas where improvement is needed. This personalized approach allows kids to identify their weak areas and work on them effectively.In addition to helping students practice for exams, NoteVed also offers helpful resources such as video tutorials, study guides, and practice exercises. It caters to different types of learners by providing multiple methods of instruction – visual, auditory, and kinesthetic – so that every child can find a learning style that suits them best. With regular updates and added features planned in the future, NoteVed is quickly becoming an essential tool for students striving for academic success.`,
    },
    {
      title: `Terms and Conditions for NoteVed App`,
      content: `One of the key terms and conditions for using the NoteVed App is that it is solely intended for educational purposes. This means that users should not misuse or take advantage of the app in any way. The app has been designed to provide kids with a platform to practice course-wise mock tests, helping them improve their knowledge and skills in different subjects.Another important term and condition to be aware of is that while using the NoteVed App, users should not engage in any illegal activities or violate any copyright laws. All content available on the app, including study materials, questions, and answers, are properly licensed or owned by NoteVed. Any unauthorized use or distribution of this content can result in legal consequences.It is also noteworthy that by accepting these terms and conditions, users agree to be responsible for maintaining the confidentiality of their account information and password. They should not share their login credentials with others or allow anyone else to access their account without authorization. By doing so, they can ensure the security and privacy of their personal data and progress within the app's framework.`,
    },
    {
      title: `User Responsibilities and Limitations`,
      content: `When using an app like NoteVed, it is important for users, especially the young ones, to understand their responsibilities and limitations. While the app provides a platform for kids to practice course-wise mock tests and enhance their knowledge, they must use it responsibly.Firstly, users are responsible for maintaining the security of their account credentials. It is vital to create a strong password and refrain from sharing it with anyone. Users should also be cautious while accessing the app on public networks or devices, as these can potentially compromise their personal information.Secondly, users should note that NoteVed is a tool meant to supplement learning efforts rather than replace traditional educational methods entirely. It is crucial for kids to understand that active participation in classrooms and studying offline materials are equally significant in achieving academic success.Lastly, while using NoteVed can be entertaining and engaging, there must be self-discipline when it comes to screen time. Users should not become reliant solely on this app but instead strike a balance with other activities such as physical exercise and social interactions.By recognizing these responsibilities and limitations associated with utilizing an educational app like NoteVed appropriately, users can maximize its benefits without compromising their safety or overall learning experience.`,
    },
    {
      title: `Privacy Policy and Data Collection`,
      content: `Parents and guardians can rest assured knowing that NoteVed takes privacy seriously. The app follows strict guidelines when it comes to collecting personal information from its young users. It ensures that only the necessary data is collected for providing a seamless learning experience, and this information is never shared with third parties without proper consent.Data collection on NoteVed also plays a significant role in improving the overall user experience. By analyzing how children interact with the app and their learning patterns, developers can make necessary adjustments to cater better to individual needs. This means that as kids practice mock tests using NoteVed, they not only sharpen their skills but also indirectly contribute to the development of a more effective learning platform.In conclusion, Privacy Policy and Data Collection are paramount concerns when it comes to an educational app like NoteVed. The stringent measures taken by the app ensure that children's personal information remains secure while still allowing for valuable insights to enhance their learning experience. By prioritizing privacy alongside academic growth, NoteVed proves itself as a trusted platform for young learners seeking practice through course-wise mock tests.`,
    },
    {
      title: `Privacy Policy`,
      content: `Data Collection: NoteVed app ensures that only essential data required for providing its services is collected. This includes user preferences, learning progress, and feedback. No personally identifiable information is gathered without explicit consent.`,
    },
    {
      content: `Usage Information: NoteVed may collect usage information such as the duration of app usage, frequency of accessing certain features, and device information to improve user experience and optimize the app’s performance.`,
    },
    {
      content: `Data Storage: User data is securely stored on NoteVed’s servers using industry-standard security measures to prevent unauthorized access or data breaches. We do not store sensitive information such as credit card details.`,
    },

    {
      content: `Third-Party Services: NoteVed may utilize third-party services for analytics, advertising, or payment processing. These services adhere to strict privacy policies, and user data is only shared with them when necessary for providing the service.`,
    },
    {
      content: `Data Sharing: User data is never shared with third parties for marketing or advertising purposes without explicit consent. NoteVed values user privacy and ensures that personal information remains confidential.`,
    },
    {
      content: `Parental Controls: NoteVed offers parental controls to ensure the safety and privacy of children using the app. Parents can monitor their child’s activity and manage privacy settings accordingly.`,
    },
    {
      content: `Data Encryption: All data transmission between the app and servers is encrypted to safeguard user privacy. This encryption ensures that sensitive information remains protected from unauthorized access.`,
    },
    {
      content: `Opt-Out Options: Users have the option to opt-out of certain data collection practices within the app settings. NoteVed respects user preferences regarding data privacy and provides easy-to-use controls for managing data sharing.`,
    },
    {
      content: `Data Retention: NoteVed retains user data only for as long as necessary to fulfill the purposes outlined in this privacy policy or as required by law. Once data is no longer needed, it is securely deleted from our servers.`,
    },
    {
      content: `Policy Updates: NoteVed reserves the right to update its privacy policy to reflect changes in data handling practices or legal requirements. Users will be notified of any significant changes, and their continued use of the app will constitute acceptance of the updated policy.`,
    },
    {
      title: ` Refund Policy`,
      content: `1- Once a purchase is made using the “Pay Online” mode, cancellation is not permitted.No refunds will be issued as you have accessed all premium features of our study materials.`,
    },
    {
      content: `2- If an online payment was made in error, please contact our support center via the “Contact Us” page listed on our website.`,
    },
    {
      content: `3- Refunds will be processed within 7-10 business days upon approval.`,
    },
    {
      content: `4- We do not offer refunds for products or services that have been accessed or used.`,
    },
    {
      title: `Contact Us`,
      content: `If you have any questions or concerns regarding our refund policy, please feel free to reach out to our support team through the “Contact Us” page on our website.`,
    },
    {
      content: `Noteved Academy reserves the right to update or modify this refund policy at any time without prior notice. Please check this page periodically for any changes.`,
    },
  ];

  const agreeCondition = () => {
    if (checkForm == true) {
      //   const bodydata = {
      //     phone: phone,
      //   };
      // console.log(checkForm, 'checkForm///////////');
      //   dispatch(
      //     loginOtp(
      //       bodydata,
      //       () => {
      navigation.navigate('SignInPhoneScreen', {checkForm: true});
      //   },
      //   setshowprog,
      // ),
      //   );
    }
  };
  // const IsMobileScreenLandscapeMode =
  //   DeviceInfo.isTablet() == false && orientation.isPortait == false
  //     ? true
  //     : false;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#263d2d'} barStyle="light-content" />
      <ImageBackground
        style={{
          // borderRadius: 50,
          // borderWidth: 1,
          width: device_width,
          height: device_height,
          // borderRadius: 25,
          flex: 1,
          alignSelf: 'center',
          // justifyContent: 'center',
          // alignItems: 'center',
        }}
        resizeMode="cover"
        source={require('../../../assets/0.png')}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: Colors.secondary,
            marginBottom: 10,
          }}>
          <TouchableOpacity
            // onPress={() => goBackFunction()}
            onPress={() => navigation.goBack()}
            style={{paddingLeft: 10, position: 'absolute', left: 0}}>
            <MaterialIcons
              name="keyboard-arrow-left"
              size={30}
              // backgroundColor={Colors.secondary}
              color={'#fff'}
              // onPress={() => goBackFunction()}
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              color: '#fff',
              marginLeft: 10,
              textTransform: 'capitalize',
              fontWeight: '600',
            }}>
            {selectedLanguage == 'english'
              ? 'USER APP AGREEMENT'
              : 'ଉପଯୋଗକର୍ତ୍ତା ଆପ ଚୁକ୍ତିନାମା'}
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Animatable.View
            animation="fadeInUpBig"
            style={{
              minHeight: device_height,
              width: device_width,
              // margin: 0,
              paddingHorizontal: 10,
              //   paddingHorizontal: 30,
            }}>
            <View
              style={{
                backgroundColor: 'rgba(0,255,0,0.1)',
                borderRadius: 15,
                paddingTop: 20,
                paddingHorizontal: 10,
              }}>
              <View>
                {selectedLanguage == 'english' ? (
                  <>
                    {agreement.map((res, index) => {
                      const {title = '', content = ''} = res;

                      return (
                        <View key={index}>
                          <View>
                            {title ? (
                              <Text
                                style={{
                                  color: '#f1a722',
                                  fontSize: 17,
                                  fontWeight: '700',
                                  paddingLeft: 5,
                                }}>
                                {title}
                                {/* {`${index + 1}. ${title}`} */}
                              </Text>
                            ) : (
                              <></>
                            )}
                            <Text
                              style={{
                                color: '#dee',
                                fontSize: 15,
                                fontWeight: '600',
                                marginTop: title ? 10 : 0,
                                paddingLeft: 8,
                              }}>
                              {content}
                            </Text>
                            <Text></Text>
                          </View>
                        </View>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {agreementOdia.map((res, index) => {
                      const {title = '', content = ''} = res;

                      return (
                        <View key={index}>
                          <View>
                            {title ? (
                              <Text
                                style={{
                                  color: '#f1a722',
                                  fontSize: 17,
                                  fontWeight: '700',
                                  paddingLeft: 5,
                                }}>
                                {title}
                                {/* {`${index + 1}. ${title}`} */}
                              </Text>
                            ) : (
                              <></>
                            )}
                            <Text
                              style={{
                                color: '#dee',
                                fontSize: 15,
                                fontWeight: '600',
                                marginTop: title ? 10 : 0,
                                paddingLeft: 8,
                              }}>
                              {content}
                            </Text>
                            <Text></Text>
                          </View>
                        </View>
                      );
                    })}
                  </>
                )}
              </View>
            </View>
            {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              //   marginTop: 15,
            }}>
            <Checkbox
              status={checkForm ? 'checked' : 'unchecked'}
              onPress={() => {
                setCheckForm(!checkForm);
              }}
              color={Colors.primary}
              style={{backgroundColor: '#000'}}
            />

            <TouchableOpacity
              onPress={() => {
                setCheckForm(!checkForm);
              }}>
              <Text
                style={{
                  color: '#000',
                  // textDecorationLine: 'underline',
                  textAlign: 'center',
                  // borderWidth:3,
                  // borderColor:'red',
                  fontWeight: 'bold',
                  //   marginTop: 15,
                }}>
                Agree to terms and conditions{' '}
              </Text>
            </TouchableOpacity>
            <View>
              <TouchableOpacity>
                <Text
                  style={{
                    color: Colors.primary,
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginLeft: 10,
                    textDecorationLine: 'underline',
                  }}
                  onPress={() => agreeCondition()}>
                  {'Continue'}
                </Text>
              </TouchableOpacity>
            </View>
          </View> */}

            <View style={styles.button}>
              <TouchableOpacity
                style={styles.signIn}
                disabled={showprog}
                onPress={() => navigation.goBack()}>
                <LinearGradient
                  colors={['#f1a722', '#f1a722']}
                  style={styles.signIn}>
                  <Text
                    style={[
                      styles.textSign,
                      {
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignContent: 'center',
                        color: showprog ? '#999' : '#000',
                      },
                    ]}>
                    {showprog && (
                      <ActivityIndicator
                        size="small"
                        color={showprog ? '#999' : '#fff'}
                        style={{
                          alignSelf: 'center',
                          paddingRight: 5,
                          alignContent: 'center',
                        }}
                      />
                    )}
                    {selectedLanguage == 'english' ? 'Back' : 'ଫେରିଆସ'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animatable.View>

          {/* {showprog && (
          <ActivityIndicator
            style={{
              position: 'absolute',
              top: orientation.height / 2.8,
              left: orientation.width / 2.7,
            }}
            // isVisible={loading}
            size="large"
            // type={spinner_typ}
            color={spinner_color}
          />
        )} */}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default TermAndConditions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  // header: {
  //   flex: 1,
  //   justifyContent: 'flex-end',
  //   paddingHorizontal: 20,
  //   paddingBottom: 50,
  // },
  footer: {
    backgroundColor: '#f4f4f4',

    // paddingHorizontal: 50,
    // paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    backgroundColor: '#fff',
    paddingBottom: 5,
    borderRadius: 12,
    // paddingLeft: 10,
    height: 50,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : 0,
    // paddingLeft: 10,
    color: '#05375a',
    backgroundColor: '#fff',
  },
  textInput2: {
    color: '#0756bb',
    flexDirection: 'row',
    // alignItems:'center'
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  buttontwo: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  signIn: {
    width: '80%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
