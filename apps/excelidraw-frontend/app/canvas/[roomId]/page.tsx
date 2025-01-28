
"use client"
import { Rectangle } from "@/Draw-Shape/Rectangle"

import { useEffect, useRef } from "react"

export default function DrawingPage(){

    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(()=>{
        if(canvasRef.current){
    // create all the shape in different file for better understand just like this is Rectangle shape, I created in diff file Draw-Shape
            Rectangle(canvasRef.current)
        }
    },[canvasRef])
    
    return <div>
        <canvas ref={canvasRef} height={innerHeight} width={innerWidth} ></canvas>
    </div>
}