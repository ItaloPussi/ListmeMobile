import React, { useContext } from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import { FontAwesome5  } from '@expo/vector-icons'; 
import { TasksContext } from '../context/TasksContext';

export default function Header(){
    const {resetItems, uploadItems} = useContext(TasksContext)
    return (
        <View style={styles.header}>
            <Text style={styles.title}>ListMe</Text>
            <TouchableOpacity onPress={resetItems} style={styles.syncButton}>
                <FontAwesome5 name="sync" size={18} color="#9b9b9b" />
            </TouchableOpacity>
            <TouchableOpacity onPress={uploadItems} style={styles.uploadButton}>
                <FontAwesome5 name="upload" size={18} color="#9b9b9b" />
            </TouchableOpacity>
        </View>
    )
} 

const styles = StyleSheet.create({
    header: {
        height: 30,
        paddingTop: 38,
        position: "relative"
    },
    title: {
        textAlign: "center",
        color: "#9b9b9b",
        fontSize: 20,
        fontWeight: 'bold'
    },
    syncButton: {
        position: 'absolute',
        right: 20,
        top: 44,
    },
    uploadButton: {
        position: 'absolute',
        left: 20,
        top: 44,  
    }
})