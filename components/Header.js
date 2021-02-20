import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

export default function Header(){
    return (
        <View style={styles.header}>
            <Text style={styles.title}>ListMe</Text>
        </View>
    )
} 

const styles = StyleSheet.create({
    header: {
        height: 30,
        paddingTop: 38,
    },
    title: {
        textAlign: "center",
        color: "#9b9b9b",
        fontSize: 20,
        fontWeight: 'bold'
    },
})