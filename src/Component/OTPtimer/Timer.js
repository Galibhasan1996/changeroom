import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import AllColor from '../../util/color/Color';
import { scale } from 'react-native-size-matters';

const Timer = ({ onPress, style }) => {
    const [timer, setTimer] = useState(30);

    useEffect(() => {
        if (timer === 0) return;
        const intervalId = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timer]);

    const handleResend = () => {
        setTimer(30);
        onPress && onPress();
    };

    return (
        <View style={[styles.container, style]}>
            <Text style={styles.timerText}>{timer > 0 ? `Resend OTP in ${timer}s` : `Didn’t receive the OTP ?`}</Text>
            {
                timer === 0 && (
                    <TouchableOpacity onPress={handleResend}>
                        <Text style={styles.resendText}>Resend OTP</Text>
                    </TouchableOpacity>
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: scale(10),
        // backgroundColor: "red",
        flexDirection: "row",
        alignItems: 'center',
    },
    timerText: {
        fontSize: scale(13),
        color: AllColor.black,
    },
    resendText: {
        fontSize: scale(13),
        color: AllColor.fablue,
        fontWeight: 'bold',
    },
});

export default Timer;


