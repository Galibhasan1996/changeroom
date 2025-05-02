import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import React, { useState, useCallback, } from 'react';
import { useAuth } from '../../Hook/Auth/useAuth';
import { UserStorage } from '../../store/Store';
import { scale } from 'react-native-size-matters';
import Pagination from '../../Component/pagenation/Pagination';
import { styleConsole } from '../../util/helper/Helper';
import AllColor from '../../util/color/Color';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import GenericTableCard from '../../Component/GenericTableCard/GenericTableCard';
import { navigate } from '../../navigator/NavigationREF/NavigationRef';
const Home = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(30);
    const { getAllLocker, loading } = useAuth();
    const [data, setData] = useState([]);
    // styleConsole("🚀 ~ Home.js:15 ~ Home ~ data:", "all locker data", data)
    const insets = useSafeAreaInsets();


    const token = UserStorage.getItem("token");
    // styleConsole("🚀 ~ Home.js:23 ~ Home ~ token:", "token", token)




    useFocusEffect(
        useCallback(() => {
            const controller = new AbortController();

            const fetchData = async () => {
                try {
                    const res = await getAllLocker(limit, page, token);
                    setData(res);
                } catch (error) {

                    if (error.name !== "AbortError") {
                        console.log("🚀 ~ Home.js:28 ~ fetchData ~ error:", error.message);
                    }
                }
            };

            fetchData();

            return () => {
                controller.abort();
            };
        }, [page])
    );


    if (loading) {
        return (
            <View style={[styles.container, styles.center]}>
                <View style={{ flexDirection: "row", alignItems: 'center', }}>
                    <ActivityIndicator size={"large"} color={AllColor.black}></ActivityIndicator>
                </View>
            </View >
        );
    }

    return (
        <View style={[styles.container, { marginTop: insets.top }]}>
            <StatusBar barStyle={"dark-content"}></StatusBar>

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
                    navigate("GenericDetailScreen", { item, type: "allLocker" });
                }}
                imageKey={true}
                paddingBottom={scale(35)}
            />

            <Pagination page={page} setPage={setPage} totalLockers={data.totalLockers} totalPages={data.totalPages}></Pagination>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AllColor.white,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    animation: {
        width: scale(70),
        height: scale(70),
    }
});
