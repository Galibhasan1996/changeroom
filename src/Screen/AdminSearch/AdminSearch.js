import { ActivityIndicator, Image, Keyboard, StyleSheet, Text, View, } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { width } from '../../Hook/Style/Style';
import Input from '../../Component/Input/Input';
import { scale } from 'react-native-size-matters';
import _ from 'lodash';
import { styleConsole } from '../../util/helper/Helper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AllColor from '../../util/color/Color';
import { useAuth } from '../../Hook/Auth/useAuth';
import GenericTableCard from '../../Component/GenericTableCard/GenericTableCard';

const AdminSearch = () => {
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);

    const insets = useSafeAreaInsets();

    const { searchAdmin, loading } = useAuth()



    const debouncedSearch = useCallback(
        _.debounce(async (query,) => {
            try {
                const result = await searchAdmin(query);
                setData(result);
            } catch (error) {
                console.log("🚀 ~ AdminSearch.js:29 ~ _.debounce ~ error:", error)
            }
        }, 500),
        []
    );

    useEffect(() => {
        if (search) {
            debouncedSearch(search);
        }
    }, [search, debouncedSearch]);




    return (
        <View style={[styles.container, { marginTop: insets.top }]}>
            <Input
                IconCategoryName={'Fontisto'}
                IconName={'search'}
                placeholder={'Search Admin Locker'}
                color={AllColor.Androidgreen}
                placeholderTextColor={AllColor.gray}
                InputHeader={'Search Locker'}
                size={scale(20)}
                value={search}
                keyboardType={'default'}
                onChangeText={setSearch}
                inputColor={AllColor.black}
                InputHeaderMT={scale(10)}
                LeftIconCategoryName={"AntDesign"}
                LeftIconName={"closecircleo"}
                LeftIcon={search !== "" ? true : false}
                LeftIconSize={scale(20)}
                LeftIconOnClick={() => {
                    setSearch("")
                    Keyboard.dismiss()
                    debouncedSearch(search);
                }}
            />

            {/* --------------- Search Data ---------------------- */}
            {data?.locker?.length > 0 ? (
                <>
                    <View style={styles.total_container}>
                        <Text style={[{ fontWeight: "900" }]}>{`Total Locker Found : ${data?.total}`}</Text>
                    </View>
                    {
                        loading === true ?
                            <View style={{ flex: 1, alignItems: 'center', }}>
                                <ActivityIndicator size={'large'} color={AllColor.black}></ActivityIndicator>
                            </View>
                            :
                            // <AdminSearchCard data={data.locker} paddingBottom={scale(160)}></AdminSearchCard>
                            <GenericTableCard
                                data={data.locker}
                                headers={['Locker No', 'Code', "Name", 'Mobile', 'Department', 'Status', "Shoe Size", "Before"]}
                                getItemFields={(item) => [
                                    item.locker_no,
                                    item.code,
                                    item.name,
                                    item.mobile,
                                    item.department,
                                    item.status,
                                    item.shoe_size,
                                    item.before,
                                    // item.isLeft !== undefined ? (item.isLeft ? "Yes" : "No") : "N/A"
                                ]}
                                onRowPress={(item) => {
                                    navigate("GenericDetailScreen", { item: item, type: "admin" });
                                }}
                                // imageKey={false}
                                paddingBottom={scale(165)}
                            />
                    }
                </>

            ) : (
                <View style={[styles.container, styles.center]}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('../../util/image/not.png')} style={styles.not_image}></Image>
                        <Text style={[{ fontWeight: "900" }]}>Admin Locker Not Found</Text>
                    </View>
                </View >
            )}
        </View>
    );
};

export default AdminSearch;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AllColor.white,
        alignItems: 'center',
    },
    animation: {
        width: scale(70),
        height: scale(70),
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    total_container: {
        width: width - 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: scale(10),
        paddingVertical: scale(5),
        backgroundColor: AllColor.rgbaRed,
        marginBottom: 10,
        borderRadius: 5,
    },
    not_image: {
        width: width * 0.5,
        height: width * 0.5,
    }
});



