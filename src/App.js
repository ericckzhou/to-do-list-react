
import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import './styles.css'

/*for random ids*/
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const LOCAL_STORAGE_KEY = 'todoApp'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()
  
  useEffect(() => { //store/load, called once
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) //parse string to array
    if (storedTodos) setTodos(storedTodos)
  }, []) //empty array never changes => called once

  useEffect(() => { //set, pass in a fcn and array => refresh stores it
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos]) //anytime todos array changes, it uses this effect


  function toggleTodo(id){
    const newTodos = [...todos]
    //to not change state variable todos, create cpy
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function addToDo(event){
    const name = todoNameRef.current.value
    if (name == '') return
    
    setTodos(prevTodos =>{
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }
  function clearTodos(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)

  }
  return (
    <>
    {/*empty fragment*/}
    <TodoList todos = {todos} toggleTodo={toggleTodo} />
    <input ref={todoNameRef} type="text" />
    <button onClick={addToDo}>Add Todo</button>
    <button onClick={clearTodos}>Clear Completed</button>
    <div> {todos.filter(todo => !todo.complete).length} left to do!</div> 
    {/*filters non checked*/}
    </>
  );
}

export default App;
