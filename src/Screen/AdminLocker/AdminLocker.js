import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import React, { useState, useEffect, useCallback, } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../Hook/Auth/useAuth';
import { styleConsole } from '../../util/helper/Helper';
import { useFocusEffect } from '@react-navigation/native';
import Pagination from '../../Component/pagenation/Pagination';
import AllColor from '../../util/color/Color';
import Icon from '../../Component/Icon/Icon';
import { scale } from 'react-native-size-matters'
import { width } from '../../Hook/Style/Style';
import { navigate } from '../../navigator/NavigationREF/NavigationRef';
import GenericTableCard from '../../Component/GenericTableCard/GenericTableCard';

const AdminLocker = () => {
    const inset = useSafeAreaInsets();
    const { getAdminLocker, loading } = useAuth()
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(15);
    const [data, setdata] = useState([]);

    const admin = async () => {
        try {
            const data = await getAdminLocker(page, limit);
            // styleConsole("🚀 ~ AdminLocker.js:20 ~ admin ~ data:", "admin", data)
            if (data) {
                setdata(data)
            }

        } catch (error) {
            console.log("🚀 ~ AdminLocker.js:18 ~ admin ~ error:", error)
        }
    }

    useEffect(() => {
        admin();
    }, [page, limit])

    useFocusEffect(
        useCallback(() => {
            admin();
        }, [])
    )

    return (
        <View style={[styles.container, { marginTop: inset.top }]}>
            <View style={styles.preAdminContainer}>
                <TouchableOpacity onPress={() => {
                    navigate("PreAdmin")
                }}>
                    <Icon IconCategoryName="MaterialCommunityIcons" IconName="locker-multiple" color={AllColor.black}></Icon>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    navigate("AdminSearch")
                }}>
                    <Icon IconCategoryName="Ionicons" IconName="search-sharp" color={AllColor.black}></Icon>
                </TouchableOpacity>
            </View>



            {
                loading ?
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size={"large"} backgroundColor={AllColor.white} color={AllColor.black}></ActivityIndicator>
                    </View>
                    :
                    <>
                        <GenericTableCard
                            data={data.adminLockers}
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
                            imageKey={true}
                            paddingBottom={scale(80)}
                        />
                        <Pagination page={page} setPage={setPage} totalLockers={data.count} totalPages={data.totalPage}></Pagination>

                    </>
            }
        </View>
    )
}

export default AdminLocker

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AllColor.white
    },
    preAdminContainer: {
        width: width,
        // backgroundColor: AllColor.green,
        paddingVertical: scale(10),
        paddingHorizontal: scale(10),
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: "row"
    }
})