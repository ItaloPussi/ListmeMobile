import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import AddTodo from './components/AddTodo';
import Header from './components/Header';
import TodoItem from './components/TodoItem';

export default function App() {
  const [todos, setTodos] = useState([
    {text: "Buy coffee", key: "1"},
    {text: "Create an app", key:"2"},
    {text: "Play on the switch", key: "3"}
  ])

  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.key != key)
    })
  }

  const submitHandler = (text) => {
    setTodos((prevTodos)=> {
      return [
        ...prevTodos,
        {
          text,
          key: Math.random().toString()
        }

      ]
    })
  }
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList 
              data ={todos}
              renderItem={({item})=> (
                <TodoItem item={item} pressHandler={pressHandler} />
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
    backgroundColor: '#fff',
  },
  content: {
    padding: 40,
    flex: 1,
  },
  list: {
    marginTop: 20,
    flex: 1,
  },
});
