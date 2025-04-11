import { ActivityIndicator, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import AllColor from '../../util/color/Color'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BASE_URL, formatDate, styleConsole } from '../../util/helper/Helper';
import { s, scale } from 'react-native-size-matters';
import { height, width } from '../../Hook/Style/Style';
import Icon from '../../Component/Icon/Icon';
import { useFocusEffect } from '@react-navigation/native';
import { navigate } from '../../navigator/NavigationREF/NavigationRef';
import { useAuth } from '../../Hook/Auth/useAuth';
import _ from 'lodash';
import CustomModel from '../../Component/Model/CustomModel';
import GenericTableCard from '../../Component/GenericTableCard/GenericTableCard';

const GoggleDetail = () => {
    const insets = useSafeAreaInsets()
    const { GetGoggle, deleteGoggle, loading } = useAuth()
    const [hightLight, setHighlight] = useState(false);
    const [Data, setData] = useState([]);
    // styleConsole("🚀 ~ GoggleDetail.js:20 ~ GoggleDetail ~ Data:", "GoggleDetail", Data)

    const [search, setSearch] = useState("");
    const [page, setpage] = useState(1);
    const [limit, setLimit] = useState(30);
    const [SelectedGoggleId, setSelectedGoggleId] = useState(null);

    const [visible, setvisible] = useState(false);

    const debouncedSearch = useCallback(
        _.debounce(async (search, page, limit) => {
            try {
                let data;

                if (search && page && limit) {
                    data = await GetGoggle(search, page, limit);
                } else if (search) {
                    data = await GetGoggle(search);
                } else if (page && limit) {
                    data = await GetGoggle(null, page, limit);
                } else {
                    data = await GetGoggle();
                }

                setData(data);
            } catch (error) {
                console.log("🚀 ~ GoggleDetail.js:57 ~ _.debounce ~ error:", error.message)
            }
        }, 500),
        []
    );


    useFocusEffect(
        useCallback(() => {
            debouncedSearch(search, page, limit);
        }, [search, page, limit])
    );

    useEffect(() => {
        debouncedSearch(search, page, limit);
        return () => {
            debouncedSearch.cancel();
        };
    }, [search, page, limit]);


    const handleLongPress = (item) => {

        setSelectedGoggleId(item._id);
        setvisible(true);
    };

    const handleDelete = async () => {
        if (!SelectedGoggleId) return;

        try {
            const data = await deleteGoggle(SelectedGoggleId);
            // console.log("🚀 ~ GoggleDetail.js:77 ~ handleDelete ~ data:", data)
            setvisible(false)
            debouncedSearch(search, page, limit);
        } catch (error) {
            console.log("🚀 ~ Error deleting shoe:", error);
        }
    };


    const handleFocus = useCallback(() => setHighlight(true), []);
    const handleBlur = useCallback(() => setHighlight(false), []);


    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={[styles.container, { marginTop: insets.top }]}>
                <View style={styles.header}>
                    <View style={[styles.inputContainer, { borderColor: hightLight === true ? AllColor.Androidgreen : AllColor.gray, }]}>
                        <Icon IconCategoryName="MaterialCommunityIcons" IconName="safety-goggles" color={hightLight === true ? AllColor.Androidgreen : AllColor.gray} size={scale(20)}></Icon>
                        <TextInput
                            placeholder='Search by name & code'
                            placeholderTextColor={AllColor.gray}
                            style={styles.input}
                            onChangeText={(text) => setSearch(text)}
                            value={search}
                            onFocus={(e) => {
                                handleFocus();
                            }}
                            onBlur={() => {
                                handleBlur();
                            }}
                        ></TextInput>
                        {
                            search === "" ? null :
                                <TouchableOpacity onPress={() => {
                                    setSearch('')
                                    Keyboard.dismiss()
                                }}>
                                    <Icon IconCategoryName="Ionicons" IconName="close-sharp" color={hightLight === true ? AllColor.Androidgreen : AllColor.gray} size={scale(20)}></Icon>
                                </TouchableOpacity>
                        }

                    </View>
                    <TouchableOpacity style={{ width: "15%", alignItems: 'flex-end', }} onPress={() => {
                        navigate("CreateGoggle")
                    }}>
                        <Icon IconCategoryName="MaterialIcons" IconName="add" color={AllColor.black} size={scale(25)}></Icon>
                    </TouchableOpacity>
                </View>
                {
                    loading ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size={"large"} color={AllColor.black} />
                        </View>
                    ) : (
                        <>
                            {Data.message === "No goggles found" ? (
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image source={require('../../util/image/not.png')} style={styles.not} />
                                    <Text style={{ color: AllColor.black, fontWeight: "900", fontSize: scale(15) }}>No Data Found</Text>
                                </View>
                            ) : (
                                <GenericTableCard
                                    data={Data.goggles}
                                    headers={['Date', 'Name', "Emp_Code", "Employer", 'Department', 'Quantity',]}
                                    getItemFields={(item) => [
                                        formatDate(item.date),
                                        item.name,
                                        item.emp_code,
                                        item.employer,
                                        item.department,
                                        item.issue_quantity,
                                        // item.isLeft !== undefined ? (item.isLeft ? "Yes" : "No") : "N/A"
                                    ]}
                                    // onRowPress={(item) => {
                                    //     navigate("GenericDetailScreen", { item, type: "allLocker" });
                                    // }}
                                    imageKey={false}
                                    paddingBottom={scale(75)}
                                    type={"goggleScreen"}
                                    onLongPress={handleLongPress}
                                />
                            )}
                        </>
                    )
                }
                <CustomModel visible={visible} setvisible={setvisible} onDelete={() => handleDelete()}></CustomModel>
            </View >
        </TouchableWithoutFeedback>
    )
}

export default GoggleDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AllColor.white,
    },
    header: {
        width: width,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scale(10),
        paddingVertical: scale(5),
    },
    inputContainer: {
        width: "85%",
        height: "100%",
        borderRadius: scale(10),
        borderWidth: scale(1),
        flexDirection: "row",
        alignItems: 'center',
        paddingLeft: scale(5),
    },
    input: {
        // backgroundColor: AllColor.red,
        width: "80%",
        color: AllColor.black,
        paddingLeft: scale(10),
    },
    not: {
        width: width * 0.5,
        height: width * 0.5,
    }
})




