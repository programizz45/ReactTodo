import React, { useState , useEffect } from 'react'

import './App.css'
import { Todoprovider } from './Context';
import { TodoForm, TodoItem } from './components';

function App() {
  
 const[todos , settodo] = useState([])  ;
   const addTodo = (todo)=>{
    settodo((prev)=>[{id:Date.now() , ...todo}  , ...prev ])
   }
   // finding id of ech elem and if id matches replece todo else remian  same
   const updateTodo = (id , todo)=>{
    settodo((prev)=> prev.map((prevTodo)=>(prevTodo.id===id ? todo : prevTodo)))
   }
    // Arrayb contains only elemeny which are not eq to id 
   const deleteTodo = (id)=>{
    settodo((prev)=>prev.filter((prevTodo)=>prevTodo.id !== id))
   }
   // check first if it matches to id if yes then chnaage completed  to true else false 
   // the ! is use to inverse like if true is there then false and vice versa
   const  completeTodo = (id)=>{
      settodo((prev)=> prev.map((prevTodo)=>prevTodo.id === id ? {...prevTodo , completed: !prevTodo.completed} :prevTodo))
   }

   useEffect(()=>{
        const todos = JSON.parse(localStorage.getItem("todos"))
        if(todos && todos.length > 0){
          settodo(todos)
        }
   } , [])
// this is to save  data in local storage
   useEffect(()=>{
        localStorage.setItem("todos" , JSON.stringify(todos))
   } , [todos])



  return (
    <>
    <Todoprovider value={{todos,
      addTodo , updateTodo , deleteTodo ,  completeTodo
    }}>
     <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full  mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                       <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo)=>(
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoItem todo = {todo} />
                           
                          </div>
                        ))}
                    </div>
                </div>
            </div>
          </Todoprovider>
    </>
  )
}

export default App
