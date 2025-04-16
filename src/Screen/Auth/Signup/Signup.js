
import { ScrollView, StyleSheet, TouchableOpacity, View, StatusBar, KeyboardAvoidingView, } from 'react-native';
import React, { useReducer } from 'react';
import Input from '../../../Component/Input/Input';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import Button from '../../../Component/Button/Button';
import { InputData } from '../../../Component/Input/inputData/InputData';
import BasicHeader from '../../../Component/Header/BasicHeader/BasicHeader';
import CustomText from '../../../Component/Text/Text';
import { showToast, styleConsole } from '../../../util/helper/Helper';
import { validateSignup } from '../../../util/helper/validation/Validation';
import { navigate } from '../../../navigator/NavigationREF/NavigationRef';
import AllColor from '../../../util/color/Color';
import { userRegister } from '../../../service/api/login/UserLogin';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AdBanner from '../../../Component/AdBanner/AdBanner';

// Initial state for the form
const initialState = {
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
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

const Signup = () => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const insets = useSafeAreaInsets()

    const handleSignup = async () => {


        if (!validateSignup(state, showToast)) {
            return;
        }

        const data = await userRegister(state.name, state.email, state.password, state.dateOfBirth, state.mobile);
        // styleConsole("🚀 ~ Signup.js:52 ~ handleSignup ~ data:", "for register", data)

        if (data.message === "user register successfully") {
            showToast("success", data.message, data.message);
            dispatch({ type: 'RESET' });
            navigate("Otp", { email: state.email });
        }

        if (data.errors) {
            showToast("error", data.errors[0].msg, data.errors[0].msg);
            return;
        } else if (data.message) {
            showToast('error', data.message, data.message);
            return
        }
    };


    return (
        <View style={[styles.container, { marginTop: insets.top }]}>
            <BasicHeader></BasicHeader>
            <StatusBar barStyle={"dark-content"}></StatusBar>
            <CustomText variant='h1' fontSize={30} style={{ fontWeight: 'bold', marginTop: scale(20), }}>{"Register"}</CustomText>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
                        <CustomText variant='h6' Color={AllColor.gray} >{"Already have an account ? "}</CustomText>

                        <TouchableOpacity onPress={() => navigate("Login")}>
                            <CustomText variant='h6' Color={AllColor.Androidgreen} style={{ marginLeft: scale(3) }}>{"Login "}</CustomText>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
            <View style={[styles.addContainer,]}>
            </View>
            <AdBanner containerStyle={{ position: "absolute", bottom: insets.bottom }}></AdBanner>
        </View>
    );
};

export default Signup;

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
    },
    addContainer: {
        position: "absolute",
        bottom: scale(33)
    }
});
