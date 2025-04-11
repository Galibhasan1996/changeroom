import { StyleSheet, Text, View, } from 'react-native'
import React from 'react'
import { useCustomStyle, width } from '../../Hook/Style/Style'
import { scale } from 'react-native-size-matters'

const HeaderText = ({ text, MT, MV, MH, MB }) => {
    const { CustomStyle, isDark } = useCustomStyle()
    return (
        <View style={[styles.container, { marginTop: MT ? MT : scale(0), marginBottom: MB ? MB : scale(0), marginHorizontal: MH ? MH : scale(0), marginVertical: MV ? MV : scale(0) },]}>
            <Text style={[styles.login_text,]}>{text}</Text>
        </View>
    )
}

export default HeaderText

const styles = StyleSheet.create({
    container: {
        width: width,
    },
    login_text: {
        fontSize: scale(25),
        fontWeight: "bold",
        textAlign: "center",
    },
})