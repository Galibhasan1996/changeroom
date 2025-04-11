import { StyleSheet, StatusBar } from 'react-native';

export default StyleSheet.create({
    statusBarMargin: {
        marginTop: StatusBar.currentHeight || 0,
    },
});

