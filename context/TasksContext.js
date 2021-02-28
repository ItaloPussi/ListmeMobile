import React, { createContext, useState, useEffect } from "react";
import FirebaseSetup from '../Firebase/FirebaseSetup';
import { formatedDate } from "../utils/functions";

export const TasksContext = createContext({})

export function TasksProvider({children, ...rest}){
  const [todos, setTodos] = useState([])
  const [edit, setEdit] = useState(false)

  const todosSetter = items => {
    console.log(items)
    console.log("-----------------------------------")
    setTodos(items)
  }

  const deleteHandler = id => {
    setTodos((prevTodos) => (
      prevTodos.filter(todo => todo.id !== id)
    ))
  }

  const editHandler = item => {
    setEdit(item)
  }

  useEffect(()=>{
    FirebaseSetup(todosSetter)
  },[])
  
  const resetItems = () => {
      let newTodos = todos.map(todo=>{
          if(!todo.completed || todo.frequency == "6" || todo.frequency == "7"){
              return todo
          }

          if(todo.frequency == "1"){
              return false
          }

          const schedule = new Date(todo.frequencyDate)
          switch(todo.frequency){
              case "2":
                  schedule.setDate(schedule.getDate()+1)
                  break
              case "3":
                  schedule.setDate(schedule.getDate()+7)
                  break
              case "4":
                  schedule.setDate(schedule.getDate()+30)
                  break
             case "5":
                  schedule.setDate(schedule.getDate()+14)
                  break
          }

          return {
              ...todo,
              frequencyDate: formatedDate(schedule) 
          }
      })
      newTodos = newTodos.filter(todo => todo !== false)
      setTodos(newTodos)
      console.log(newTodos)
  }
  const completedHandler = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map(todo => {
        if(todo.id != id){
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

  const submitHandler = (value, setText, selectedType, selectedFrequency, displayDay) => {
    if(edit !== false){
      setTodos((prevTodos)=> {
        return prevTodos.map(todo => {
          if(todo.id !== edit.id) {
            return todo
          }else {
            return {
              ...todo,
              value,
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
            value,
            key: Math.random().toString(),
            type: selectedType,
            frequency: selectedFrequency,
            frequencyDate: displayDay,
            displayDay
          }
  
        ]
      })
      setText("")
    }
    setEdit(false)
  }
    return (
        <TasksContext.Provider value={{
            todos,
            edit,
            todosSetter,
            deleteHandler,
            editHandler,
            completedHandler,
            submitHandler,
            resetItems
        }} >
            {children}
        </TasksContext.Provider>
    )
}

