import React from 'react';
import { StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useCustomStyle } from '../../Hook/Style/Style';

const CustomStatusBar = ({ backgroundColor, barStyle }) => {
    const isFocused = useIsFocused();
    const { isDark } = useCustomStyle();

    return isFocused ? (
        <StatusBar
            backgroundColor={backgroundColor}
            barStyle={barStyle || (isDark ? "light-content" : "dark-content")}
        />
    ) : null;
};

export default CustomStatusBar;
