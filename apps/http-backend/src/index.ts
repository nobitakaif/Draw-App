import express from "express"
import jwt  from "jsonwebtoken"
import  {JWT_SCRETE}  from "@repo/backend-common/config"
import { middleware } from "./middleware"
import {CreateRoomSchema, CreateUserSchema, SigninSchema} from "@repo/common/zod-types"

const app = express()

app.post("/signup",function (req,res){

    const data = CreateUserSchema.safeParse(req.body)

    if(!data.success){
        res.status(403).send({
            msg:"wrong input fromat"
        })
        console.log(data.error)
        return
    }

    res.status(200).send({
        userId:'3932'
    })

})

app.post("/signin",function (req,res){

    const data = SigninSchema.safeParse(req.body)

    if(!data.success){
        res.status(403).send({
            msg:"wrong input fromat"
        })
        console.log(data.error)
        return
    }
    
    const userId = 1
    const token = jwt.sign({
        userId
    },JWT_SCRETE)
    
    res.send({
        token
    })

})

app.post("/room",middleware,function (req,res){
    const data = CreateRoomSchema.safeParse(req.body)

    if(!data.success){
        res.status(403).send({
            msg:"wrong input fromat"
        })
        console.log(data.error)
        return
    }

    res.status(200).send({
        roomId:"23123"
    })
})


app.listen(3002,()=>{
    console.log("htt-server is running port on 3002")
})

