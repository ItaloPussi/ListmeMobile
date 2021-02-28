import React from 'react';
import { StyleSheet, View} from 'react-native';
import AddTodo from './AddTodo';
import Header from './Header';
import TodoContainer from './TodoContainer';

export default function Container(){

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.content}>
                <AddTodo />
                <TodoContainer />
            </View>
        </View>
    )
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
  });