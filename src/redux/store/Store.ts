import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../reducers/demoReducers";
import userReducer from "../reducers/loginReducer";
import StudentData from "../reducers/StudentInfoReducer";
import StudentStandardData from "../reducers/StandardReducer";
import StudentBoardData from "../reducers/BoardReducer";
import setLanguage from "../reducers/languageReducer";
import SubjectData from "../reducers/GetSubjectByClassReducer";
import PremiumPurchaseData from "../reducers/GetPremiumPurchaseReducer";
import PremiumAccessData from "../reducers/GetPremiumAccessReducer";
import StudentCouponData from "../reducers/GetAvailableCouponOfferReducer";
import PreviousYearData from "../reducers/GetPrevYearQuesReducer";
import UnlockStudentData from "../reducers/GetUnlockChildReducer";
import TopicData from "../reducers/GetTopicBySubjectReducer";
import PreviousQuestionSetData from "../reducers/GetPrevYearSetReducer";
import MostProbableData from "../reducers/GetMostProbQuesReducer";
import MostProbableQuestionSetData from "../reducers/GetMostProbableQuestionSetReducer";
import RevisionChildData from "../reducers/GetChildRevisionReducer";
import TopicDetailsData from "../reducers/GetTopicDetailsFormTopicIdReducer";
import ContentQuizData from "../reducers/GetContentQuizReducer";
import StudentScholarshipData from "../reducers/GetAllScholarshipReducer";
import DailyFactData from "../reducers/GetDailyFactByDateReducer";
import handleSetExamName from "../reducers/ExamTestNameReducer";
import ZoomClassData from "../reducers/GetZoomClassReducer";
import TopStudentData from "../reducers/GetTopStudentReducer";
import ProbableTopStudentData from "../reducers/MostProbTopStudentReducer";
import NotificationData from "../reducers/GetFCMnotificationReducer";
import TopicIdData from "../reducers/GetTopicIdReducer";
import VerifyPhoneData from "../reducers/VerifyPhoneReducer";
import AllProductData from "../reducers/GetAllProductReducer";
import AllAddressData from "../reducers/GetAllAddressReducer";
import CartItemData from "../reducers/GetCartItemReducer";
import ProductDetailsData from "../reducers/GetProductDetailsReducer";
import DailyMessageData from "../reducers/GetDailyMessageByDateReducer";
import DeviceTokenData from "../reducers/GetDeviceTokenReducer";
import AddressDetailsData from "../reducers/GetAddressByIdReducer";
import OrderDetailsData from "../reducers/GetOrderDetailsReducer";
import AllOrdersData from "../reducers/GetAllOrdersReducer";
import ChildProgressableData from "../reducers/GetChildProgressReducer";
import YouTubeData from "../reducers/youtubeReducer";
import LiveclassData from "../reducers/GetLiveClassData";
import AllCoursesData from "../reducers/GetAllCoursesReducer";
import AllSubjectsData from "../reducers/GetSubjectByCourseReducer";
import TopicDetailsBySubData from "../reducers/GetTopicDetailsReducer";
import ContentDetailsData from "../reducers/GetContentDetailsReducer";
import AllMembershipDetailsData from "../reducers/GetAllMembershipReducer";
import AllSubjectLevelData  from "../reducers/GetAllSubjectLevelReducer";
import AllSubjectByCourseID from "../reducers/GetAllSubByCourseIdReducer";
import ChildProgressDetailData  from "../reducers/GetChildProgressDetailReducer";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    student: StudentData,
    standard: StudentStandardData,
    Board: StudentBoardData,
    Language: setLanguage,
    Subject: SubjectData,
    Topic: TopicData,
    Premiumpurchase: PremiumPurchaseData,
    PremiumAccess: PremiumAccessData,
    CouponData: StudentCouponData,
    PreviousYear: PreviousYearData,
    UnlockStudent: UnlockStudentData,
    PreviousQuestionSet: PreviousQuestionSetData,
    RevisionData: RevisionChildData,
    TopicDetails: TopicDetailsData,
    ContentData: ContentQuizData,
    MostProbable: MostProbableData,
    scholarship: StudentScholarshipData,
    MostProbableQuestionSET: MostProbableQuestionSetData,
    Topicdetails: TopicDetailsData,
    DailyFact: DailyFactData,
    ExamName: handleSetExamName,
    ZoomClass: ZoomClassData,
    PreviousYearTopStudent: TopStudentData,
    ProbableTopStudent: ProbableTopStudentData,
    Notification: NotificationData,
    SelectedTopic: TopicIdData,
    VerifyPhone: VerifyPhoneData,
    allProduct: AllProductData,
    Address: AllAddressData,
    Cart: CartItemData,
    ProductDetails: ProductDetailsData,
    DailyMessage: DailyMessageData,
    DeviceToken: DeviceTokenData,
    AddressByIdInfo: AddressDetailsData,
    allOrders: AllOrdersData,
    OrderByIdInfo: OrderDetailsData,
    YouTubeList: YouTubeData,
    ChildProgress: ChildProgressableData,
    LiveClassList: LiveclassData,
    Courses: AllCoursesData,
    Subjects: AllSubjectsData,
    TopicBySubDetails: TopicDetailsBySubData,
    ContentDetails: ContentDetailsData,
    AllMembershipDetails: AllMembershipDetailsData,
    AllSubjectLevelDetails: AllSubjectLevelData,
    AllSubByCourseIdDetails: AllSubjectByCourseID,
    ChildProgressData: ChildProgressDetailData,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
