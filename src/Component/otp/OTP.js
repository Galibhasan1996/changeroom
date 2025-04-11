import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import AllColor from '../../util/color/Color';

const OTPInput = ({ length = 6, onComplete }) => {

    const [otp, setOtp] = useState(Array(length).fill(''));

    const inputs = useRef([]);

    const handleChange = (text, index) => {
        if (text.length > 1) text = text[text.length - 1];
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text && index < length - 1) {
            inputs.current[index + 1].focus();
        }

        if (newOtp.every(num => num !== '')) {
            onComplete && onComplete(newOtp.join(''));
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    return (
        <View style={styles.container}>
            {otp.map((digit, index) => (
                <TextInput
                    key={index}
                    ref={(ref) => (inputs.current[index] = ref)}
                    style={[styles.input, {
                        borderColor: digit ? AllColor.black : AllColor.gray,
                        color: AllColor.black,
                        borderWidth: digit ? scale(1) : scale(0.5),
                    }]}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={digit}
                    onChangeText={(text) => handleChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    autoFocus={index === 0}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    input: {
        width: 40,
        height: 50,
        borderWidth: 1,
        textAlign: 'center',
        fontSize: 18,
        marginHorizontal: scale(5),
        marginVertical: scale(20),
        borderRadius: scale(5),
    },
});

export default OTPInput;
