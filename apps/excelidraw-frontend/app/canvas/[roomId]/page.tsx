
"use client"
import { CONNREFUSED } from "dns"
import { useEffect, useRef } from "react"

export default function DrawingPage(){

    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(()=>{
        if(canvasRef.current){
            const canvas = canvasRef.current
            const ctx = canvas.getContext("2d")
                // (startx, starty, width, height)
            if(!ctx){
                return 
            }
            ctx.strokeStyle="white"
            ctx.strokeRect(100,100,100,100)
            
            let startx :any 
            let starty :any
            let clicked:boolean

            canvas.addEventListener("mousedown",(e)=>{
                clicked = true
                startx = e.clientX
                starty = e.clientY
                console.log(e.clientX)
                console.log(e.clientY)

            })

            canvas.addEventListener("mouseup",(e)=>{
                clicked = false
                console.log(e.clientX)
                console.log(e.clientY)
            })

            canvas.addEventListener("mousemove",(e)=>{
                if(clicked){
                    const widht = e.clientX - startx
                    const height = e.clientY - starty
                    ctx.clearRect(0,0, canvas.width , canvas.height)
                    ctx.strokeRect(startx,starty,widht,height)
                }
                // console.log(e.clientX)
                // console.log(e.clientY)
            })
        }
    },[canvasRef])
    
    return <div>
        <canvas ref={canvasRef} height={700} width={700} ></canvas>
    </div>
}