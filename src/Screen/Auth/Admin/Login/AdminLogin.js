import { StatusBar, StyleSheet, TouchableOpacity, View, } from 'react-native'
import React, { useState, } from 'react'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'
import Button from '../../../../Component/Button/Button'
import Input from '../../../../Component/Input/Input'
import BasicHeader from '../../../../Component/Header/BasicHeader/BasicHeader'
import CustomText from '../../../../Component/Text/Text'
import { navigate } from '../../../../navigator/NavigationREF/NavigationRef'
import AllColor from '../../../../util/color/Color'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AdminLogin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const insets = useSafeAreaInsets()


    const handleLogin = () => {
        navigate("AdminHome")
    }



    return (
        <View style={[styles.container, { marginTop: insets.top }]}>
            <BasicHeader></BasicHeader>
            <StatusBar barStyle={"dark-content"}></StatusBar>
            <CustomText variant='h1' fontSize={30} style={{ fontWeight: 'bold', marginTop: scale(20), }}>{"Admin Login"}</CustomText>

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
                    navigate("AdminSignup")
                }}>
                    <CustomText variant={"h6"} Color={AllColor.Androidgreen} style={{ marginLeft: scale(3) }}>{"Admin Signup"}</CustomText>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default AdminLogin

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: AllColor.white
    },
    dont_have_account_text_container: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: scale(10),
        paddingHorizontal: scale(20)
    }
})



