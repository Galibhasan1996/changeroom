import { ActivityIndicator, Image, Keyboard, StyleSheet, Text, View, } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { width } from '../Hook/Style/Style';
import Input from '../Component/Input/Input';
import { scale } from 'react-native-size-matters';
import { UserStorage } from '../store/Store';
import _ from 'lodash';
import { styleConsole } from '../util/helper/Helper';
import AllColor from '../util/color/Color';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../Hook/Auth/useAuth';
import GenericTableCard from '../Component/GenericTableCard/GenericTableCard';
import { navigate } from '../navigator/NavigationREF/NavigationRef';

const SearchLocker = () => {
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [token, setToken] = useState('');
    const insets = useSafeAreaInsets();
    const { searchLocker, loading } = useAuth()

    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await UserStorage.getItem('token');
            setToken(storedToken);
        };
        fetchToken();
    }, []);

    const debouncedSearch = useCallback(
        _.debounce(async (query, userToken) => {
            try {
                if (!userToken) return;
                const result = await searchLocker(query, userToken);
                setData(result);
            } catch (error) {
                console.log('🚀 ~ SearchLocker.js:25 ~ _.debounce ~ error:', error);
            }
        }, 500),
        []
    );

    useEffect(() => {
        if (search && token) {
            debouncedSearch(search, token);
        }
    }, [search, token, debouncedSearch]);




    return (
        <View style={[styles.container, { marginTop: insets.top }]}>
            <Input
                IconCategoryName={'Fontisto'}
                IconName={'search'}
                placeholder={'Search Locker'}
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
                }}
            />

            {/* --------------- Search Data ---------------------- */}
            {data?.locker?.length > 0 ? (
                <>
                    <View style={styles.total_container}>
                        <Text style={[{ fontWeight: "900" }]}>{`Total Locker Found : ${data?.total}`}</Text>
                    </View>
                    {
                        loading === true ? <View style={{ flex: 1, alignItems: 'center', }}>
                            <ActivityIndicator size={'large'} color={AllColor.black} />
                        </View>
                            :


                            <GenericTableCard
                                data={data.locker}
                                headers={['Unit', "Name", "Code", "Locker_no", "Combine", 'Mobile', 'Department', 'Status',]}
                                getItemFields={(item) => [
                                    item.unit,
                                    item.name,
                                    item.locker_no,
                                    item.code,
                                    item.mobile,
                                    item.department,
                                    item.status,
                                    // item.isLeft !== undefined ? (item.isLeft ? "Yes" : "No") : "N/A"
                                ]}
                                onRowPress={(item) => {
                                    navigate("GenericDetailScreen", { item, type: "allLocker" });
                                }}
                                imageKey={true}
                                paddingBottom={scale(163)}
                            />
                    }
                </>

            ) : (
                <View style={[styles.container, styles.center]}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('../util/image/not.png')} style={styles.not_image}></Image>
                        <Text style={[{ fontWeight: "900" }]}>Locker Not Found</Text>
                    </View>
                </View >
            )}
        </View>
    );
};

export default SearchLocker;

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
