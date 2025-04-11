import { StatusBar, StyleSheet, View, } from 'react-native'
import React, { useState, } from 'react'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'
import CustomText from '../../../Component/Text/Text'
import { useRoute } from '@react-navigation/native'
import AllColor from '../../../util/color/Color'
import { showToast } from '../../../util/helper/Helper'
import { resetAndNavigate } from '../../../navigator/NavigationREF/NavigationRef'
import { useAuth } from '../../../Hook/Auth/useAuth'
import Button from '../../../Component/Button/Button'
import { width } from '../../../Hook/Style/Style'
import OTPInput from '../../../Component/otp/OTP'
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const Otp = () => {
    const [OTP, setOTP] = useState("");
    const insets = useSafeAreaInsets()


    const { email } = useRoute()?.params || {};

    const { varifyOTP } = useAuth()



    const handleLogin = async () => {
        try {
            if (OTP === "") {
                showToast("error", "Please enter your otp", " otp is required")
                return
            }
            const res = await varifyOTP(email, OTP)
            console.log("🚀 ~ Otp.js:37 ~ handleLogin ~ res:", res)


            if (res.message === "User verified successfully") {
                showToast("success", res.message, res.message);
                resetAndNavigate("Login")
            } else {
                showToast('error', res.error, res.error);
            }
        } catch (error) {
            console.log("🚀 ~ Otp.js:44 ~ handleLogin ~ error:", error)
        }
    }



    return (
        <View style={[styles.container, { marginTop: insets.top }]}>
            <View style={{ flex: 1 }}>
                <StatusBar barStyle={"dark-content"}></StatusBar>
                <View style={{ width: width, alignItems: 'center', }}>
                    <CustomText variant='h1' fontSize={30} style={{ fontWeight: 'bold', marginTop: scale(20), }}>{"Varify OTP"}</CustomText>
                </View>

                <OTPInput length={6} onComplete={(otp) => { setOTP(otp) }}></OTPInput>

                {/* ---------otp button--------- */}
                <Button
                    BtBackgroundColor={AllColor.black}
                    ButtonTitle={"Varify"}
                    ButtonTitleColor={AllColor.white}
                    marginTop={scale(25)}
                    onPress={() => { handleLogin() }}
                    CpaddingHorizontal={scale(10)}
                    CpaddingVertical={scale(5)}
                    btnWidth={responsiveScreenWidth(80)}
                    borderradius={scale(10)}
                ></Button>
            </View>

        </View>
    )
}

export default Otp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: AllColor.white
    },
})


