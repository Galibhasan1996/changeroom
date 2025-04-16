import { StyleSheet, View, Keyboard, ActivityIndicator, Image } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { useSafeAreaInsets, } from 'react-native-safe-area-context';
import AllColor from '../../util/color/Color';
import { useAuth } from '../../Hook/Auth/useAuth';
import { styleConsole } from '../../util/helper/Helper';
import Input from '../../Component/Input/Input';
import _ from 'lodash';
import { height, width } from '../../Hook/Style/Style';
import { scale } from 'react-native-size-matters';
import { navigate } from '../../navigator/NavigationREF/NavigationRef';
import { useFocusEffect } from '@react-navigation/native';
import GenericTableCard from '../../Component/GenericTableCard/GenericTableCard';
import CustomText from '../../Component/Text/Text';
const PreLocker = () => {
    const insets = useSafeAreaInsets()
    const [data, setdata] = useState([]);
    // styleConsole("🚀 ~ PreLocker.js:12 ~ PreLocker ~ data:", "prelocker", data)


    const { pregetAllLocker, loading } = useAuth()
    const [search, setSearch] = useState("");


    const debouncedSearch = useCallback(
        _.debounce(async (search) => {
            try {
                let data;
                if (search.trim() === "") {
                    data = await pregetAllLocker();
                } else {
                    data = await pregetAllLocker(search);
                }
                setdata(data);
            } catch (error) {
                console.log("🚀 ~ PreLocker.js:34 ~ _.debounce ~ error:", error)
            }
        }, 500),
        []
    );


    useFocusEffect(
        useCallback(() => {
            debouncedSearch(search);
        }, [])
    );

    useEffect(() => {
        debouncedSearch(search);
        return () => {
            debouncedSearch.cancel();
        };
    }, [search,]);

    return (
        <View style={[styles.container, { marginTop: insets.top }]}>
            <Input
                IconName={"locker-multiple"}
                IconCategoryName={"MaterialCommunityIcons"}
                InputHeader={"Search Locker"}
                keyboardType={"phone-pad"}
                color={AllColor.Androidgreen}
                placeholder={"Search by Locker No (e.g., 123)"}
                placeholderTextColor={AllColor.gray}
                size={20}
                value={search}
                onChangeText={setSearch}
                inputColor={AllColor.black}
                LeftIconCategoryName={"AntDesign"}
                LeftIconName={"closecircleo"}
                LeftIcon={search !== "" ? true : false}
                LeftIconSize={scale(20)}
                LeftIconOnClick={() => {
                    setSearch("")
                    Keyboard.dismiss()
                }}
            ></Input>

            {
                loading ?
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                        <ActivityIndicator size={"large"} color={AllColor.black}></ActivityIndicator>
                    </View>
                    :
                    <View style={[styles.container1,]}>

                        {/* Scrollable List */}
                        <>
                            {
                                data?.lockers?.length > 0 ?
                                    <GenericTableCard
                                        data={data.lockers}
                                        headers={['Locker No', 'Code', "Name", "Unit", 'Mobile', 'Department', 'Status',]}
                                        getItemFields={(item) => [
                                            item.locker_no,
                                            item.code,
                                            item.name,
                                            item.unit,
                                            item.mobile,
                                            item.department,
                                            item.status,
                                        ]}
                                        onRowPress={(item) => {
                                            navigate("GenericDetailScreen", { item, type: "preLocker" });
                                        }}
                                        imageKey={true}
                                        paddingBottom={scale(120)}
                                    />
                                    :
                                    <View style={{ width: width, height: height, alignItems: 'center', justifyContent: 'center', }}>
                                        <Image source={require('../../util/image/not.png')} style={styles.not_image}></Image>
                                        <CustomText Color={AllColor.black} variant='h2' style={{ textAlign: "center", }}>{"No Pre-Locker Found ! "}</CustomText>
                                    </View>
                            }
                        </>
                    </View>
            }

        </View>
    )
}

export default PreLocker

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AllColor.white
    },
    container1: {
        width: width,
    },
    not_image: {
        width: width * 0.5,
        height: width * 0.5,
    }
})