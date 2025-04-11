import React, { useCallback, useReducer, useState } from 'react';
import { Image, KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import { width } from '../../../Hook/Style/Style';
import Input from '../../../Component/Input/Input';
import Button from '../../../Component/Button/Button';
import { adminInitialStateForUpdate, adminInputDataForUpdate, reducerForUpdate, } from '../../../Component/Input/inputData/InputData';
import BasicHeader from '../../../Component/Header/BasicHeader/BasicHeader';
import { useRoute } from '@react-navigation/native';
import { adminValidation, } from '../../../util/helper/validation/Validation';
import { BASE_URL, getFileType, showToast, styleConsole } from '../../../util/helper/Helper';
import { launchCamera, } from 'react-native-image-picker';
import { goBack, navigate } from '../../../navigator/NavigationREF/NavigationRef';
import CustomText from '../../../Component/Text/Text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AllColor from '../../../util/color/Color';
import { useAuth } from '../../../Hook/Auth/useAuth';
const AdminUpdate = () => {
    const insets = useSafeAreaInsets();
    const route = useRoute();
    const { item = {} } = route.params || {};
    // console.log("🚀 ~ AdminUpdate.js:22 ~ AdminUpdate ~ item:", item)

    const { adminUpdateById, loading, preAdminUpdate } = useAuth()

    const [captureImage, setcaptureImage] = useState(item?.image?.url);


    const [state, dispatch] = useReducer(reducerForUpdate, adminInitialStateForUpdate(item));
    // console.log("🚀 ~ AdminUpdate.js:30 ~ AdminUpdate ~ state:", state)


    const OpenCamera = async () => {
        try {
            const result = await launchCamera({
                mediaType: "photo",
                quality: 0.5,
                cameraType: "back",
                maxHeight: 1080,
                maxWidth: 1080,
            });

            if (result.didCancel) {
                console.log("🚀 ~ AdminUpdate.js:43 ~ OpenCamera ~ result:", result)
                if (result.didCancel === true) {
                    showToast("error", "Camera operation canceled", "Camera operation canceled");
                }
            } else if (result.errorCode) {
                console.error(`🚨 Camera Error [${result.errorCode}]:`, result.errorMessage);
            } else {
                setcaptureImage(result.assets[0].uri);
                // console.log("📸 Photo captured successfully:", result.assets[0].uri);
            }

        } catch (error) {
            console.log("🚀 ~ AdminUpdate.js:55 ~ OpenCamera ~ error:", error.message)
        }
    };
    const handleUpdateLocker = useCallback(async () => {
        if (!adminValidation(state, showToast)) return;

        try {
            if (!captureImage) {
                showToast("error", "Please select a photo", "Please select a photo");
                return;
            }

            const { type } = getFileType(captureImage);


            const formData = new FormData();
            formData.append("name", state.name);
            formData.append("locker_no", state.locker_no)
            formData.append('code', state.code)
            formData.append("before", state.before)
            formData.append("status", state.status)
            formData.append('mobile', state.mobile)
            formData.append('shoe_size', state.shoe_size)
            formData.append('department', state.department)
            formData.append('isLeft', state.isLeft)
            formData.append("file", {
                uri: captureImage,
                name: `upload.${captureImage.split(".").pop()}`,
                type: type,
            });

            const data = await adminUpdateById(item._id, formData)

            if (data.message === "Admin locker updated successfully") {
                showToast("success", data.message, data.message);
                dispatch({ type: 'RESET' });
                preUpdate(data.beforeUpdate);
                goBack()
            } else if (data.errors && Array.isArray(data.errors)) {
                showToast("error", data.errors[0]?.msg || "An error occurred", data.errors[0]?.msg || "Error");
            } else if (data.message) {
                showToast("error", data.message, data.message);
            }
        } catch (error) {
            console.log("🚀 ~ AdminUpdate.js:80 ~ handleUpdateLocker ~ error:", error)
            showToast("error", "Update failed", error.message || "An error occurred");
        }
    }, [state, dispatch, goBack, showToast,]);

    const preUpdate = async (data) => {
        // styleConsole("🚀 ~ AdminUpdate.js:103 ~ preUpdate ~ data:", "preUpdate", data)

        try {
            const predata = await preAdminUpdate(data.sr_no, data.locker_no, data.code, data.name, data.status, data.mobile, data.department, data.shoe_size, data.image.public_id, data.image.url, data.before);
            // styleConsole("🚀 ~ AdminUpdate.js:110 ~ preUpdate ~ predata:", "preUpdate", predata)

            if (predata.error) {
                showToast("error", predata.error, predata.error);
            }
        } catch (error) {
            showToast("error", "Previous update failed", error.message || "An error occurred");
        }
    };



    return (
        <View style={[styles.container, { marginTop: insets.top }]}>
            <StatusBar barStyle={"dark-content"}></StatusBar>

            <BasicHeader />
            <CustomText variant='h1' fontSize={30} style={{ fontWeight: 'bold', marginTop: 20, }}>{"Update Admin Locker"}</CustomText>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >

                    <ScrollView >
                        {/* Image Section */}
                        <TouchableOpacity style={{ width: width, alignItems: 'center', justifyContent: 'center' }} onPress={() => {
                            OpenCamera()
                        }}>
                            <View style={styles.image_Container}>
                                <Image
                                    source={captureImage ? { uri: captureImage } : (item?.image?.url ? { uri: item.image.url } : require("../../../util/image/holder.jpg"))}
                                    style={styles.image}
                                />
                            </View>
                        </TouchableOpacity>


                        {
                            loading === true ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <ActivityIndicator size="large" color={AllColor.black} />
                            </View>
                                :
                                adminInputDataForUpdate.map((inputItem) => (
                                    <Input
                                        key={inputItem.field}
                                        IconCategoryName={inputItem.IconCategoryName}
                                        IconName={inputItem.IconName}
                                        placeholder={`Enter your ${inputItem.field}`}
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
                            ButtonTitle={"Update"}
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

export default AdminUpdate;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: AllColor.white
    },
    image_Container: {
        width: 120,
        height: 120,
        borderRadius: 120 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderColor: AllColor.Androidgreen,
        borderWidth: 1,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 120 / 2,
    },
});


