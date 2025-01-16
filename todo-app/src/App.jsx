import { useState, useEffect } from 'react'
import './App.css'

function App() {
    const [input_value, setInput_vale] = useState('');
    const [newTask, setNewTask] = useState("");
    const [data, setData] = useState([]);

  const addTask = ()=> {
    if(input_value !== ""){
      setNewTask(input_value);
      createTask(newTask);
      setInput_vale("");
      obtainData();
    }

  
   

  }
      const obtainData = async ()=> {
        try {
            const res = await fetch("http://localhost:3000/tasks");
            const data = await res.json()
            setData(data);

        }
        catch(error) {
          console.log(error.message);
        }
      }

      useEffect(()=> {
        obtainData()
      },[]);



      const createTask = async ()=> {
        try{
            const res = await fetch("http://localhost:3000/tasks", {
              "method": "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body:JSON.stringify({
                tasks: input_value,
              }),
            })
            const data = await res.json();
            obtainData();
            console.log("the new task is here", data);
        }

        catch(error) {
          console.log(error.message);
        }

      }


  


      const deleteTask = async (id)=> {
        try{
          const res = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: "DELETE",

        });

          if(res.ok) {
            obtainData();
            console.log("task deleted")
          }
        
        }
        catch(error) {
          console.log(error.message);
          console.log("failed to delete task");
        }
      }


      const updateTask = async (id, task)=> {
      
        try{
            const res = await fetch(`http://localhost:3000/tasks/${id}`, {
              method: 'PUT',
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                tasks: input_value,
              })
            });

            const data = await res.json();
            obtainData();
            deleteTask(id)
            setInput_vale(task);
        }
        catch(error) {
          console.log(error.message);
        }
      }
 
  return (
    <>
          <h1> Fullstack Todo App</h1>

          <div className="inp">
            <input type="text"  placeholder='Write a task' value={input_value} onChange={(e)=> setInput_vale(e.target.value)} />
            <button onClick={addTask}>Add</button>
          </div>

          <section>
            {
              data.map((task, index)=> {
                return(
                  <ul key={index}>
                  <li> {task.tasks}<button onClick={()=> deleteTask(task._id, task.tasks)}>Delete</button>  <button onClick={()=> updateTask(task._id, task.tasks)}>Update</button></li>
                </ul> 
                )
              })
            }
          
              
            
          </section>
    </>
  )
}

export default App
