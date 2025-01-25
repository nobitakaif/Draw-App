import axios from "axios";
import { BACKEND_URL } from "../../cofig";

async function getRoomId(slug:string){
    const response =await axios.get(`${BACKEND_URL}/room/${slug}`)
    return response.data.id
} 

export default async function ChatRoom({
    params
    }:{
        params:{
            slug:string
        }
    }){
        const slug = params.slug // get the roomId from the url because user will redirect from main page.tsx to here and we're sure slug is present on url 
        const roomId = await getRoomId(slug)
}