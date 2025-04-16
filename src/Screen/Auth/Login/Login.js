import { Keyboard, StyleSheet, TouchableOpacity, View, StatusBar, Image, ActivityIndicator, } from 'react-native'
import React, { useState, } from 'react'
import Input from '../../../Component/Input/Input'
import { responsiveScreenWidth, responsiveFontSize, responsiveHeight, } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'
import Button from '../../../Component/Button/Button'
import { GestureHandlerRootView, PanGestureHandler, State, } from 'react-native-gesture-handler';
import CustomText from '../../../Component/Text/Text'
import { UserStorage } from '../../../store/Store'
import { navigate, resetAndNavigate } from '../../../navigator/NavigationREF/NavigationRef'
import { showToast } from '../../../util/helper/Helper'
import AllColor from '../../../util/color/Color'
import { validateLogin } from '../../../util/helper/validation/Validation'
import { useAuth } from '../../../Hook/Auth/useAuth'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { width } from '../../../Hook/Style/Style'
import AdBanner from '../../../Component/AdBanner/AdBanner'

const Login = () => {

    const { error, loading, userLogin } = useAuth()
    const insets = useSafeAreaInsets()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [gestureSequence, setGestureSequence] = useState([]);


    const handleGesture = ({ nativeEvent }) => {
        if (nativeEvent.state === State.END) {
            const { translationX, translationY } = nativeEvent;
            let direction = '';

            if (Math.abs(translationX) > Math.abs(translationY)) {

                direction = translationX > 0 ? 'right' : 'left';
            } else {
                direction = translationY > 0 ? 'down' : 'up';
            }

            const newSequence = [...gestureSequence, direction].slice(-5);
            setGestureSequence(newSequence);

            if (newSequence.join(' ') === 'up up down left right') {
                setGestureSequence([]);
                navigate('AdminLogin');
            }
        }
    };

    const handleLogin = async () => {
        if (!validateLogin(email, password, showToast)) {
            return;
        }
        const data = await userLogin(email, password)
        // styleConsole("🚀 ~ Login.js:85 ~ handleLogin ~ data:", "logindata", data)
        if (data.message === "Login successfully") {
            showToast('success', data.message, data.message)

            UserStorage.setItem("token", data.token)
            UserStorage.setItem("refresh_token", data.refresh_token)
            UserStorage.setItem("_id", data.user._id)
            UserStorage.setItem("name", data.user.name)
            UserStorage.setItem("email", data.user.email)
            UserStorage.setItem("isAdmin", data.user.isAdmin)
            UserStorage.setItem("verified", data.user.verified)

            setEmail('')
            setPassword('')
            Keyboard.dismiss()
            if (loading === false) {
                resetAndNavigate("BottomTabNavigator")
            }
        }
        // styleConsole("🚀 ~ handleLogin ~ data:", "login", data)
        if (data.errors) {
            showToast("error", data.errors[0].msg, data.errors[0].msg)
            Keyboard.dismiss()
        } else {
            showToast('error', data.message, data.message)
        }
    }

    return (
        <GestureHandlerRootView style={[styles.container, { paddingTop: insets.top }]}>
            <PanGestureHandler onHandlerStateChange={handleGesture}>
                {
                    loading === true ?
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                            <ActivityIndicator size={"large"} color={AllColor.black}></ActivityIndicator>
                            <AdBanner
                                containerStyle={{ position: "absolute", bottom: insets.bottom }}
                            ></AdBanner>
                        </View>
                        :
                        <View style={{ flex: 1, alignItems: 'center', }}>
                            <StatusBar barStyle={"dark-content"} backgroundColor={AllColor.white}></StatusBar>
                            <CustomText variant='h1' fontSize={responsiveFontSize(3.5)} style={{ fontWeight: 'bold', marginTop: scale(responsiveHeight(3)), }}>{"Login"}</CustomText>
                            <Image source={require("../../../util/image/login.png")} style={styles.logInImage}></Image>

                            {/* --------------input-------------- */}
                            <Input
                                IconCategoryName={"Fontisto"}
                                IconName={"email"}
                                placeholder={"Enter your Email"}
                                color={AllColor.Androidgreen}
                                placeholderTextColor={AllColor.gray}
                                InputHeader={"Email"}
                                size={scale(20)}
                                value={email}
                                keyboardType={"email-address"}
                                onChangeText={(text) => setEmail(text)}
                                inputColor={AllColor.black}
                            ></Input>
                            {/* ----------------password--------------------- */}
                            <Input
                                IconCategoryName={"Ionicons"}
                                IconName={"lock-closed-outline"}
                                placeholder={"Enter your Password"}
                                color={AllColor.Androidgreen}
                                placeholderTextColor={AllColor.gray}
                                InputHeader={"Password"}
                                size={scale(20)}
                                value={password}
                                keyboardType={"default"}
                                onChangeText={(text) => setPassword(text)}
                                inputColor={AllColor.black}
                                secureTextEntry={true}
                            ></Input>

                            {/* ---------login button--------- */}
                            <Button
                                BtBackgroundColor={AllColor.black}
                                ButtonTitle={"Login"}
                                ButtonTitleColor={AllColor.white}
                                marginTop={scale(25)}
                                onPress={() => { handleLogin() }}
                                CpaddingHorizontal={scale(10)}
                                CpaddingVertical={scale(5)}
                                btnWidth={responsiveScreenWidth(80)}
                                borderradius={scale(10)}
                            ></Button>

                            {/* ----------------------don't have account ------------------ */}
                            <View style={styles.dont_have_account_text_container}>
                                <View>
                                    <CustomText variant='h6' Color={AllColor.gray} >{"Dont' have an account"}</CustomText>

                                </View>
                                <TouchableOpacity onPress={() => {
                                    navigate("Signup")
                                }}>
                                    <CustomText variant='h6' Color={AllColor.Androidgreen} style={{ marginLeft: scale(3) }}>{"Signup "}</CustomText>
                                </TouchableOpacity>
                            </View>
                            <AdBanner
                                containerStyle={{ position: "absolute", bottom: insets.bottom }}
                            ></AdBanner>
                        </View>
                }
            </PanGestureHandler>
        </GestureHandlerRootView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AllColor.white
    },
    dont_have_account_text_container: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: scale(10),
        paddingHorizontal: scale(20)
    },
    logInImage: {
        width: width * 0.5,
        height: width * 0.5,
        resizeMode: "contain"
    },
    addContainer: {
        position: "absolute",
        bottom: scale(33)
    }
})


























