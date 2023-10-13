import { Router } from "express";


const authRouter = Router() ; 

authRouter.post('/registrar', (req,res)=>{
    res.send("registrar")
}); 


authRouter.post('/login', (req,res)=>{
    res.send('Login')
})


