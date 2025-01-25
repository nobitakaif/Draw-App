
import { WebSocket, WebSocketServer } from "ws";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken"
import {prismaClient} from "@repo/db/client"
import { JWT_SCRETE } from "@repo/backend-common/config";


const wss = new WebSocketServer({port : 8080})

function checkUser(token : string):string | null{
    try{
        const decoded = jwt.verify(token,JWT_SCRETE)

    if(typeof decoded == "string"){
        return null
    }

    if(!decoded || !decoded.userId){
        return null
    }

    return decoded.userId
    }catch(e){
        return null
    }
    
}

interface User {
    ws:WebSocket
    rooms:string[],
    userId :string
}

const allUser :User[] = []

wss.on('connection',(ws,req)=>{
    const url = req.url // ws:localhost:8080?token=sidfaoighq34itno3inoek943toitneont

    if(!url){
        ws.close()
        return 
    }

    const queryParams = new URLSearchParams(url.split('?')[1])
    const token = queryParams.get("token") ||""

    const userId = checkUser(token)

    if(!userId){
        ws.close()
        return 
    }
    
    // now we're sure that user is is 100% exist in our db and they give us right token , and he want to subscirbe to room and we're pushing them into allUser []
    allUser.push({
        userId:userId,
        rooms:[],
        ws:ws
    })

    
    
    ws.on('message',async function message(data){
        // if(typeof data !== "string"){
        //     ws.close()
        //     return 
        // }
        const parsedData = JSON.parse(data as unknown as string) //data is always in string form '{type:"join_room",roomId:1}' we should we to convert into obj

        if(parsedData.type == "join_room"){
// finding the user in global [] with the current socket_id if the user is exist in [] then add the roomId in their rooms[]
            const currentUser = allUser.find(x => x.ws == ws); 
// we can add a more constraint like does this user has right to join this room or only premium user can only join this id, right now we're doing this open for everyone 
            currentUser?.rooms.push(parsedData.roomId)
        }

        if(parsedData.type == "leave_room"){
            const currentUser = allUser.find(x => x.ws ==ws)
            if(!currentUser){
                return
            }
            currentUser.rooms = currentUser?.rooms.filter(x => x !==parsedData.roomId)
        }

        if(parsedData.type == "chat"){
            const roomId = parsedData.roomId
            const message = parsedData.message

            await prismaClient.chat.create({
                data:{
                    message,
                    roomId,
                    userId
                }
            })

            allUser.forEach( everyUser =>{
                if(everyUser.rooms.includes(roomId)){
                    everyUser.ws.send(JSON.stringify({
                        type : "chat",
                        message : message,
                        
                    }))
                }
            })
        }
    })
})