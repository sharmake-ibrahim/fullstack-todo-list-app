const express = require("express");
const app = express()
const mongoose = require('mongoose');
const PORT = 3000;
const   Tasks = require("./models/Tasks");
app.use(express.json())

const cors = require("cors");

app.use(cors({
    origin: "https://fullstack-todo-list-app.vercel.app", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true 
}));



/* sharmakeahmedibrahim */
/* wSoAb886oSjTcz2D */


// mongodb+srv://sharmakeahmedibrahim:wSoAb886oSjTcz2D@mybackend.9swak.mongodb.net/?retryWrites=true&w=majority&appName=mybackend

app.get("/",  (req, res)=> {
    res.send("fullstack Todo App");
})

app.get("/tasks", async (req, res)=> {
    try {
        const task = await Tasks.find({}); 
        
        res.status(200).json(task);

    }

    catch(error) {
        res.status(500).json({message: error.message});
    }
})


app.get("/tasks/:id", async (req, res)=> {
    try{
        const {id} = req.params;
        const task = await Tasks.findById(id);
        res.status(200).json(task)
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
})

app.post("/tasks", async (req, res)=> {
    try {
            const tasks = await Tasks.create(req.body);
            res.status(200).json(tasks);
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
})

app.put("/tasks/:id", async (req, res)=> {
    try{
        const {id} = req.params;
        const task = await Tasks.findByIdAndUpdate(id, req.body);
        if(!task) {
            return res.status(404).json({ message: "task not found" });
        }
            const updatedTask = await Tasks.findById(id);
            res.status(200).json(updatedTask);
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
})



app.delete("/tasks/:id", async (req, res)=> {
    try{
        const {id} = req.params;
        const task = await Tasks.findByIdAndDelete(id);
        if(!task) {
            return res.status(404).json({message: "task not found"});
        }

        res.status(200).json({message: "Task deleted successfully"});

    }

    catch(error) {
        res.status(500).json({message: error.message});
    }
})





mongoose.connect('mongodb+srv://sharmakeahmedibrahim:wSoAb886oSjTcz2D@mybackend.9swak.mongodb.net/?retryWrites=true&w=majority&appName=mybackend')

.then(() => {
    console.log('Connected!')
    
app.listen(PORT, ()=> {
    console.log(`Server is listening port ${PORT}`)
 
})

}) 
.catch( ()=> {
    console.log("Connection to database failed");
})

