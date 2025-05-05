import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AllColor from '../../util/color/Color';
import { UserStorage } from '../../store/Store';
import { scale } from 'react-native-size-matters';
import Icon from '../../Component/Icon/Icon';
import { width } from '../../Hook/Style/Style';
import { resetAndNavigate } from '../../navigator/NavigationREF/NavigationRef';

const Profile = () => {
    const insets = useSafeAreaInsets()
    const name = UserStorage.getItem("name");
    const email = UserStorage.getItem("email");


    const HandleLogout = () => {
        UserStorage.clearAll();
        resetAndNavigate("Login");
    }


    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <StatusBar barStyle={"dark-content"}></StatusBar>

            <TouchableOpacity style={styles.logout_container} onPress={() => {
                HandleLogout();
            }}>
                <Icon IconCategoryName={"AntDesign"} IconName={"logout"} size={scale(30)} color={AllColor.black}></Icon>
            </TouchableOpacity>


            <View style={[styles.insideContainer]}>
                <Text>{"Name : "}</Text>
                <Text>{name}</Text>
            </View>

            <View style={[styles.insideContainer]}>
                <Text>{"Email : "}</Text>
                <Text>{email}</Text>
            </View>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AllColor.white
    },
    insideContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        paddingHorizontal: scale(20),
        paddingVertical: scale(3),
        marginVertical: scale(2),
        elevation: scale(1),
        backgroundColor: AllColor.white3,
    },
    logout_container: {
        width: width,
        paddingVertical: scale(10),
        paddingHorizontal: scale(10),
        marginBottom: scale(10),
    }
})