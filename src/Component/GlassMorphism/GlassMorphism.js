import { BlurView } from "@react-native-community/blur";
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

const GlassMorphism = ({ ...props }) => {


    const { children, blurRadius = 10, opacity = 0.5, backgroundColor = 'white', ...rest } = props;

    return (
        <BlurView blurType="dark" blurAmount={blurRadius}>
            <View style={[styles.glass, { opacity, backgroundColor }, rest.style]}>
                {children}
            </View>
        </BlurView>
    );
};

export default GlassMorphism;
const styles = StyleSheet.create({
    glass: {
        borderRadius: 16,
        padding: 16,
        elevation: 4,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
})
