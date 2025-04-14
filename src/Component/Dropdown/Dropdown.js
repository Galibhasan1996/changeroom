import React, { useState, useMemo, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import Icon from '../Icon/Icon';
import AllColor from '../../util/color/Color';
import { width } from '../../Hook/Style/Style';
import { ScrollView } from 'react-native-gesture-handler';

const Dropdown = ({ data, setSelected, selected, Department = null, DepaEmp = "Select" }) => {
    const [search, setSearch] = useState('');
    const [clicked, setClicked] = useState(false);
    const inputRef = useRef(null);
    const [isFocus, setisFocus] = useState(false);

    const filteredData = useMemo(() => {
        return search
            ? data.filter(item => item.department.toLowerCase().includes(search.toLowerCase()))
            : data;
    }, [search, data]);

    return (
        <View style={styles.container}>
            {
                Department && (
                    <View style={styles.labelContainer}>
                        <Text style={{ color: selected ? AllColor.Androidgreen : AllColor.gray }}>{Department}</Text>
                    </View>
                )
            }


            <TouchableOpacity
                style={[styles.mainContainer, { borderColor: selected ? AllColor.Androidgreen : AllColor.white4 }]}
                onPress={() => {
                    setClicked(!clicked);
                    if (!clicked) inputRef.current?.focus();
                }}
                accessible={true}
                accessibilityLabel="Dropdown Button"
            >
                <Text style={[styles.selectedText, { color: selected ? AllColor.black : AllColor.gray }]}>{selected || DepaEmp}</Text>
                <Icon IconCategoryName="Entypo" IconName={clicked ? "triangle-up" : "triangle-down"} size={scale(20)} />
            </TouchableOpacity>


            {
                clicked && (
                    <View style={styles.Dropdown_container}>
                        <TextInput
                            ref={inputRef}
                            placeholder="Search .."
                            value={search}
                            onChangeText={setSearch}
                            placeholderTextColor={AllColor.gray}
                            style={[styles.textInput, { borderColor: isFocus ? AllColor.Androidgreen : AllColor.gray }]}
                            accessible={true}
                            accessibilityLabel="Search Input"
                            onFocus={() => setisFocus(true)}
                            onBlur={() => setisFocus(false)}
                        />
                        <ScrollView style={{ maxHeight: scale(200) }} contentContainerStyle={{ paddingBottom: scale(10) }}>
                            {
                                filteredData.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.list}
                                        onPress={() => {
                                            setSelected(item.department);
                                            setClicked(false);
                                            setSearch('');
                                            setisFocus(false);
                                        }}
                                        accessible={true}
                                        accessibilityLabel={`Select ${item.department}`}
                                    >
                                        <Text style={styles.listText}>{item.department}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </ScrollView>
                    </View>
                )
            }
        </View>
    );
};

export default Dropdown;

const styles = StyleSheet.create({
    container: {
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: scale(5),
        paddingHorizontal: scale(10),
    },
    labelContainer: {
        width: width,
        paddingHorizontal: scale(10),
        paddingVertical: scale(5),
    },
    mainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "95%",
        height: scale(35),
        borderWidth: scale(2),
        borderRadius: scale(10),
        paddingHorizontal: scale(10),
    },
    selectedText: {
        fontWeight: '600',
        width: "90%",
    },
    Dropdown_container: {
        elevation: scale(5),
        marginTop: scale(10),
        height: scale(250),
        alignSelf: 'center',
        width: '95%',
        backgroundColor: AllColor.white,
        borderRadius: scale(10),
    },
    textInput: {
        width: '90%',
        height: scale(38),
        alignSelf: 'center',
        borderWidth: scale(2),
        borderRadius: scale(7),
        marginTop: scale(10),
        paddingLeft: scale(20),
    },
    list: {
        width: '85%',
        alignSelf: 'center',
        justifyContent: 'center',
        borderBottomWidth: scale(0.5),
        borderColor: AllColor.white4,
        paddingVertical: scale(8),
    },
    listText: {
        fontWeight: '600',
    },
});
