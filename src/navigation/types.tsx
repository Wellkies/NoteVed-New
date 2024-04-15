import { NavigationProp,useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./AppStack";

export const useAppNavigation =()=>{
    return useNavigation<NavigationProp<RootStackParamList>>()
}