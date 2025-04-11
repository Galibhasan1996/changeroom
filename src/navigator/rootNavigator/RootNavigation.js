import React from 'react'
import { NavigationContainer } from "@react-navigation/native"
import MainNavigation from '../mainNavigator/MainNavigation'
import { navigationRef } from '../NavigationREF/NavigationRef'
const RootNavigation = () => {
    return (
        <>
            <NavigationContainer ref={navigationRef}>
                <MainNavigation></MainNavigation>
            </NavigationContainer>
        </>

    )
}

export default RootNavigation
