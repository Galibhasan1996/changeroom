import { StyleSheet, Text, View, FlatList, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { scale } from 'react-native-size-matters';
import AllColor from '../../util/color/Color';
import { width } from '../../Hook/Style/Style';
import { styleConsole } from '../../util/helper/Helper';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
const GenericTableCard = ({ data = [], headers = [], getItemFields = () => [], onRowPress = () => { }, imageKey = 'image.url', paddingBottom = scale(100), type = null, onLongPress }) => {
    // styleConsole("🚀 ~ GenericTableCard.js:65 ~ GenericTableCard ~ data:", "GenericTableCard", data)
    const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-7043280906751715/1316685164';
    const renderItem = ({ item, index }) => (
        <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <TouchableOpacity
                    style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}
                    activeOpacity={0.9}
                    onPress={() => onRowPress(item, index)}
                    onLongPress={() => {
                        if (type === 'goggleScreen' && onLongPress) {
                            onLongPress(item, index);
                        }
                    }}
                >
                    <Text style={styles.cell}>{index + 1}</Text>
                    {
                        imageKey &&
                        (
                            <Image source={item?.image?.url ? { uri: item.image.url } : require("../../util/image/holder.jpg")} style={styles.User_image} />
                        )
                    }
                    {
                        getItemFields(item).map((value, idx) => (<Text key={idx.toString()} style={styles.cell}>{value ?? 'N/A'}</Text>))
                    }
                </TouchableOpacity>
            </ScrollView>

            {
                ((index + 1) % 5 === 0) &&
                (
                    <BannerAd
                        unitId={adUnitId}
                        size={BannerAdSize.ADAPTIVE_BANNER}
                        requestOptions={{
                            requestNonPersonalizedAdsOnly: true,
                        }}
                    />
                )
            }
        </View>
    );


    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.headerCell}>Sr.No.</Text>
                    {
                        imageKey && <Text style={styles.headerCell}>Image</Text>
                    }

                    {
                        headers.map((header, index) => (
                            <Text key={index.toString()} style={styles.headerCell}>
                                {header}
                            </Text>
                        ))
                    }
                </View>
            </ScrollView>

            <FlatList
                data={data}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom }}
            />

            <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.ADAPTIVE_BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
        </View>
    );
};


export default GenericTableCard;

const styles = StyleSheet.create({
    container: {
        width: width,
    },
    header: {
        flexDirection: "row",
        backgroundColor: AllColor.red,
        paddingVertical: scale(8),
        borderBottomWidth: scale(1),
        borderBottomColor: AllColor.white,
    },
    headerCell: {
        width: scale(100),
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        paddingHorizontal: scale(5),
    },
    row: {
        flexDirection: "row",
        paddingVertical: scale(6),
        borderBottomWidth: scale(1),
        borderBottomColor: AllColor.Cyan,
        alignItems: 'center',
    },
    evenRow: {
        backgroundColor: AllColor.evenRow,
    },
    oddRow: {
        backgroundColor: AllColor.oddRow,
    },
    cell: {
        width: scale(100),
        color: AllColor.white,
        textAlign: "center",
        paddingHorizontal: scale(5),
    },
    User_image: {
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: width * 0.3,
        resizeMode: "cover"
    }
});

