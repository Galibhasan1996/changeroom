import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const CustomDatePicker = ({ visible = false, value = new Date(), mode = 'date', onChange = () => { }, minimumDate = new Date(2020, 1, 31), maximumDate = new Date(2050, 1, 31), display = 'spinner', themeVariant = 'dark', }) => {
    if (!visible) return null;

    return (
        <DateTimePicker
            testID="dateTimePicker"
            value={value}
            mode={mode}
            is24Hour={true}
            display={display}
            onChange={onChange}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            themeVariant={themeVariant}
        />
    );
};

export default CustomDatePicker;
