import { Dimensions, StatusBar, useColorScheme } from "react-native"
import AllColor from "../../util/color/Color.js"

export const useCustomStyle = () => {
    const isDark = useColorScheme() === "dark"

    const CustomStyle = {
        BlackBackground: {
            backgroundColor: isDark ? AllColor.black : AllColor.white
        },
        WhiteColor: {
            color: isDark ? AllColor.white : AllColor.black
        },
        WhiteBackground: {
            backgroundColor: isDark ? AllColor.white : AllColor.black
        },
        BlackColor: {
            color: isDark ? AllColor.black : AllColor.white
        },
        BlackBorder: {
            borderColor: isDark ? AllColor.black : AllColor.white
        },
        WhiteBorder: {
            borderColor: isDark ? AllColor.white : AllColor.black
        },
        forTesting: {
            backgroundColor: isDark ? "rgba(138,43,226,0.3)" : AllColor.Cyan
        },
        grayColor: {
            color: isDark ? AllColor.gray : AllColor.gray
        },
        AndroidColor: {
            color: isDark ? AllColor.Androidgreen : AllColor.Androidgreen
        },
        grayBackground: {
            backgroundColor: isDark ? AllColor.gray : AllColor.gray
        },
        tintWhiteColor: {
            tintColor: isDark ? AllColor.white : AllColor.black
        },
        AndroidBackgroundColor: {
            backgroundColor: isDark ? AllColor.Androidgreen : AllColor.Androidgreen
        },
        redBackgroundColor: {
            backgroundColor: AllColor.red
        },
        grayBorder: {
            borderColor: AllColor.gray,
        },
        redColor: {
            color: AllColor.red
        },
    }

    return { CustomStyle }
}


export const height = Dimensions.get("screen").height
export const heightWindow = Dimensions.get("window").height
export const width = Dimensions.get("screen").width
export const widthWindow = Dimensions.get("window").width
// export const isDark = useColorScheme() === "dark"
// export const isWhite = useColorScheme() === "light"