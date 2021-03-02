import React, { createContext, useState, useEffect } from "react";
import { FirebaseDownload, FirebaseUpload } from '../Firebase/FirebaseSetup';
import { formatedDate } from "../utils/functions";

export const TasksContext = createContext({})

export function TasksProvider({children, ...rest}){
  const [todos, setTodos] = useState([])
  const [edit, setEdit] = useState(false)
  const [currentID, setCurrentID] = useState(0)

  const todosSetter = items => {
    const cleanItems = items.map(item => {
      return {
        ...item,
        initialDisplayDay: item.initialDisplayDay.replace(/-/g,"/"),
        frequencyDate: item.frequencyDate == false ? item.frequencyDate : item.frequencyDate.replace(/-/g,"/")
      }
    })
    setTodos(cleanItems)
    setCurrentID(Math.max.apply(Math, items.map(function(item) { return item.id; })) + 1)

  }

  const deleteHandler = id => {
    setTodos((prevTodos) => (
      prevTodos.filter(todo => todo.id !== id)
    ))
  }

  const editHandler = item => {
    setEdit(item)
  }

  const uploadItems = () => {
    FirebaseUpload(todos)
  }

  useEffect(()=>{
    FirebaseDownload(todosSetter)
  },[])
  
  const resetItems = () => {
      let newTodos = todos.map(todo=>{
          if(!todo.completed || todo.frequency == "7"){
              return todo
          }

          if(todo.frequency == "1"){
              return false
          }

          if(todo.frequency == "6" && todo.dynamics.currentValue >= todo.dynamics.maxValue){
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
             case "6":
                  schedule.setDate(schedule.getDate()+1)
                  todo.value = todo.value.replace(todo.dynamics.currentValue, parseInt(todo.dynamics.currentValue)+1)
                  todo.dynamics.currentValue = parseInt(todo.dynamics.currentValue)+1
          }

          return {
              ...todo,
              frequencyDate: formatedDate(schedule) 
          }
      })
      newTodos = newTodos.filter(todo => todo !== false)
      setTodos(newTodos)
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

  const submitHandler = (value, setText, selectedType, selectedFrequency, initialDisplayDay, currentValue, maxValue) => {
    if(value === "") return
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
        let dynamics = false
        if (selectedFrequency == "6"){
          dynamics = {
            currentValue,
            maxValue
          }
          value = value.replace("$", currentValue)
        }
        return [
          ...prevTodos,
          {
            completed: false,
            dynamics,
            frequency: selectedFrequency,
            frequencyDate: initialDisplayDay,
            id: String(currentID),
            initialDisplayDay,
            type: selectedType,
            value,
          }
  
        ]
      })
      setText("")
      setCurrentID(currentID + 1)
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
            resetItems,
            uploadItems
        }} >
            {children}
        </TasksContext.Provider>
    )
}

