import express, { Request, response } from "express"
import jwt  from "jsonwebtoken"
import  {JWT_SCRETE}  from "@repo/backend-common/config"
import { middleware } from "./middleware"
import {CreateRoomSchema, CreateUserSchema, SigninSchema} from "@repo/common/zod-types"
import {prismaClient} from "@repo/db/client"
import bcrypt from "bcrypt"


const app = express()
app.use(express.json())
app.post("/signup", async function (req,res){

    const data = CreateUserSchema.safeParse(req.body)


    if(!data.success){
        res.status(403).send({
            msg:"wrong input fromat"
        })
        console.log(data.error)
        return
    }
    const hashedPassword = await bcrypt.hash(data.data.password,5)
    try{
        const reponse = await prismaClient.user.findFirst({
            where:{
                email:data.data.email
            }
        })
        if(reponse){
            res.status(403).send({
                msg:"you're already logged in"
            })
            return 
        }
        const addedResponse = await prismaClient.user.create({
            data:{  
                email: data.data.email,
                password: hashedPassword
            }
        })
        res.status(200).send({
            id:addedResponse.id,
            msg:"you're successfully logged-in"
        })
    }
    catch(e){
        res.status(500).send({
            msg:"maybe db crashed"
        })
    }

   

})

app.post("/signin",async function (req,res){

    const data = SigninSchema.safeParse(req.body)

    if(!data.success){
        res.status(403).send({
            msg:"wrong input fromat"
        })
        console.log(data.error)
        return
    }

    try{
        const reponse =  await prismaClient.user.findFirst({
            where:{
                email:data.data.email,
            }
        })
        if(!reponse){
            res.status(403).send({
                msg:"user not found"
            })
            return
        }
        const passwordChecking = await bcrypt.compare(data.data.password,reponse?.password )
        if(!passwordChecking){
            res.status(403).send({
                msg:"password is incorrect"
            })
            return 
        }
        const token = jwt.sign({
            userId:reponse.id
        },JWT_SCRETE)
        res.status(200).send({
            msg:"right credentials",
            token:token
        })
    }catch(e){
        res.status(403).send({
            msg:"maybe db crashed or user not found or password is incorrect",
            error:e
        })
        return
    }
    
})

app.post("/room",middleware,async function (req,res){
    const data = CreateRoomSchema.safeParse(req.body)

    if(!data.success){
        res.status(403).send({
            msg:"wrong input fromat"
        })
        console.log(data.error)
        return
    }
    // @ts-ignore
    const userId= req.userId
    try{
        const response = await prismaClient.room.create({
            data:{
                slug : data.data.username,
                adminId:userId
            }
        })
        res.status(200).send({
            roomId:response.id
        })
    }catch(e){
        res.status(403).send({
            msg:"Room is already exist with this name"
        })
    }

})

app.get("/chats/:roomId",middleware,async (req,res)=>{
    const roomId = Number(req.params.roomId)

    const message = await prismaClient.chat.findMany({ // we want too many list of data so this is way findMany()
        where:{
            roomId:roomId
        },
        orderBy:{ // set the order 
            id:"desc" // it will give us descending order last to first that means start from last 
            // id:"asc" // it will give us ascending order from first to last 
        },
        take:50 // give 50 msg 
    })
    res.status(200).send({
      message  
    })
})

app.get("/room/:slug",async function(req,res){
    const slug =req.params.slug
    try{
        const room = await prismaClient.room.findFirst({
            where:{
                slug
            }
        })
        if(!room){
            res.send({
                msg:"room is not exist"
            })
            return 
        }
        res.status(200).send({
            room
        })
    }catch(e){
        res.status(403).send({
            msg:"something went wrong"
        })
        return 
    }
})

app.listen(3002,()=>{
    console.log("htt-server is running port on 3002")
})

