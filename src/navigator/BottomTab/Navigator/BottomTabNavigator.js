import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { BottomScreen } from '../../../util/AllScreen/AllScreen';
import Icon from '../../../Component/Icon/Icon';
import AllColor from '../../../util/color/Color';
import { scale } from 'react-native-size-matters';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
        {Array.isArray(BottomScreen) && BottomScreen.length > 0 &&
            BottomScreen.map(({ name, component, iconCategory, icon }, index) => (
                <Tab.Screen
                    key={name || index}
                    name={name}
                    component={component}
                    options={{
                        tabBarIcon: ({ color, size, focused }) => (
                            <Icon IconCategoryName={iconCategory} IconName={icon} color={focused ? AllColor.Androidgreen : color} size={size} />
                        ),
                        tabBarLabelStyle: { fontWeight: 'bold' }
                    }}

                />
            ))}
    </Tab.Navigator>
);


export default BottomTabNavigator;
