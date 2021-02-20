import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import AddTodo from './components/AddTodo';
import Header from './components/Header';
import TodoItem from './components/TodoItem';

export default function App() {

  const [todos, setTodos] = useState([
    {text: "Task 1", completed: false, key: "1", type:1},
    {text: "Task 2", completed: false, key:"2", type:2},
    {text: "Task 3", completed: false, key: "3", type:3},
    {text: "Task 4", completed: false, key: "4", type:4},
    {text: "Task 5", completed: false, key: "5", type:5},
    {text: "Task 6", completed: false, key: "6", type:6},
    {text: "Task 7", completed: false, key: "7", type:7},
    {text: "Task 8", completed: false, key: "8", type:8},
    {text: "Task 9", completed: false, key: "9", type:9},
  ])

  const [edit, setEdit] = useState(false)

  const completedHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.map(todo => {
        if(todo.key != key){
          return todo
        }else {
          return {
            ...todo,
            completed: !todo.completed
          }
        }
      })
    })
  }

  const deleteHandler = key => {
    setTodos((prevTodos) => (
      prevTodos.filter(todo => todo.key !== key)
    ))
  }

  const editHandler = item => {
    setEdit(item)
  }

  const submitHandler = (text, setText, selectedType) => {
    if(edit !== false){
      setTodos((prevTodos)=> {
        return prevTodos.map(todo => {
          if(todo.key !== edit.key) {
            return todo
          }else {
            return {
              ...todo,
              text: text,
              completed: false,
            }
          }
          
        })
      })
    }else{
      setTodos((prevTodos)=> {
        return [
          ...prevTodos,
          {
            text,
            key: Math.random().toString(),
            type: selectedType,
          }
  
        ]
      })
      setText("")
    }
    setEdit(false)
  }

  
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
          <AddTodo submitHandler={submitHandler} edit={edit} />
          <View style={styles.list}>
            <FlatList 
              data ={todos}
              renderItem={({item})=> (
                <TodoItem item={item} completedHandler={completedHandler} deleteHandler={deleteHandler} editHandler={editHandler} />
              )}
            />
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282828',
  },
  content: {
    paddingVertical: 40,
    flex: 1,
  },
  list: {
    marginTop: 20,
    flex: 1,
  },
});
