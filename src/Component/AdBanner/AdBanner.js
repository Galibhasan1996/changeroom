import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const AdBanner = ({ containerStyle }) => {
    const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-7043280906751715/1316685164';

    return (
        <View style={[styles.bannerContainer, containerStyle]}>
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

const styles = StyleSheet.create({
    bannerContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
});

export default AdBanner;




