import express from "express"
import { pool } from "./config/databaseConnection.js";
const app = express(); 

app.get('/', (req,res) =>{
    res.send("hello world")
})

const getUsers=async ()=>{
   try {
    const res=await pool.query('select nombre from usuario')
    console.log(res.rows)
    pool.end();
   } catch (error) {
    console.log(error)
   }
  }

  
getUsers();

app.listen(3000, ()=>{console.log("server is running on port 3000") })
