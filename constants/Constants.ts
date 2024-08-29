import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePicker from "@react-native-community/datetimepicker";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useState} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
// import Colors from '../assets/Colors';
import moment from 'moment';
// import Geolocation, {
//   GeolocationResponse,
// } from "@react-native-community/geolocation";
import {
  DeviceEventEmitter,
  Dimensions,
  PixelRatio,
  Platform,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
// import ImgToBase64 from 'react-native-image-base64';
// based on iphone 5s's scale

export const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
export const phoneRegexWithout91 = /^([6-9][0-9]{9})$/;
export const password_regex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,16}$/;

// export const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
// export const name_reg = /^[A-Za-z]{2,}$/;
export const name_reg = /^[A-Za-z . ']{2,}$/;

export const zip_regex = /^\d{6}(?:[-\s]\d{4})?$/;
export const ageRegex = /^(?:[1-9][0-9]?|100)$/;

export const IsTabScreen = DeviceInfo.isTablet() ? true : false;
export const IsMobileScreen = DeviceInfo.isTablet() == false ? true : false;

export const getPatientId = async () => {
  // const userData = JSON.parse(localStorage.getItem("userInfo"));
  // const userData = await AsyncStorage.getItem('userInfo');
  let userData = {};
  await AsyncStorage.getItem('userInfo').then(data => {
    userData = JSON.parse(data);
  });
  //console.log(userData, 'userData');
  if (Object.keys(userData).length > 0) {
    const {patientid = ''} = userData;
    //console.log(patientid, 'patientid');
    return patientid;
  } else {
    return '';
  }
};
export const getLoggedInUserId = async () => {
  // const userData = JSON.parse(localStorage.getItem("userInfo"));
  let userData = {};
  await AsyncStorage.getItem('userInfo').then(data => {
    userData = JSON.parse(data);
  });
  //console.log(userData, 'userData');
  if (Object.keys(userData).length > 0) {
    const {_id = ''} = userData;
    //console.log(_id, 'id');
    return _id;
  } else {
    return '';
  }

  // const userData = await AsyncStorage.getItem('userInfo');
  // //console.log(userData, 'userData');
  // if (userData._id !== null) {
  //   // return userData._id;
  // } else {
  //   return '';
  // }
};

// export const token =  localStorage.getItem("accessToken");
export const authHeader = async () => {
  try {
    let tokenVal = '';
    await AsyncStorage.getItem('userToken').then(data => {
      if (data !== null) {
        tokenVal = data;
        // console.log(data, '=====getUserToken');
      }
    });
    const tokenData = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenVal}`,
      },
    };
    // console.log(tokenData, 'tokenData');
    if (tokenVal != '') return tokenData;
    else return null;
  } catch (error) {
    // Error retrieving data
    // console.log(error,'=====getUserToken_error');
  }
};

export const multiPartHeader = async () => {
  try {
    let tokenVal = '';
    await AsyncStorage.getItem('userToken').then(data => {
      if (data !== null) {
        tokenVal = data;
        // console.log(data, '==========getUserToken');
      }
    });
    const tokenData = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${tokenVal}`,
      },
    };
    // console.log(tokenData, 'tokenData');
    if (tokenVal != '') return tokenData;
    else return null;
  } catch (error) {
    // Error retrieving data
    console.log(error, '=====getUserToken_error');
  }
};
// export const DateField = ({
//   dateValue,
//   setDateFunc,
//   setErrorFunc,
//   label,
//   mode,
//   is24HourFormat = true,
//   style,
//   isDisabledFlag = false,
//   minDate = "",
//   maxDate = "",
//   callBack,
//   isDobFlag = false,
// }) => {
//   const [showDateModal, setShowDateModal] = useState(false);
//   const onDateChange = (event, selectedDate) => {
//     const currentDate = selectedDate || dateValue;

//     setShowDateModal(false);
//     setDateFunc(currentDate);
//     setErrorFunc(false);
//     if (callBack) callBack();

//     // // const currentDate = selectedDate || date;

//     // setShow(Platform.OS === "ios");

//     // if (event.type == "set") {
//     //   //ok button
//     //   setDateFunc(currentDate);
//     //   //  setDate(currentDate)
//     // } else {
//     //   //cancel Button
//     //   setDateFunc(null);
//     // }
//   };

//   const getFormattedDate = (date) => {
//     if (mode === "time") {
//       //console.log(new Date(date).toLocaleTimeString('en-US'),'date time');
//       // return new Date(date).toLocaleTimeString("en-US");
//       // return moment(date).format("hh:mm a")
//       let timeVal = new Date(date).toLocaleTimeString("en-US");
//       return moment(timeVal, "hh:mm:ss A").format("hh:mm A");
//     } else {
//       if (date) {
//         console.log(date, "============== inside if", moment(date).isValid());
//         if (moment(date).isValid()) {
//           return moment(date).format("DD/MM/yyyy");
//         }
//         // var month = date.getMonth() + 1;
//         // var day = date.getDate();
//         // var year = date.getFullYear();
//         // return day + "/" + month + "/" + year;
//         // return new Date(date).toDate("en-US");
//       } else {
//         console.log(moment().format("DD/MM/yyyy"), "==============inside else");
//         if (moment(date).isValid()) {
//           return moment(date).format("DD/MM/yyyy");
//         } else {
//           return moment().format("DD/MM/yyyy");
//         }
//         // const temp_date = new Date();
//         // var month = temp_date.getMonth() + 1;
//         // var day = temp_date.getDate();
//         // var year = temp_date.getFullYear();
//         // return day + "/" + month + "/" + year;
//       }
//     }
//   };
//   return (
//     <>
//       <TouchableOpacity
//         onPress={() => setShowDateModal(true)}
//         disabled={isDisabledFlag}
//       >
//         <View
//           style={{
//             paddingLeft: 4,
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//         >
//           <Text style={[style, { color: "#999" }]}>
//             {dateValue ? getFormattedDate(dateValue) : label}
//           </Text>
//           {mode === "time" ? (
//             <AntDesign
//               name="clockcircleo"
//               size={20}
//               style={{ color: "#898989", fontSize: 18, paddingHorizontal: 20 }}
//             />
//           ) : (
//             <FontAwesome5
//               name="calendar-alt"
//               style={{ color: "#898989", fontSize: 18, paddingHorizontal: 20 }}
//               size={20}
//             />
//           )}
//         </View>
//       </TouchableOpacity>
//       {showDateModal && (
//         <DateTimePicker
//           color={"#999"}
//           textColor={"#999"}
//           // accentColor={Colors.primary}
//           testID="dateTimePicker"
//           value={
//             dateValue
//               ? new Date(dateValue)
//               : isDobFlag
//               ? new Date(maxDate)
//               : new Date()
//           }
//           mode={mode ? mode : "date"}
//           is24Hour={is24HourFormat}
//           display="default"
//           onChange={onDateChange}
//           // onFocus={onDateChange}
//           minimumDate={minDate != "" ? minDate : null}
//           maximumDate={maxDate != "" ? maxDate : null}
//           // View=['year','month','day']
//         />
//       )}
//     </>
//   );
// };
// //console.log(getUserToken(),'UserToken')
// export const authHeader=
export const getUserdata = async () => {
  let userData = '';
  await AsyncStorage.getItem('userInfo').then(data => {
    userData = JSON.parse(data);
  });
  return userData;
};

export const getCurrentDay = () => {
  const Day = moment().format('dddd');
  return Day;
};
export const daySort = unordered => {
  const sorted = unordered.sort((a, b) => {
    const dateA = moment(a.days, 'dddd').weekday();
    const dateB = moment(b.days, 'dddd').weekday();
    if (dateA > dateB) {
      return 1; // return -1 here for DESC order
    }
    return -1; // return 1 here for DESC Order
  });

  return sorted;
};

export const getCurrentDateTime = (
  date = new Date(),
  format = 'YYYY-MM-DD HH:mm:ss',
) => {
  // //console.log(date, format, 'dateobj');
  let check = moment(date, format);
  const month = check.format('MM');
  // //console.log(month, 'month=======');
  const day = check.format('DD');
  // //console.log(day, 'day=======');
  const year = check.format('YYYY');
  // //console.log(year, 'year=======');
  const hour = check.format('HH');
  // //console.log(hour, 'hour=======');
  const minute = check.format('mm');
  // //console.log(minute, 'minute=======');
  const dateTime = new Date(year, month - 1, day, hour, minute, 0);
  // //console.log(month, day, year, hour, minute, 'dateobj');
  // //console.log(date, 'date=======');
  // const dateTime =
  //   moment().format('YYYY-MM-DD') + 'T' + moment().format('HH:mm:ss') + 'Z';
  return dateTime;
};

export const handleDateSorting = (data, key_name) => {
  const sorted = data.sort((a, b) => {
    const dateA = new Date(`${a[key_name]}`).valueOf();
    const dateB = new Date(`${b[key_name]}`).valueOf();
    if (dateA > dateB) {
      return 1; // return -1 here for DESC order
    }
    return -1; // return 1 here for DESC Order
  });

  return sorted;
};
export const upgradetimeformat = time => {
  const strTime = new Date(time).toLocaleTimeString('en-US');
  return strTime;
};

export const changeTimeFormat = visit_time => {
  let splitdata = visit_time.split(':');
  if (splitdata.length == 3) {
    return moment(visit_time, 'HH:mm:ss').format('hh:mm A');
  } else if (visit_time.search('T') !== -1) {
    visit_time = moment(upgradetimeformat(visit_time), 'HH:mm A').format(
      'hh:mm A',
    );
  } else {
    return visit_time;
  }
};

export const changeIsoDateToLocaldate = dateString => {
  // const dateString = "2023-03-22T11:00:00.000Z";
  const date = new Date(Date.parse(dateString));
  const updatedate = date.toLocaleString();
  return updatedate;
};

export const changeIsoTimeToLocalTime = time => {
  const timeData = moment(upgradetimeformat(time), 'HH:mm A').format('hh:mm A');
  return timeData;
};

export const dayLists = isUpcoming => {
  let dataList = [];
  for (let i = isUpcoming ? 1 : 0; i < 30; i++) {
    let rec = {
      day: moment().add(i, 'days').format('ddd'),
      fullDay: moment().add(i, 'days').format('dddd'),
      no_of_appointments: 0,
      date: moment().add(i, 'days').format('Do '),
      month: moment().add(i, 'days').format('MMM'),
      fullDate: moment().add(i, 'days').format('DD/MM/YYYY'),
    };
    dataList.push(rec);
  }
  // console.log(dataList, 'dataList================');
  return dataList;
};

export const dateSlotMore = () => {
  let dataList = [];
  for (let i = 0; i < 30; i++) {
    let rec = {
      date: moment().add(i, 'days').format('MMM Do YY'),
      days: moment().add(i, 'days').format('dddd'),
      isSelected: false,
    };

    dataList.push(rec);
  }
  // console.log(dataList, 'dateSlotMore================');
  return dataList;
};

export const pickerHour = () => {
  let hourList = [];
  for (let i = 0; i < 24; i++) {
    let hour = {
      label: i,
      value: i * 60,
    };

    hourList.push(hour);
  }
  // console.log(hourList, 'hourList================');
  return hourList;
};

export const pickerMinute = () => {
  let minuteList = [];
  for (let i = 0; i < 60; i++) {
    let minute = {
      label: i,
      value: i,
    };

    minuteList.push(minute);
  }
  // console.log(minuteList, 'minuteList================');
  return minuteList;
};

export const handlePhoneNumber = phoneVal => {
  let confirmVal = '';
  if (phoneVal.length > 10) {
    let data = phoneVal.slice(0, 3);
    let data2 = phoneVal.slice(0, 2);
    let data3 = phoneVal.slice(0, 1);
    if (data == '+91') {
      confirmVal = phoneVal.slice(3, 13);
    } else if (data2 == '91') {
      confirmVal = phoneVal.slice(2, 12);
    } else if (data3 == '0') {
      confirmVal = phoneVal.slice(1, 11);
    }
  } else {
    confirmVal = phoneVal;
  }
  return confirmVal;
};

export const markCalculation = quiz => {
  let no_of_Attempts = 0;
  let correctanswer = 0;
  let Skipped = 0;
  let Wronganswer = 0;
  const totalmark = quiz?.length;
  let percentage = 0;
  quiz?.map((item, index) => {
    const {selectedAns: userAnswer = '', answer: answerVal = ''} = item;
    let answer = answerVal.toLowerCase(); //To convert Lower Case
    let selectedAns = userAnswer.toLowerCase(); //To convert Lower Case
    if (selectedAns != '' && selectedAns == answer) {
      correctanswer += 1;
    }
    if (selectedAns != '') {
      no_of_Attempts += 1;
    } else {
      Skipped += 1;
    }
    if (selectedAns != '' && selectedAns !== answer) {
      Wronganswer += 1;
    }
  });
  // console.log(correctanswer , quiz.length,"=================correctanswer /////+++---\\\\ quiz.length");
  percentage =
    correctanswer != 0 ? ((correctanswer / quiz?.length) * 100).toFixed(1) : 0;
  if (quiz?.length < 10 && percentage >= 80 && percentage < 90) {
    percentage = 90;
  }
  // Math.round((correctanswer / quiz.length) * 100) : 0;

  return {
    no_of_Attempts,
    correctanswer,
    Skipped,
    Wronganswer,
    totalmark,
    percentage,
  };
};
export const prevmarkCalculation = quiz => {
  let no_of_Attempts = 0;
  let correctanswer = 0;
  let Skipped = 0;
  let Wronganswer = 0;
  const totalmark = quiz.length;
  let percentage = 0;
  quiz.map((item, index) => {
    const {selectedAns: userAnswer = '', answer: answerVal = ''} = item;
    let answer = answerVal.toLowerCase(); //To convert Lower Case
    let selectedAns = userAnswer.toLowerCase(); //To convert Lower Case
    if (selectedAns != '' && selectedAns == answer) {
      correctanswer += 1;
    }
    if (selectedAns != '') {
      no_of_Attempts += 1;
    } else {
      Skipped += 1;
    }
    if (selectedAns != '' && selectedAns !== answer) {
      Wronganswer += 1;
    }
  });
  // percentage =
  //   correctanswer != 0 ? Math.round((correctanswer / quiz.length) * 100) : 0;

  percentage =
    correctanswer != 0 ? ((correctanswer / quiz.length) * 100).toFixed(1) : 0;
  if (quiz.length < 10 && percentage >= 80 && percentage < 90) {
    percentage = 90;
  }
  return {
    no_of_Attempts,
    correctanswer,
    Skipped,
    Wronganswer,
    totalmark,
    percentage,
  };
};

export const remainingTimerdata = remainingTime => {
  // console.log(remainingTime, 'remainingTime=======');
  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;
  // console.log(`${hours}:${minutes}:${seconds}`);
  return `${hours}:${minutes}:${seconds}`;
};

export const handlesubjectData = (quiz, isScoreFlag) => {
  let quizList = [...quiz];
  let subjectiddata = [];
  let subjectArray = [];
  let subjectid = '';
  quizList.map(rec => {
    if (rec.subjectid !== subjectid) {
      subjectid = rec.subjectid;
      subjectiddata.push(rec.subjectid);
    }
  });
  let uniqueArray = [...new Set(subjectiddata)];

  uniqueArray.map(row => {
    let filterdata = quizList.filter(rec => rec.subjectid == row);
    if (filterdata.length > 0) {
      subjectArray.push({
        subjectName: filterdata.length ? filterdata[0].subjectname : '',
        questionLength: filterdata.length,
        questionList: filterdata,
        scoreResult: {},
      });
    }
  });
  if (isScoreFlag) {
    subjectArray = subjectArray.map(item => {
      const scoreResult = markCalculation(item.questionList);
      return {...item, scoreResult: scoreResult};
    });
  }
  // console.log(subjectArray, 'subjectArray=====');
  return subjectArray;
};
