import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import allScreen from '../../util/AllScreen/AllScreen'

const Stack = createNativeStackNavigator()

const MainNavigation = () => {
    return (
        <Stack.Navigator >
            {
                Array.isArray(allScreen) && allScreen.length > 0 &&
                allScreen?.map(
                    ({ name, component }, index) =>
                    (
                        <Stack.Screen key={name || index} name={name} component={component} options={{ headerShown: false, animation: "fade", animationDuration: 500, }} />
                    )
                )
            }
        </Stack.Navigator>
    )
}

export default MainNavigation
