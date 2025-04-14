import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { resetAndNavigate } from '../../navigator/NavigationREF/NavigationRef'
import { showToast, styleConsole } from '../../util/helper/Helper'
import { UserStorage } from '../../store/Store'
import { jwtDecode } from 'jwt-decode'
import AllColor from '../../util/color/Color'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../Hook/Auth/useAuth'

const Splash = () => {
    const insets = useSafeAreaInsets()
    const { tokenRefresh, loading } = useAuth()


    const createRefreshToken = async (reToken) => {
        try {
            const data = await tokenRefresh(reToken)
            // styleConsole("🚀 ~ Splass.js:19 ~ createRefreshToken ~ data:", "createRefreshToken", data)

            UserStorage.setItem("token", data.token)
            UserStorage.setItem("refresh_token", data.refreshToken)

        } catch (error) {
            // console.log("🚀 ~ Splass.js:30 ~ createRefreshToken ~ error:", error)
            showToast("error", "Session expired", "Please log in again.");
            UserStorage.clearAll();
            resetAndNavigate("Login");
        }
    }
    const tokenCheck = async () => {
        const token = await UserStorage.getItem("token");
        const refresh_token = await UserStorage.getItem("refresh_token");


        if (!token || !refresh_token) {
            showToast("error", "Session expired", "Please log in again.");
            UserStorage.clearAll();
            resetAndNavigate("Login");
            return;
        }

        try {
            const { exp } = jwtDecode(token);
            const { exp: exp2 } = jwtDecode(refresh_token);
            const currentTime = Math.floor(Date.now() / 1000);


            if (exp2 < currentTime) {
                UserStorage.clearAll();
                showToast("error", "Your session has expired", "Please log in again.");
                resetAndNavigate("Login");
            } else if (exp < currentTime) {
                await createRefreshToken(refresh_token);
            } else {
                const isAdmin = await UserStorage.getItem("isAdmin");
                if (Boolean(isAdmin)) {
                    resetAndNavigate("AdminHome");
                } else {
                    resetAndNavigate("BottomTabNavigator");
                }
            }

        } catch (error) {
            UserStorage.clearAll();
            showToast("error", "Invalid session", "Please log in again.");
            resetAndNavigate("Login");
        }
    };


    useEffect(() => {
        const timer = setTimeout(() => {
            tokenCheck();
        }, 3000);

        return () => clearTimeout(timer)
    }, []);


    return (
        <>
            <StatusBar barStyle={"dark-content"}></StatusBar>
            <View style={[styles.container, { marginTop: insets.top }]}>
                <Image source={require("../../util/image/splass.png")} style={styles.splass_image}></Image>
                <Text style={[{ fontWeight: "900", fontSize: 30 }]}>{"Apna Change Room"}</Text>
            </View>
        </>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: AllColor.white
    },
    splass_image: {
        width: 300,
        height: 300,
    }
})
