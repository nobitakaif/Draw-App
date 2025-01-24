
import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SCRETE } from "@repo/backend-common/config";


const wss = new WebSocketServer({port : 8080})

wss.on('connection',(ws,req)=>{
    const url = req.url // ws:localhost:8080?token=sidfaoighq34itno3inoek943toitneont

    if(!url){
        ws.close()
        return 
    }

    const queryParams = new URLSearchParams(url.split('?')[1])
    const token = queryParams.get("token") ??" "

    const decoded = jwt.verify(token,JWT_SCRETE)

    // if(typeof decoded =="string"){
    //     ws.close()
    //     return 
    // }
    if(!decoded || !(decoded as JwtPayload).userId){
        ws.close()
        return 
    }
    
    ws.on('message', function message(data){
        ws.send("pong")
    })
})