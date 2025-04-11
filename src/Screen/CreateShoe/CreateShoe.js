import React, { useCallback, useReducer, useState, } from 'react';
import { KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Input from '../../Component/Input/Input';
import Button from '../../Component/Button/Button';
import { InputShoe, getInitialStateCreateShoe, reducerForUpdate, } from '../../Component/Input/inputData/InputData';
import BasicHeader from '../../Component/Header/BasicHeader/BasicHeader';
import { validateShoe, } from '../../util/helper/validation/Validation';
import { showToast, styleConsole, department, employer } from '../../util/helper/Helper';
import { goBack, } from '../../navigator/NavigationREF/NavigationRef';
import CustomText from '../../Component/Text/Text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../Hook/Auth/useAuth';
import AllColor from '../../util/color/Color';

const CreateShoe = () => {
    const insets = useSafeAreaInsets();

    const [state, dispatch] = useReducer(reducerForUpdate, getInitialStateCreateShoe());
    // styleConsole("🚀 ~ CreateGoggle.js:19 ~ CreateGoggle ~ state:", "CreateGoggle", state)
    const { createShoes, loading } = useAuth()

    const handleUpdateLocker = useCallback(async () => {
        if (!validateShoe(state, showToast)) return;

        try {
            const data = await createShoes(state.name, state.emp_code, state.employer, state.department, state.issue_quantity, state.mobile, state.shoe_size);

            if (data.error === "Shoe validation failed: department: Invalid department value") {
                return showToast("error", `PACKING SECURITY UTILITY HOUSEKEEPING`, "Invalid department value",);
            }

            if (data.error === "Shoe validation failed: employer: Invalid employer value") {
                return showToast("error", `NEEM NAPS TDS SSD CHAUDHARY LOREAL SIS`, "Invalid employer value",);
            }

            if (data.message === "shoe created successfully") {
                showToast("success", data.message, data.message);
                dispatch({ type: 'RESET' });
                setSelectedDepartment('');
                setSelectedEmployer('');
                goBack()
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
            <CustomText variant='h1' fontSize={30} style={{ fontWeight: 'bold', marginTop: 20, }}>{"Create Shoe"}</CustomText>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >

                    <ScrollView >

                        {/* Input Fields */}
                        {InputShoe.map((inputItem) => (
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
                        ))}


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

                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </View>

    );
};

export default CreateShoe;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: AllColor.white
    }
});


