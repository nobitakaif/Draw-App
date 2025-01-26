"use client"
import { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {

  const [roomId,setRoomId] = useState("")
  const router = useRouter()
  return (
    <div style={{
      display:"flex",
      height:"100vh",
      width:"100vw",
      justifyContent:"center",
      alignItems:"center"
    }}>
       <input value={roomId} onChange={(e)=>
          setRoomId(e.target.value)
        } type="text" placeholder="enter room-id" style={{padding:"3px"}}></input>
      <button onClick={()=>{
        router.push(`room/${roomId}`)
        setRoomId("")
      }} style={{padding:"3px", margin:"5px"}}>join room</button>
        

    </div>
  );
}
