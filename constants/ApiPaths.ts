// export const API_URL = "https://wellkie.in/demoApi/";
export const API_URL = 'https://wellkie.org/demoApi/'; // Test url

// export const API_URL = 'https://wellkies.org/demoApi/'; // production url
// export const API_URL = 'https://notevook.com/demoApi/'; // productsion url


export const LOGIN_SEND_OTP_URL = API_URL + 'loginotp';
export const VERIFY_LOGIN_OTP_URL = API_URL + 'parentlogin';
export const LOGIN_USING_EMAIL_URL = API_URL + 'childloginusingemail';

export const GET_PARENT_INFO_URL = API_URL + 'getParentbyid/';
export const REGISTER_PARENT_URL = API_URL + 'registerParent';
export const UPDATE_PARENT_API = API_URL + 'updateparent';
export const DELETE_PARENT_URL = API_URL + 'deleteParent';

export const GET_CHILD_INFO_URL = API_URL + 'getchildbychildid/';
export const GET_CHILDS_BY_PARENT_URL = API_URL + 'getchildbyparentid/';
export const REGISTER_CHILD_URL = API_URL + 'registerChild';
export const UPDATE_CHILD_API = API_URL + 'updatechild';
export const DELETE_CHILD_URL = API_URL + 'deletechild';

//===============================NEW PROJECT================================//
export const EDZ_REGISTER_NEW_CHILD_URL = API_URL + 'edzcreateChild';
export const EDZ_PHONE_NUM_VERIFY_URL = API_URL + 'edzphoneNumbercheck/';
export const EDZ_LOGIN_WITH_PASSWORD_URL =
  API_URL + 'edzchildlogiusingpassword';
export const GET_CHILD_DETAILS_URL = API_URL + 'edzgetChildbyid/';
export const GET_ALL_COURSES_URL = API_URL + 'getCourse';
export const GET_ALL_SUBJECTS_BY_COURSE_URL = API_URL + 'getAllsubject';
// export const GET_TOPICS_BY_SUBJECTID_URL = API_URL + 'getTopicbysubjectid/';
export const GET_TOPICS_BY_SUBJECTID_URL =
  API_URL + 'getTopicbysubjectidandchildid/';
export const GET_CONTENT_BY_TOPICID_URL = API_URL + 'edzgetContentbytopicid/';
export const GET_ALL_CHILD_CONTENT_URL = API_URL + 'edzgetAllchildContent/';
export const EDZ_ANSWER_SUBMIT_URL = API_URL + 'edzcreatechildcontent';
export const EDZ_UPDATE_CHILD_API = API_URL + 'edzupdateChild';
export const EDZ_GET_ALL_MEMBERSHIP = API_URL + 'edzgetAllmembership';
export const GET_ALL_SUBJECT_LEVELS = API_URL + 'getAllsubjectlevels';
export const GET_ALL_SUBJECT_BY_COURSEID = API_URL + 'getAllSubjectbycourseid';
export const GET_CHILD_PROGRESS_DETAILS = API_URL +'edzgetChildProgressDetails/';
//=========================================================================//

export const GET_CHILD_PROGRESS_URL = API_URL + 'getChildonProgressDetils/';

export const GET_ANSWER_BY_SUBMIT_URL = API_URL + 'postchildcontent';

export const GET_REATTEMPT_ANSWER_BY_SUBMIT_URL =
  API_URL + 'edzupdatechildcontent';

export const ALL_SUBJECT_EXAM_URL = API_URL + 'getalledContent';

export const GET_SUBJECTS_BY_CLASS_API = API_URL + 'getallsubjectbyclass/';

export const GET_QUIZ_BY_FCM_QUIZID_API =
  API_URL + 'getedfcmmessagebyfcmquizid/';

export const GET_TOPIC_BY_CLASS_SUB_API = API_URL + 'getalltopicbyclasssub/';

export const GET_TOPIC_DETAILS_API = API_URL + 'getalltopicdetailsbytopicid/';

export const UPDATE_USERLIKE_API = API_URL + 'updateedcontent';

export const GET_BOARD_API = API_URL + 'allBoard';

export const GET_STANDARD_API = API_URL + 'allclassStandard';

export const GET_SUBSCRIPTION_API = API_URL + 'edsubscription';

export const GET_SIGNATURE_VERIFICATION_API =
  API_URL + 'edsignatureverification';

export const COUPON_DISCOUNT_FOR_PRODUCT_URL =
  API_URL + 'couponocdediscountforproduct';

export const GET_SCHOLARSHIP_URL = API_URL + 'getscholarshipbystageidboardid/';

export const CREATE_CONTACT_URL = API_URL + 'createedContact';

export const GET_PREV_YEAR_QUES_URL =
  API_URL + 'getedPreviousYearQuestionSetsbyclsidandbrdidwithchildata/';

export const GET_PREV_YEAR_QUESTION_SET_URL =
  API_URL + 'getedPreviousYearQuestionsetbyyearid/';

export const GET_PROBABLE_QUES_URL =
  API_URL + 'getedmostprobaquestionSetsbyclsidandbrdid/';

export const GET_CHILD_PROBABLE_QUES_DETAILS_URL =
  API_URL + 'getchildmostprobablequestiondetails/';

export const CREATE_FCM_TOKEN_URL = API_URL + 'createedfcmToken';
export const CREATE_FCM_TOKEN_WITH_DEVICE_URL =
  API_URL + 'createedfcmTokenwithdeviceid';

export const UPLOAD_PHOTO_URL = API_URL + 'uploadFile';
export const DELETE_PHOTO_URL = API_URL + 'deletefile/';
export const GET_APP_VERSION_URL = API_URL + 'getedappversion';

export const ADD_REVIEW_FEEDBACK_URL = API_URL + 'addedreview/';
export const GET_STUDENT_REVIEW_URL = API_URL + 'getedreviewbychildid/';
export const GET_EMERGENCY_MSG_URL = API_URL + 'getedemergencymessage/';

export const CREATE_ADDRESS_URL = API_URL + 'createedUserDeliveryadress';
export const DELETE_USER_ADDRESS_URL = API_URL + 'deleteedUserAdress/';
export const UPDATE_USER_ADDRESS_URL = API_URL + 'updateedUserAdress';
export const GET_USER_ADDRESS_BY_CHILD_URL =
  API_URL + 'geteduseradressbyuserid/';
export const GET_ADDRESS_BY_ID_URL = API_URL + 'getedadressById/';
export const CREATE_CHILD_ORDER_URL = API_URL + 'addedchildOrders';
// export const GET_DAILY_FACT_BY_DATE_URL=API_URL+'geteddailyfactbydate/';
export const GET_DAILY_FACT_BY_DATE_URL = API_URL + 'geteddailyfactbydatenew/';

export const CREATE_MANY_CHILD_ORDER_URL = API_URL + 'addedchildOrdersmany';

export const GET_LICENSE_SCHOLARSHIP =
  API_URL + 'getlicensebystageidscholarshipid';

export const GET_SUBMIT_PREVIOUS_YEAR_QUESTION =
  API_URL + 'createchildpreviousyearquestiondetails';

export const SUBMIT_FCM_QUIZ_ANSWER_URL = API_URL + 'createedchildfcmquiz';

export const GET_ALL_FCM_QUIZ_URL = API_URL + 'getedchildfcmquizbychildid';

export const SUBMIT_SUBJECTWISE_PREVIOUS_YEAR_QUESTION =
  API_URL + 'createedChildSubjectwisePreviouseYearQuestionSets';

export const GET_SUBMIT_PROBABLE_QUESTION =
  API_URL + 'createchildmostprobablequestiondetails';

export const SUBMIT_SUBJECTWISE_PROBABLE_QUESTION =
  API_URL + 'createedChildSubjectwisemostprobablequestionsets';

export const GET_PREVIOUS_YEAR_REATTEMPT_ANSWER_BY_SUBMIT_URL =
  API_URL + 'reattemptchildpreviousyearquestion';

export const REATTEMPT_ANSWER_SUBMIT_SUBJECTWISE_PREVIOUS_YEAR_QUESTION =
  API_URL + 'updateedChildSubjectwisePreviouseYearQuestionSets';

export const GET_PROBABLE_REATTEMPT_ANSWER_BY_SUBMIT_URL =
  API_URL + 'reattemptchildmostprobablequestion';

export const REATTEMPT_ANSWER_SUBMIT_SUBJECTWISE_PROBABLE_URL =
  API_URL + 'updateedChildSubjectwisemostprobablequestionsets';

export const GET_MOST_PROBABLE_QUESTION_SET_URL =
  API_URL + 'getedmostprobaquestionSetsbyclsidandbrdidandchilid';

export const GET_SCHOLARSHIP_PREMIUM_URL =
  API_URL + 'getedchildmembershipbychildidandparentid';

export const CREATE_SCHOLARSHIP_MEMBERSHIP_URL =
  API_URL + 'addedchildmembership';

export const REGISTER_NEW_CHILD_URL = API_URL + 'registerChild';
export const LOGIN_CHILD_OTP_VERIFY_URL = API_URL + 'childotplogin';
export const CHILD_PHONE_NUM_VERIFY_URL = API_URL + 'edchildphone/';
export const LOGIN_WITH_PASSWORD_URL = API_URL + 'childloginusingpassword';

/////////////////////////////////////
export const CREATE_ZOOM_URL =
  API_URL + 'getedzoomdetailsbyscholarshipidstageidboardid';

export const REGISTER_LIVECLASS_URL = API_URL + 'updateedzoomdetails';

export const GET_PREV_YEAR_TOP_STUDENT_URL =
  API_URL + 'highestsecuremarkchildpreviousyearquestion/';
export const GET_MOST_PROB_TOP_STUDENT_URL =
  API_URL + 'highestsecuremarkchildmostprobaquestion/';

export const CREATE_USER_DEVICE_DETAILS_URL =
  API_URL + 'createedUserDeviceDetails';
export const COUPONCODE_DISCOUNT_URL = API_URL + 'couponocdediscount';
export const GET_AVAILABLE_COUPONCODE_URL = API_URL + 'getedcouponcode';
export const GET_CONTENT_QUIZ_URL = API_URL + 'getedContentQuiz/';
export const GET_REVISION_ANSWER_URL =
  API_URL + 'getedContentQuizwithchilddata';
export const GET_APP_NOTIFICATION_FCM_MESSAGE_URL =
  API_URL + 'getAlledchildfcmmessage';
export const GET_APP_NOTIFICATION_URL = API_URL + 'getedfcmmessageApp';
export const UPDATE_FCM_MESSAGE_URL = API_URL + 'updateedchildfcmmessage';
export const GET_ALL_RECORDCLASS_URL =
  API_URL + 'getedrecordedclassbyidfilterbysubjects';
export const GET_ALL_PRODUCT_CATEGORY_URL = API_URL + 'getAllproductCategory';
export const GET_ALL_PRODUCT_URL = API_URL + 'getAlledProducts';
export const GET_PRODUCT_BY_NAME_URL = API_URL + 'getedProductbyName';
export const GET_PRODUCT_BY_CATEGORY_ID_URL =
  API_URL + 'getedProductsbycategoryid';
export const GET_PRODUCT_BY_ID_URL = API_URL + 'getedproductById/';
export const CREATE_ADD_TO_CART_URL = API_URL + 'createedProductAddtocart';
export const REMOVE_FROM_CART_URL = API_URL + 'deleteedproductAddtoCart';
export const DELETE_ALL_FROM_CART_URL = API_URL + 'deleteedallproductAddtoCart';
export const GET_CART_ITEM_URL = API_URL + 'getedproductAddtoCartByuserid';
export const UPDATE_CART_ITEM_URL = API_URL + 'updateedproductAddtoCart';
export const GET_CHILD_ORDERS_BY_CHILDID_URL =
  API_URL + 'getedchildOrdersbychildidandpaymentid/';
export const GET_ORDER_DETAILS_URL = API_URL + 'getedchildOrdersbyorderid/';
// export const DELETE_USER_URL=API_URL+'deletechild';
export const DELETE_USER_URL = API_URL + 'createeddeleteAccount';
export const GET_CHILD_REVISION_DETAILS_URL =
  API_URL + 'gettopicompletewithchild';
export const ADD_CHILD_REVISION_URL = API_URL + 'edzaddchildrevisiondetails';

export const CREATE_CHILD_ABOVE_90_PERCENTAGE_BSE_URL =
  API_URL + 'edWatipercentchildodia';
export const CREATE_CHILD_ABOVE_90_PERCENTAGE_OTHER_URL =
  API_URL + 'edWatichildscorecard';
export const CREATE_CHILD_BELOW_90_PERCENTAGE_BSE_URL =
  API_URL + 'edWatilesspercentchildodia';
export const CREATE_CHILD_BELOW_90_PERCENTAGE_OTHER_URL =
  API_URL + 'edWatilessmark';
export const GET_CHILD_UNLOCK_URL = API_URL + 'getedchildunlock';
export const GET_DAILY_MESSAGE_BY_DATE_URL =
  API_URL + 'geteddailymessagebydate';
export const GET_CHECK_TOKEN_URL = API_URL + 'checkToken';
