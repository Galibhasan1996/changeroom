import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { resetAndNavigate } from '../../navigator/NavigationREF/NavigationRef'
import { showToast } from '../../util/helper/Helper'
import { UserStorage } from '../../store/Store'
import { jwtDecode } from 'jwt-decode'
import AllColor from '../../util/color/Color'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Splash = () => {
    const insets = useSafeAreaInsets()
    const tokenCheck = async () => {
        const token = await UserStorage.getItem("token");
        const isAdmin = await UserStorage.getItem("isAdmin");


        if (!token) {
            showToast("error", "Session expired", "Please log in again.");
            UserStorage.clearAll();
            resetAndNavigate("Login");
            return;
        }

        try {
            const { exp } = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000);


            if (exp < currentTime) {
                UserStorage.clearAll();
                showToast("error", "Your session has expired", "Please log in again.");
                resetAndNavigate("Login");
            } else {
                if (Boolean(isAdmin)) {
                    resetAndNavigate("AdminHome");
                } else {
                    resetAndNavigate("BottomTabNavigator");
                }
            }
        } catch (error) {
            // Handle invalid token format
            UserStorage.clearAll();
            showToast("error", "Invalid session", "Please log in again.");
            resetAndNavigate("Login");
        }
    };



    useEffect(() => {
        setTimeout(() => {
            tokenCheck()
        }, 3000);
    }, [])

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
