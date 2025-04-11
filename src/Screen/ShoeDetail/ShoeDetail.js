import { ActivityIndicator, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import { width } from '../../Hook/Style/Style';
import Icon from '../../Component/Icon/Icon';
import { useFocusEffect } from '@react-navigation/native';
import { navigate } from '../../navigator/NavigationREF/NavigationRef';
import { useAuth } from '../../Hook/Auth/useAuth';
import _ from 'lodash';
import AllColor from '../../util/color/Color';
import CustomModel from '../../Component/Model/CustomModel';
import GenericTableCard from '../../Component/GenericTableCard/GenericTableCard';
import { formatDate, styleConsole } from '../../util/helper/Helper';

const ShoeDetail = () => {
    const insets = useSafeAreaInsets()
    const { GetShoe, loading, deleteShoes } = useAuth()
    const [hightLight, setHighlight] = useState(false);
    const [Data, setData] = useState([]);
    // styleConsole("🚀 ~ ShoeDetail.js:20 ~ ShoeDetail ~ Data:", "ShoeDetail", Data)
    const [visible, setvisible] = useState(false);

    const [search, setSearch] = useState("");
    const [page, setpage] = useState(1);
    const [limit, setLimit] = useState(30);
    const [selectedShoeId, setSelectedShoeId] = useState(null);
    const debouncedSearch = useCallback(
        _.debounce(async (search, page, limit) => {
            try {
                let data;

                if (search && page && limit) {
                    data = await GetShoe(search, page, limit);
                } else if (search) {
                    data = await GetShoe(search);
                } else if (page && limit) {
                    data = await GetShoe(null, page, limit);
                } else {
                    data = await GetShoe();
                }

                setData(data);
            } catch (error) {
                console.log("🚀 ~ ShoeDetail.js:44 ~ _.debounce ~ error:", error.message)
            }
        }, 500),
        []
    );


    useFocusEffect(
        useCallback(() => {
            debouncedSearch(search, page, limit);
        }, [search, page, limit,])
    );

    useEffect(() => {
        debouncedSearch(search, page, limit);
        return () => {
            debouncedSearch.cancel();
        };
    }, [search, page, limit,]);


    const handleLongPress = (item) => {
        setSelectedShoeId(item._id);
        setvisible(true);
    };

    const handleDelete = async () => {
        if (!selectedShoeId) return;

        try {
            const data = await deleteShoes(selectedShoeId);
            // console.log("🚀 ~ ShoeDetail.js:75 ~ handleDelete ~ data:", data)

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
                        <Icon IconCategoryName="MaterialCommunityIcons" IconName="shoe-sneaker" color={hightLight === true ? AllColor.Androidgreen : AllColor.gray} size={scale(20)}></Icon>
                        <TextInput
                            placeholder='Search by name & code'
                            placeholderTextColor={"#d1d1d1"}
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
                        navigate("CreateShoe")
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
                                    data={Data?.shoe}
                                    headers={['Date', 'Name', "Emp_Code", "Employer", 'Department', 'Quantity', "Shoe Size", "Mobile"]}
                                    getItemFields={(item) => [
                                        formatDate(item.date),
                                        item.name,
                                        item.emp_code,
                                        item.employer,
                                        item.department,
                                        item.issue_quantity,
                                        item.shoe_size,
                                        item.mobile
                                    ]}
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

export default ShoeDetail

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
        width: "80%",
        color: AllColor.black,
        paddingLeft: scale(10),
    },
    not: {
        width: width * 0.5,
        height: width * 0.5,
    },
})
