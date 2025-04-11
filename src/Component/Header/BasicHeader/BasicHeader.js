import { StyleSheet, View, TouchableOpacity, } from 'react-native'
import React from 'react'
import { useCustomStyle, width } from '../../../Hook/Style/Style'
import { scale } from 'react-native-size-matters'
import Icon from '../../Icon/Icon'
import { goBack } from '../../../navigator/NavigationREF/NavigationRef'
import AllColor from '../../../util/color/Color'

const BasicHeader = () => {
    return (
        <View style={[styles.container,]}>
            <TouchableOpacity onPress={() => {
                goBack()
            }}>
                <Icon IconCategoryName="AntDesign" IconName="back" color={AllColor.black}></Icon>
            </TouchableOpacity>
        </View>
    )
}

export default BasicHeader

const styles = StyleSheet.create({
    container: {
        width: width,
        paddingHorizontal: scale(10),
        paddingVertical: scale(5),
    }
})