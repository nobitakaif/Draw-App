import express, { response } from "express"
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
        await prismaClient.user.create({
            data:{  
                email: data.data.email,
                password: hashedPassword
            }
        })
        res.status(200).send({
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
        const reponse=  await prismaClient.user.findFirst({
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

