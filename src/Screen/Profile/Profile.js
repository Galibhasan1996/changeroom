import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView, TextInput, Alert, ActivityIndicator, Modal, Dimensions, StatusBar, useColorScheme } from 'react-native'
import React, { useState, useEffect } from 'react'

const Profile = () => {
    return (
        <View style={styles.container}>
            <Text>Profile</Text>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }
})