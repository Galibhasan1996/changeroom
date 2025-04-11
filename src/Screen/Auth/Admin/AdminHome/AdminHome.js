import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView, TextInput, Alert, ActivityIndicator, Modal, Dimensions, StatusBar, useColorScheme } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useCustomStyle, height, width } from '../../../../Hook/Style/Style'

const AdminHome = () => {
    const { CustomStyle, isDark } = useCustomStyle()
    return (
        <View style={[styles.container,]}>
            <Text >AdminHome</Text>
        </View>
    )
}

export default AdminHome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }
})