import React, { useContext } from 'react'
import {StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View} from 'react-native'
import { FontAwesome, MaterialIcons  } from '@expo/vector-icons'; 
import { TasksContext } from '../context/TasksContext';
import { todayIsWeekday } from '../utils/functions';

export default function TodoItem({item}) {
    const {completedHandler, deleteHandler, editHandler} = useContext(TasksContext)
    const colorsByTypes = ["","rgba(220, 34, 29, 0.8)","rgba(0, 255, 0, 0.6)", "rgb(0, 0, 255)", "rgba(255, 0, 255, 0.6)", "rgba(0, 255, 255, 0.6)", "rgba(255, 255, 0, 1)", "rgb(255, 123, 0)", "rgb(161, 128, 74)", "rgba(0,0, 0, 0.2)"]

    if(new Date(item.initialDisplayDay.replace("-","/")) > new Date()) return null
    if(new Date(item.frequencyDate) > new Date()) return null
    if(item.frequency === "7" && !todayIsWeekday()) return null
    
    return (
        <View style={styles.container}>
            <View style={styles.taskText}>
                <FontAwesome name="circle" size={8} color={colorsByTypes[item.type]}/>

                <TouchableNativeFeedback onPress={()=> completedHandler(item.id)}>
                    <Text style={[styles.item, item.completed && styles.completed]}>
                        {item.value}
                    </Text>
                </TouchableNativeFeedback>
            </View>
            
            <View style={styles.taskButtons}>
                <TouchableOpacity onPress={()=>editHandler(item)}>
                    <MaterialIcons name="edit" size={24} color="green"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={()=>deleteHandler(item.id)}>
                    <FontAwesome name="trash-o" size={24} color="red"/>
                </TouchableOpacity>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        flexDirection: "row",
        borderBottomWidth: 1,
        borderStyle: "dashed",
        borderColor: "#rgba(204,204,204,0.2)",
    },
    item: {
        padding: 16,
        color: "#bbb",
        flex: 1,
    },
    completed: {
        textDecorationLine: "line-through",
    },
    taskButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "15%",
        marginRight: 10
    },
    taskText: {
        width: "80%",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 10,
    }
})