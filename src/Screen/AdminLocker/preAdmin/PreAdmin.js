import { ActivityIndicator, Image, Keyboard, StyleSheet, View, Text } from 'react-native'
import React, { useState, useEffect, useCallback, } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../../Hook/Auth/useAuth';
import { useFocusEffect } from '@react-navigation/native';
import { scale } from 'react-native-size-matters'
import AllColor from '../../../util/color/Color';
import Input from '../../../Component/Input/Input';
import _ from 'lodash';
import GenericTableCard from '../../../Component/GenericTableCard/GenericTableCard';
import { navigate } from '../../../navigator/NavigationREF/NavigationRef';

const PreAdmin = () => {
    const inset = useSafeAreaInsets();
    const { preGetAdminLocker, loading } = useAuth()
    const [data, setdata] = useState([]);
    const [search, setSearch] = useState("");


    const debouncedSearch = useCallback(
        _.debounce(async (search) => {
            try {
                let data;
                if (search.trim() === "") {
                    data = await preGetAdminLocker();
                } else {
                    data = await preGetAdminLocker(search);

                }
                setdata(data);
            } catch (error) {
                console.log("🚀 ~ PreAdmin.js:60 ~ _.debounce ~ error:", error)
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
        <View style={[styles.container, { marginTop: inset.top }]}>
            <Input
                IconName={"locker-multiple"}
                IconCategoryName={"MaterialCommunityIcons"}
                InputHeader={"Search Locker"}
                keyboardType={"phone-pad"}
                color={AllColor.Androidgreen}
                placeholder={"Search by Only Locker No (e.g., 123)"}
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
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size={"large"} backgroundColor={AllColor.white} color={AllColor.black}></ActivityIndicator>
                    </View>
                    :
                    <>
                        {
                            data?.lockers?.length > 0 ?
                                <GenericTableCard
                                    data={data.lockers}
                                    headers={['Name', 'Locker No', 'Code', 'Mobile', 'Department', 'Status', 'Shoe Size', 'Before',]}
                                    getItemFields={(item) => [
                                        item.name,
                                        item.locker_no,
                                        item.code,
                                        item.mobile,
                                        item.department,
                                        item.status,
                                        item.shoe_size,
                                        item.before,
                                        // item.isLeft !== undefined ? (item.isLeft ? "Yes" : "No") : "N/A"
                                    ]}
                                    onRowPress={(item) => {
                                        navigate("GenericDetailScreen", { item, type: "preAdmin" });
                                    }}
                                    imageKey={true}
                                />


                                :
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image source={require("../../../util/image/not.png")} style={{ width: scale(200), height: scale(200) }}></Image>
                                    <Text style={{ fontSize: scale(20), color: AllColor.black, textAlign: "center", marginBottom: scale(100) }}>No Locker Found</Text>
                                </View>
                        }
                    </>
            }
        </View>
    )
}
export default PreAdmin

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AllColor.white
    }
})


