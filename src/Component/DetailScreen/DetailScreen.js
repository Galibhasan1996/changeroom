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
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';


const DetailScreen = ({ details, image, isLeft, data, type }) => {

    const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-7043280906751715/1316685164';



    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { marginTop: insets.top }]}>
            <StatusBar barStyle={"dark-content"}></StatusBar>

            {/* -----------------search icon---------------- */}
            {
                type === "preLocker" || type === "admin" || type === "preAdmin" ? null
                    :
                    <TouchableOpacity style={[styles.search_icon, { backgroundColor: AllColor.white7 }]} onPress={() => {
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

            <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.ADAPTIVE_BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
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
        marginTop: scale(20),
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
        borderBottomWidth: scale(1),
        borderBottomColor: AllColor.white7
    },
    search_icon: {
        position: "absolute",
        top: scale(10),
        right: scale(10),
        height: scale(40),
        width: scale(40),
        borderRadius: scale(20),
        alignItems: 'center',
        justifyContent: 'center',
    },
    ribbonContainer: {
        position: 'absolute',
        top: scale(400),
        left: -scale(-50),
        width: scale(250),
        backgroundColor: AllColor.rgbaRed,
        paddingVertical: scale(5),
        // paddingHorizontal: scale(50),
        transform: [{ rotate: '-45deg' }],
        zIndex: 999,
        borderRadius: scale(10),
        // elevation: scale(5),
    },

    ribbonText: {
        color: AllColor.white,
        fontWeight: '900',
        fontSize: scale(12),
        textAlign: 'center',
    },
});


