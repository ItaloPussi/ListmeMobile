import React, { useContext } from 'react'
import {StyleSheet, View, FlatList} from 'react-native'
import { TasksContext } from '../context/TasksContext'
import TodoItem from './TodoItem';

export default function TodoContainer() {
    const {todos} = useContext(TasksContext)
    return (
            <View style={styles.list}>
                <FlatList 
                    data ={todos}
                    renderItem={({item})=> (
                    <TodoItem item={item}/>
                    )}
                />
            </View>
    )
}

const styles = StyleSheet.create({
    list: {
        marginTop: 20,
        flex: 1,
      },
})