"use client"

import { use, useState } from "react"

type AuthType={
    isSignin : boolean,
    label? : string,
    

}
export function AuthPage(props:AuthType){

    const [userInput,setUserInput] = useState<boolean>(false)
    const [userPassword,setUserPassword] = useState<boolean>(false)
    const [msg,setMsg]= useState<boolean>()



    return <div className="bg-black  h-screen w-full flex justify-center items-center">
    <div className="h-80 w-72  rounded-lg  bg-[#111111] shadow-2xl shadow-blue-500/50 flex  flex-col">
        <div>
            {props.isSignin ? <div className="text-4xl font-serif p-4 relative top-2 left-16 text-white "> Sign-in </div> : <div className=" font-serif p-4 relative top-5 left-16 text-4xl"> Sign-up</div>}
            <input onChange={(e)=>{
                let value = e.target.value
                if(value.length >=4){
                    setUserInput(true)
                }
                else{
                    setUserInput(false)
                }
                
            }}
            type="text"  placeholder="username" className="mt-3 text-black relative p-2 w-60 h-12 text-2xl border-none outline-none  rounded-lg shadow-2xl shadow-black left-6" />
            <input onChange={(e)=>{
                let value = e.target.value
                if(value.length >= 8 ){
                    setMsg(true)
                    setUserPassword(true)
                }else{
                    setMsg(false)
                    setUserPassword(false)
                }
                
            }}
            type="password" placeholder="password"  className="mt-3 p-2 relative w-60 h-12 text-black text-2xl border-none outline-none  rounded-lg shadow-2xl shadow-black left-6" />
            </div>
        <div className="w-full mt-4  flex justify-between items-center flex-col">
            {msg ? <div className="text-green-400">strong password </div > : <div className="text-[#E31C25]">password should be atleast 8 character </div>}
            <div>
            {userInput && userPassword == true ?   <button className="bg-indigo-500 mt-2 shadow-lg w-60 h-12 rounded-full text-white text-2xl shadow-indigo-500/50 ">{props.isSignin ? "Signin" : "Signup"}</button> :<button className="bg-white shadow-lg w-60 h-12 rounded-full text-black text-2xl shadow-indigo-500/50 cursor-not-allowed mt-2">{props.isSignin ? "Signin" : "Signup"}</button>}
            </div>
        </div>
    </div>

</div>

}