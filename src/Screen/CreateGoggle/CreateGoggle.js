import React, { useCallback, useReducer, } from 'react';
import { KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet, View, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import Input from '../../Component/Input/Input';
import Button from '../../Component/Button/Button';
import { InputGoggle, getInitialStateCreateGoggle, reducerForUpdate, } from '../../Component/Input/inputData/InputData';
import BasicHeader from '../../Component/Header/BasicHeader/BasicHeader';
import { validateGoggle, } from '../../util/helper/validation/Validation';
import { showToast, styleConsole } from '../../util/helper/Helper';
import { goBack, } from '../../navigator/NavigationREF/NavigationRef';
import CustomText from '../../Component/Text/Text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AllColor from '../../util/color/Color';
import { useAuth } from '../../Hook/Auth/useAuth';

const CreateGoggle = () => {
    const insets = useSafeAreaInsets();

    const [state, dispatch] = useReducer(reducerForUpdate, getInitialStateCreateGoggle());
    // styleConsole("🚀 ~ CreateGoggle.js:19 ~ CreateGoggle ~ state:", "CreateGoggle", state)
    const { createGoggle, loading } = useAuth()


    const handleUpdateLocker = useCallback(async () => {
        if (!validateGoggle(state, showToast)) return;

        try {
            const data = await createGoggle(state.name, state.emp_code, state.employer, state.department, state.issue_quantity);


            // styleConsole("🚀 ~ CreateGoggle.js:29 ~ handleUpdateLocker ~ data:", "handleUpdateLocker", data)

            if (data.error === "Goggle validation failed: department: Invalid department value") {
                return showToast("error", `PACKING SECURITY UTILITY HOUSEKEEPING`, "Invalid department value",);
            }

            if (data.error === "Goggle validation failed: employer: Invalid employer value") {
                return showToast("error", `NEEM NAPS TDS SSD CHAUDHARY LOREAL SIS`, "Invalid employer value",);
            }

            if (data.message === "goggle created successfully") {
                showToast("success", data.message, data.message);
                dispatch({ type: 'RESET' });
                if (loading === false) {
                    goBack()
                }
            } else if (data.errors && Array.isArray(data.errors)) {
                showToast("error", data.errors[0]?.msg || "An error occurred", data.errors[0]?.msg || "Error");
            } else if (data.message) {
                showToast("error", data.message, data.message);
            }
        } catch (error) {
            showToast("error", "Update failed", error.message || "An error occurred");
        }
    }, [state, dispatch, goBack,]);

    return (
        <View style={[styles.container, { marginTop: insets.top }]}>
            <StatusBar barStyle={"dark-content"}></StatusBar>

            <BasicHeader />
            <CustomText variant='h1' fontSize={30} style={{ fontWeight: 'bold', marginTop: 20, }}>{"Create Goggle"}</CustomText>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >

                    {
                        loading === true ?
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size={"large"} color={AllColor.black}></ActivityIndicator>
                            </View>
                            :
                            <ScrollView >

                                {/* Input Fields */}
                                {
                                    InputGoggle.map((inputItem) => (
                                        <Input
                                            key={inputItem.field}
                                            IconCategoryName={inputItem.IconCategoryName}
                                            IconName={inputItem.IconName}
                                            placeholder={`${inputItem.place}`}
                                            color={AllColor.Androidgreen}
                                            placeholderTextColor={AllColor.gray}
                                            InputHeader={inputItem.label}
                                            size={20}
                                            value={state[inputItem.field] || ""}
                                            keyboardType={inputItem.keyboardType}
                                            onChangeText={(text) => dispatch({ type: 'SET_INPUT', field: inputItem.field, payload: text })}
                                            inputColor={AllColor.black}
                                            readOnly={inputItem.readOnly}
                                        />
                                    ))
                                }

                                {/* Update Button */}
                                <Button
                                    BtBackgroundColor={AllColor.black}
                                    ButtonTitle={"Create"}
                                    ButtonTitleColor={AllColor.white}
                                    marginTop={10}
                                    marginBottom={50}
                                    CpaddingHorizontal={10}
                                    CpaddingVertical={5}
                                    btnWidth={"90%"}
                                    borderradius={10}
                                    onPress={() => {
                                        handleUpdateLocker()
                                    }}
                                />
                            </ScrollView>
                    }
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </View>

    );
};

export default CreateGoggle;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: AllColor.white
    }
});




