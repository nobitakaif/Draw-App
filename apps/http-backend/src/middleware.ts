import { NextFunction, Request, Response } from "express";
import  jwt from "jsonwebtoken"
import { JWT_SCRETE } from "@repo/backend-common/config";


interface CustomRequest {
    userId?: string;
}
export function middleware(req:CustomRequest & Request,res:Response,next:NextFunction){
    const token = req.headers["authorization"]

    if (token) {
        jwt.verify(token, JWT_SCRETE, (err, decoded: any) => {
            if (err) {
                return res.status(403).send({ msg: "token is not valid" });
            } else {
                req.userId = decoded.userId; // No TypeScript error now
                next();
            }
        });
    } else {
        res.status(403).send({ msg: "token is not present in headers" });
    }

    
    // if(decoded ){
    //     // @ts-ignore
    //     req.userId = decoded.userId
    //     next()
    // }else{
    //     res.status(403).send({
    //         msg:"token is not present in headers"
    //     })
    // }

}