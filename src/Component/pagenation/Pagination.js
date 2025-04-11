import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "../Icon/Icon";
import { height, useCustomStyle, width } from "../../Hook/Style/Style";
import AllColor from "../../util/color/Color";
import { scale } from "react-native-size-matters";

const Pagination = ({ page, setPage, totalPages, totalLockers, bottomm }) => {

    const nextButton = Array.from({ length: 2 }, (_, index) => page + index + 1).filter(num => num <= totalPages);
    const preButton = Array.from({ length: 2 }, (_, index) => page - index - 1).filter(num => num > 0).reverse();
    const mergedButtons = [...new Set([...preButton, page, ...nextButton])].sort((a, b) => a - b);

    return (
        <View style={[styles.paginationContainer, { backgroundColor: "rgba(255,255,255,0.5)", bottom: bottomm ? bottomm : scale(20) }]}>
            {/* Previous Button */}
            <TouchableOpacity
                onPress={() => setPage((prevPage) => Math.max(1, prevPage - 1))}
                disabled={page === 1}
                style={[styles.button, page === 1 && styles.disabledButton]}
                onLongPress={() => setPage(1)}
            >
                <Icon IconCategoryName="FontAwesome" IconName="angle-left" color={AllColor.white} />
            </TouchableOpacity>

            {/* Page Numbers */}
            <View style={styles.pageContainer}>
                {mergedButtons.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => setPage(item)}
                        style={[
                            styles.pageButton,
                            item === page ? styles.activeButton : styles.inactiveButton,
                        ]}
                        disabled={item === page}
                    >
                        <Text
                            style={[
                                styles.buttonText,
                                item === page ? styles.activeText : styles.inactiveText,
                            ]}
                        >
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            {/* Next Button */}
            <TouchableOpacity
                onPress={() => setPage((prevPage) => Math.min(totalPages, prevPage + 1))}
                disabled={page === totalPages}
                style={[styles.button, page === totalPages && styles.disabledButton]}
                onLongPress={() => setPage(totalPages)}
            >
                <Icon IconCategoryName="FontAwesome" IconName="angle-right" color={AllColor.white} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    paginationContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: width,
        position: "absolute",
        // bottom: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    button: {
        padding: 10,
        borderRadius: 50,
        backgroundColor: AllColor.Androidgreen,
        marginHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    disabledButton: {
        opacity: 0.4,
    },
    pageContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    pageButton: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        marginHorizontal: 5,
        borderRadius: 20,
    },
    activeButton: {
        backgroundColor: AllColor.red,
    },
    inactiveButton: {
        backgroundColor: AllColor.blurGray,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    activeText: {
        color: AllColor.white,
    },
    inactiveText: {
        color: AllColor.white,
    },
});

export default Pagination;
