
type Shape = {
    type:"rect",
    x : number,
    y : number,
    width : number,
    height : number
} | {
    type : "circle",
    centerX : number,
    centerY : number,
    radius : number
}

export function Rectangle(canvas:HTMLCanvasElement){
    
    const ctx = canvas.getContext("2d")
        // (startx, starty, width, height)
    if(!ctx){
        return 
    }
    let allShapes : Shape[] = []

    
    ctx.strokeStyle="white"
    // ctx.strokeRect(100,100,100,100)
    
    let startx : number = 0  
    let starty : number = 0 
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
        const width = e.clientX - startx
        const height = e.clientY - starty
        // when the mouseup then push the startX, StartY, width , height into allShapes and when other person join the same room then send all the shape to everyone who join the room 
        allShapes.push({
            type:"rect",
            x: startx,
            y:starty,
            width:width,
            height:height
        })

    })

    canvas.addEventListener("mousemove",(e)=>{
        if(clicked){
            const width = e.clientX - startx
            const height = e.clientY - starty
         
            // ctx.clearRect(0,0, canvas.width , canvas.height) // this line will clear the shape and re-generate the shape when the clicked button become false (make it fully transparent, only single line stroke)
            // console.log("before rendering")
            RectangleRender(allShapes,canvas,ctx)// this line clear the line and also re-generate the shape  according the the function
            ctx.strokeRect(startx,starty,width,height) // this line only for visibiliy that shape is rendering
            console.log("after rendering")

             // this line make a rectangle x
        }
    })   
}

function RectangleRender(allShapes:Shape[],canvas :HTMLCanvasElement, ctx:CanvasRenderingContext2D){
    // first clear the context then re-render all the shape
    ctx.clearRect(0,0,canvas.width,canvas.height) // this line will clear the shape and re-generate the shape when the clicked button become false (make it fully transparent, only single line stroke
    // ctx.fillRect(0,0,canvas.width,canvas.height)

    console.log("before ")
    allShapes.map((shape)=>{
        if(shape.type == "rect"){
            ctx.strokeRect(shape.x,shape.y,shape.width, shape.height)
        }
    })

}