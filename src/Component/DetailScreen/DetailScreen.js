import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, } from 'react-native';
import React from 'react';
import { height, width, widthWindow } from '../../Hook/Style/Style';
import { scale } from 'react-native-size-matters';
import Button from '../../Component/Button/Button';
import Icon from '../../Component/Icon/Icon';
import { navigate } from '../../navigator/NavigationREF/NavigationRef';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AllColor from '../../util/color/Color';
import { styleConsole } from '../../util/helper/Helper';
import AdBanner from '../AdBanner/AdBanner';


const DetailScreen = ({ details, image, isLeft, data, type }) => {

    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <StatusBar barStyle={"dark-content"}></StatusBar>

            {/* -----------------search icon---------------- */}
            {
                type === "preLocker" || type === "admin" || type === "preAdmin" ? null
                    :
                    <TouchableOpacity style={[styles.search_icon,]} onPress={() => {
                        navigate("SearchLocker")
                    }}>
                        <Icon IconCategoryName="Fontisto" IconName="search" color={AllColor.gray} size={scale(20)}></Icon>
                    </TouchableOpacity>
            }


            {/* ------------------ Detail Section ------------------- */}
            <View style={[styles.detail_container,]}>
                <View style={{ width: width, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={styles.image_Container}>
                        <Image source={image ? { uri: image } : require("../../util/image/holder.jpg")} style={styles.image}></Image>
                    </View>
                </View>
                {

                    details.map((item, index) => (
                        <View key={index} style={[styles.insideContainer, { marginBottom: index === details.length - 1 ? scale(20) : 0 }]}>
                            <Text style={{ fontWeight: "900" }}>{item.label}</Text>
                            <Text style={[{ color: ["Unit", "Name", "Date & Time"].includes(item.label) ? AllColor.red : AllColor.black, fontWeight: ["Unit", "Name"].includes(item.label) ? "900" : "900", },]}>{item.value}</Text>
                        </View>
                    ))
                }

                {isLeft && (
                    type === "admin" ? (
                        <View style={[styles.ribbonContainer, { width: widthWindow * 0.7, top: scale(335), left: -scale(-40) }]}>
                            <Text style={styles.ribbonText}>LEFT</Text>
                        </View>
                    ) : (
                        <View style={styles.ribbonContainer}>
                            <Text style={styles.ribbonText}>LEFT</Text>
                        </View>
                    )
                )}

            </View>
            {/* ------------------ button Section` ------------------- */}

            {
                type === "preLocker" || type === "preAdmin" ? null
                    :
                    <Button
                        ButtonTitle={"Update"}
                        btnWidth={width * 0.8}
                        btnHeight={height * 0.03}
                        ButtonTitleColor={AllColor.white}
                        BtBackgroundColor={AllColor.black}
                        borderradius={scale(10)}
                        marginTop={scale(10)}
                        onPress={() => {
                            if (type === "allLocker") {
                                navigate("UpdateLocker", { item: data, })
                            }
                            if (type === "admin") {
                                navigate("AdminUpdate", { item: data, })
                            }
                        }}
                    ></Button>
            }
            <AdBanner
                containerStyle={{ position: "absolute", bottom: insets.bottom }}
            ></AdBanner>

        </View>
    );
};

export default DetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AllColor.white
    },
    image_Container: {
        width: scale(200),
        height: scale(200),
        borderRadius: scale(200) / 2,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderWidth: scale(1),
        borderColor: AllColor.Androidgreen,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: scale(200) / 2,
    },
    detail_container: {
        width: "100%",
        marginTop: scale(10),
    },
    insideContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        paddingHorizontal: scale(20),
        paddingVertical: scale(5),
        marginVertical: scale(2),
        elevation: scale(1),
        backgroundColor: AllColor.white3
    },
    search_icon: {
        position: 'absolute',
        top: height * 0.05,
        right: width * 0.05,
        width: width * 0.12,
        height: width * 0.12,
        borderRadius: scale(20),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: AllColor.white7
    },
    ribbonContainer: {
        position: 'absolute',
        top: height * 0.49,
        left: width * 0,
        width: width * 0.9,
        backgroundColor: AllColor.rgbaRed,
        paddingVertical: scale(5),
        transform: [{ rotate: '-45deg' }],
        zIndex: 999,
        borderRadius: scale(10),
    },

    ribbonText: {
        color: AllColor.white,
        fontWeight: '900',
        fontSize: scale(12),
        textAlign: 'center',
    },
});


