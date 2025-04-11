import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import Foundation from "react-native-vector-icons/Foundation";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Octicons from "react-native-vector-icons/Octicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Zocial from "react-native-vector-icons/Zocial";
import { scale } from "react-native-size-matters";


const Icon = ({ IconCategoryName, IconName, color, size, marginTop, CmarginVertical, CmarginHorizontal, CpaddingVertical, CpaddingHorizontal }) => {
    const iconProps =
    {
        name: IconName,
        size: size ? scale(size) : scale(25),
        color,
        marginTop: marginTop ? scale(marginTop) : undefined,
        marginVertical: CmarginVertical ? CmarginVertical : undefined,
        marginHorizontal: CmarginHorizontal ? CmarginHorizontal : undefined,
        paddingVertical: CpaddingVertical ? CpaddingVertical : undefined,
        paddingHorizontal: CpaddingHorizontal ? CpaddingHorizontal : undefined,
    };


    switch (IconCategoryName) {
        case "Fontisto": return <Fontisto {...iconProps} />;
        case "AntDesign": return <AntDesign {...iconProps} />;
        case "Entypo": return <Entypo {...iconProps} />;
        case "EvilIcons": return <EvilIcons {...iconProps} />;
        case "Feather": return <Feather {...iconProps} />;
        case "FontAwesome": return <FontAwesome {...iconProps} />;
        case "FontAwesome5": return <FontAwesome5 {...iconProps} />;
        case "FontAwesome6": return <FontAwesome6 {...iconProps} />;
        case "Foundation": return <Foundation {...iconProps} />;
        case "Ionicons": return <Ionicons {...iconProps} />;
        case "MaterialCommunityIcons": return <MaterialCommunityIcons {...iconProps} />;
        case "MaterialIcons": return <MaterialIcons {...iconProps} />;
        case "Octicons": return <Octicons {...iconProps} />;
        case "SimpleLineIcons": return <SimpleLineIcons {...iconProps} />;
        case "Zocial": return <Zocial {...iconProps} />;
        default: return null;
    }
};


export default Icon




