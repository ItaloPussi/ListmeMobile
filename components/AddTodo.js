import React, {useState, useEffect} from 'react'
import {StyleSheet, TextInput, Button, View} from 'react-native'

export default function AddTodo({submitHandler, edit}){
    const [text, setText] = useState()
    
    useEffect(()=>{
        if(edit === false){
            setText("")
        }else{
            setText(edit.text)
        }
    }, [edit])

    const changeHandler = (val) => {
        setText(val)
    }

    return (
        <View>
            <TextInput 
                style={styles.input}
                placeholder="New todo..."
                onChangeText={changeHandler}
                value={text}
            />
            <Button onPress={()=>submitHandler(text, setText)} title={edit === false ? "add todo" : "edit"} color='#2d2d2d'/>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    }
})