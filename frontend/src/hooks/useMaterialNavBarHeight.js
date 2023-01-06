
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const useMaterialNavBarHeight = (withoutBottomTabs) => {
    const { bottom, top } = useSafeAreaInsets();
    //console.log(Platform.OS +" bottom " + bottom)
    //console.log(Platform.OS +" top " + top)
    return withoutBottomTabs ? 0 : (bottom + 54)
}


export default useMaterialNavBarHeight;

