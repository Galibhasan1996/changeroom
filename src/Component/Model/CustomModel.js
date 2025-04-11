import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import React from 'react';
import AllColor from '../../util/color/Color';
import { height, width } from '../../Hook/Style/Style';
import { scale } from 'react-native-size-matters';

const CustomModel = ({ visible, setvisible, onDelete }) => {
    return (
        <Modal visible={visible} animationType="fade" transparent={true}>
            <View style={styles.container}>
                <View style={styles.centerView}>
                    <Text style={styles.emoji}>😢</Text>
                    <Text style={styles.titleText}>Are you sure you want to delete?</Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={() => setvisible(false)}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.deleteButton]}
                            onPress={onDelete}
                        >
                            <Text style={styles.deleteText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default CustomModel;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AllColor.totalTransparent,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerView: {
        width: width * 0.9,
        height: height * 0.28,
        backgroundColor: AllColor.white,
        borderRadius: scale(10),
        elevation: scale(5),
        shadowColor: AllColor.black,
        shadowOffset: { width: scale(5), height: scale(5) },
        shadowOpacity: 0.3,
        shadowRadius: scale(5),
        padding: scale(20),
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    emoji: {
        fontSize: scale(40),
        marginBottom: scale(10),
    },
    titleText: {
        fontSize: scale(18),
        fontWeight: 'bold',
        textAlign: 'center',
        color: AllColor.black,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: scale(20),
    },
    button: {
        flex: 1,
        paddingVertical: scale(10),
        marginHorizontal: scale(5),
        borderRadius: scale(8),
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: AllColor.white5,
    },
    deleteButton: {
        backgroundColor: AllColor.red,
    },
    cancelText: {
        color: AllColor.black,
        fontSize: scale(14),
        fontWeight: '600',
    },
    deleteText: {
        color: AllColor.white,
        fontSize: scale(14),
        fontWeight: '600',
    },
});
