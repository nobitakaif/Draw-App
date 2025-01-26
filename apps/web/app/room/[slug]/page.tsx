import axios from "axios";
import { BACKEND_URL } from "../../cofig";
import { ChatRoom } from "../../../component/ChatRoom";

async function getRoomId(slug:string){
    const response = await axios.get(`${BACKEND_URL}/room/${slug}`)
    console.log(slug)
    return response.data.room.id
} 

export default async function ChatRoom1({
    params
    }:{
        params:{
            slug:string
        }
    }){
        const slug = (await params).slug // get the roomId from the url because user will redirect from main page.tsx to here and we're sure slug is present on url 
        const roomId = await getRoomId(slug)

        return <ChatRoom id={roomId}></ChatRoom>
}