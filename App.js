import React from 'react'
import Container from './components/Container';
import {TasksProvider } from './context/TasksContext';

export default function App() {
  return (
    <TasksProvider>
      <Container />
    </TasksProvider>
  );
}

