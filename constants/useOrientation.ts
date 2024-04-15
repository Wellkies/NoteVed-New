import { useEffect, useState } from "react"
import { Dimensions } from "react-native"

export default useOrientation = () => {
    const [screenInfo, setSscreenInfo] = useState(Dimensions.get('screen'))

    useEffect(() => {
        const onChange = (result) => {
            setSscreenInfo(result.screen)
        }
        Dimensions.addEventListener('change', onChange)
        return () => Dimensions.removeEventListener('change', onChange)

    }, []);
return{
    ...screenInfo,
    isPortait:screenInfo.height >screenInfo.width
}
}