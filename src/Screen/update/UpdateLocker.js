import React, { useCallback, useReducer, useState } from 'react';
import { Image, KeyboardAvoidingView, PermissionsAndroid, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard, Switch, Text } from 'react-native';
import { width } from '../../Hook/Style/Style';
import Input from '../../Component/Input/Input';
import Button from '../../Component/Button/Button';
import { getInitialStateForUpdate, InputDataForUpdate, reducerForUpdate, } from '../../Component/Input/inputData/InputData';
import BasicHeader from '../../Component/Header/BasicHeader/BasicHeader';
import { useRoute } from '@react-navigation/native';
import { validateUpdata } from '../../util/helper/validation/Validation';
import { previosUpdateLocker, } from '../../service/api/login/UserLogin';
import { BASE_URL, getFileType, showToast, styleConsole } from '../../util/helper/Helper';
import { launchCamera, } from 'react-native-image-picker';
import { UserStorage } from '../../store/Store';
import { goBack, } from '../../navigator/NavigationREF/NavigationRef';
import AllColor from '../../util/color/Color';
import CustomText from '../../Component/Text/Text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../Hook/Auth/useAuth';

const UpdateLocker = () => {
    const insets = useSafeAreaInsets();
    const route = useRoute();
    const { item = {} } = route.params || {};
    // styleConsole("🚀 ~ UpdateLocker.js:24 ~ UpdateLocker ~ item:", "UpdateLocker", { type }, { item })



    const { updateLockerById, loading } = useAuth()



    const token = UserStorage.getItem("token")

    const [captureImage, setcaptureImage] = useState(item?.image?.url ? item?.image?.url : null);



    const [state, dispatch] = useReducer(reducerForUpdate, getInitialStateForUpdate(item));








    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'App needs access to your camera.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                await OpenCamera();
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.log("Permission error:", err);
            return false;
        }
    };

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
                // console.log("🚀 Camera operation canceled:", result);
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
            console.log("🚀 ~ UpdateLocker.js:100 ~ OpenCamera ~ error:", error)

        }
    };
    const handleUpdateLocker = useCallback(async () => {
        if (!validateUpdata(state, showToast)) return;

        try {
            const data = await updateLockerById(
                state.code, state.name, state.role, state.status,
                Number(state.mobile), state.department,
                Number(state.shoe_size), Number(state.aadhar),
                state.address, state.isLeft, item._id, token
            );
            styleConsole("🚀 ~ UpdateLocker.js:103 ~ handleUpdateLocker ~ data:", "UpdateLocker", data.updateLocker)


            if (data.message === "Locker updated successfully") {
                showToast("success", data.message, data.message);
                dispatch({ type: 'RESET' });
                preUpdate(data.previousLocker);
                goBack()
            } else if (data.errors && Array.isArray(data.errors)) {
                showToast("error", data.errors[0]?.msg || "An error occurred", data.errors[0]?.msg || "Error");
            } else if (data.message) {
                showToast("error", data.message, data.message);
            }
        } catch (error) {
            showToast("error", "Update failed", error.message || "An error occurred");
        }
    }, [state, dispatch, goBack, showToast, preUpdate]);

    const preUpdate = async (data) => {
        try {
            const predata = await previosUpdateLocker(
                data.combine, data.sr_no, data.location,
                data.locker_no, data.unit, data.code, data.name,
                data.role, data.status, data.mobile, data.department,
                data.shoe_size, data.aadhar, data.address, data.image.public_id, data.image.url
            );

            if (predata.error) {
                showToast("error", predata.error, predata.error);
            }
        } catch (error) {
            showToast("error", "Previous update failed", error.message || "An error occurred");
        }
    };


    const updatePhoto = async () => {
        try {

            if (!captureImage) {
                showToast("error", "Please select a photo", "Please select a photo");
                return;
            }

            const { type } = getFileType(captureImage);

            const formData = new FormData();
            formData.append("file", {
                uri: captureImage,
                name: `upload.${captureImage.split(".").pop()}`,
                type: type,
            });

            const response = await fetch(`${BASE_URL}auth/updateUserPhoto/${item._id}`, {
                method: "PUT",

                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
            // styleConsole("🚀 ~ UpdateLocker.js:165 ~ updatePhoto ~ response:", "update image data", response)

        } catch (error) {
            console.log("🚀 ~ UpdateLocker.js:168 ~ updatePhoto ~ error:", error)

            return { message: "Upload failed" };
        }
    };



    return (
        <View style={[styles.container, { marginTop: insets.top }]}>
            <StatusBar barStyle={"dark-content"}></StatusBar>

            <BasicHeader />
            <CustomText variant='h1' fontSize={30} style={{ fontWeight: 'bold', marginTop: 20, }}>{"Update Locker"}</CustomText>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >

                    <ScrollView >
                        {/* Image Section */}
                        <TouchableOpacity style={{ width: width, alignItems: 'center', justifyContent: 'center' }} onPress={async () => {
                            const permissionGranted = await requestCameraPermission();
                            if (permissionGranted) {
                            } else {
                                showToast("error", "Camera permission required", "Please enable camera access to upload an image.");
                            }
                        }}>
                            <View style={styles.image_Container}>
                                <Image
                                    source={captureImage ? { uri: captureImage } : (item?.image?.url ? { uri: item.image.url } : require("../../util/image/holder.jpg"))}
                                    style={styles.image}
                                />
                            </View>
                        </TouchableOpacity>


                        {/* Input Fields */}
                        {InputDataForUpdate.map((inputItem) => (
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
                        ))}


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
                            onPress={async () => {
                                await handleUpdateLocker()
                                await updatePhoto()
                            }}
                        />
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </View>

    );
};

export default UpdateLocker;

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
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 120 / 2,
    },
});
