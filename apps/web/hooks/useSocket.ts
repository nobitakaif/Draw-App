import { useEffect, useState } from "react";
import { WS_URL } from "../app/cofig";
import { setDefaultAutoSelectFamily } from "net";

export function useSocket(){
    const [loading,setLoading] = useState(true)
    const [socket,setSocket] = useState<WebSocket>()

    useEffect(()=>{
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhY2Q0MGQ4Yy0wNmJmLTRlOGMtOGQxYS1jMGVlNDU4OGE5MDEiLCJpYXQiOjE3Mzc4MDUxNTV9.2cN5G-jICMf2gl6CdndYnks_BB-wHYCEwea7R91UY4U`) 
        ws.onopen=()=>{
            setLoading(false)
            setSocket(ws)
        }
       
    },[])
    return {
        loading,
        socket
    }
}