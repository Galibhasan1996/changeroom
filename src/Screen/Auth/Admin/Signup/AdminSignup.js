
import { KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useReducer } from 'react';
import Input from '../../../../Component/Input/Input';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import Button from '../../../../Component/Button/Button';
import { InputData } from '../../../../Component/Input/inputData/InputData';
import BasicHeader from '../../../../Component/Header/BasicHeader/BasicHeader';
import CustomText from '../../../../Component/Text/Text';
import AllColor from '../../../../util/color/Color';
import { navigate } from '../../../../navigator/NavigationREF/NavigationRef';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { width } from '../../../../Hook/Style/Style';
import AdBanner from '../../../../Component/AdBanner/AdBanner';

// Initial state for the form
const initialState = {
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    // isAdmin: true
};

// Reducer function to update state
const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_INPUT':
            return { ...state, [action.field]: action.payload };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
};

const AdminSignup = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const insets = useSafeAreaInsets()
    const handleSignup = () => {
        console.log('Signup Data:', state);
        // Handle signup logic here
        dispatch({ type: 'RESET' });
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <BasicHeader></BasicHeader>
                <StatusBar barStyle={"dark-content"}></StatusBar>
                <View style={{ width: width, alignItems: 'center', }}>
                    <CustomText variant='h1' fontSize={30} style={{ fontWeight: 'bold', marginTop: scale(20), }}>{"Admin Register"}</CustomText>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Dynamic Input Fields */}
                    {
                        InputData.map((input) => (
                            <Input
                                key={input.field}
                                IconCategoryName={input.IconCategoryName}
                                IconName={input.IconName}
                                placeholder={`Enter your ${input.label}`}
                                color={AllColor.Androidgreen}
                                placeholderTextColor={AllColor.gray}
                                InputHeader={input.label}
                                size={scale(20)}
                                value={state[input.field]}
                                keyboardType={input.keyboardType}
                                onChangeText={(text) => dispatch({ type: 'SET_INPUT', field: input.field, payload: text })}
                                inputColor={AllColor.black}
                            />
                        ))
                    }

                    {/* Signup Button */}
                    <Button
                        BtBackgroundColor={AllColor.black}
                        ButtonTitle={"Register"}
                        ButtonTitleColor={AllColor.white}
                        marginTop={scale(25)}
                        onPress={handleSignup}
                        CpaddingHorizontal={scale(10)}
                        CpaddingVertical={scale(5)}
                        btnWidth={responsiveScreenWidth(80)}
                        borderradius={scale(10)}
                    />

                    {/* Already have an account? Login */}
                    <View style={styles.dont_have_account_text_container}>
                        <CustomText variant='h6' Color={AllColor.gray}>{"Already have an account "}</CustomText>
                        <TouchableOpacity onPress={() => navigate("AdminLogin")}>
                            <CustomText variant='h6' Color={AllColor.Androidgreen} style={{ marginLeft: scale(3) }}>{"Admin Login ! "}</CustomText>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <AdBanner containerStyle={{ position: 'absolute', bottom: insets.bottom }}></AdBanner>
        </View>
    );
};

export default AdminSignup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: AllColor.white
    },
    dont_have_account_text_container: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: scale(10),
        paddingHorizontal: scale(20),
    }
});



