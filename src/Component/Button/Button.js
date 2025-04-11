import { StyleSheet, Text, TouchableOpacity, } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import { useCustomStyle } from '../../Hook/Style/Style'
import Ripple from "react-native-material-ripple"
import { AllColor } from '../../Util/color/Color'

const Button =
    ({
        ButtonTitle, onPress, BtBackgroundColor, ButtonTitleColor,
        marginVertical, btnWidth, btnHeight, fontsize,
        marginLeft, marginRight, disabled, marginTop,
        marginBottom, borderradius, CborderColor, CborderWidth,
        CmarginHorizontal, CpaddingVertical, CpaddingHorizontal,
    }) => {
        // ------------custom Style------------
        const { CustomStyle, isDark } = useCustomStyle()
        return (
            <TouchableOpacity disabled={disabled} style={[styles.container,
            {
                backgroundColor: BtBackgroundColor ? BtBackgroundColor : CustomStyle.WhiteBackground,
                marginVertical: marginVertical ? marginVertical : scale(20),
                width: btnWidth ? btnWidth : undefined,
                height: btnHeight ? btnHeight : undefined,
                marginRight: marginRight ? marginRight : scale(0),
                marginLeft: marginLeft ? marginLeft : scale(0),
                marginTop: marginTop ? marginTop : scale(0),
                marginBottom: marginBottom ? marginBottom : scale(0),
                borderRadius: borderradius ? borderradius : scale(0),
                borderColor: CborderColor ? CborderColor : CustomStyle.WhiteBackground,
                borderWidth: CborderWidth ? CborderWidth : scale(0),
                marginHorizontal: CmarginHorizontal ? CmarginHorizontal : scale(0),
                paddingVertical: CpaddingVertical ? CpaddingVertical : undefined,
                paddingHorizontal: CpaddingHorizontal ? CpaddingHorizontal : undefined,
            }
            ]} onPress={() => {
                onPress()
            }}>
                <Text style={[styles.buttontitle,
                {
                    color: ButtonTitleColor ? ButtonTitleColor : CustomStyle.BlackColor,
                    fontSize: fontsize ? fontsize : scale(15)

                }
                ]}>{ButtonTitle}</Text>
            </TouchableOpacity>
        )
    }

export default Button

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttontitle: {
        fontWeight: "500",
    }
})