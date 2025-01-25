import { z } from 'zod';

export const CreateUserSchema = z.object({
    username : z.string().min(3).max(60),
    email : z.string().email().min(4).max(60),
    password : z.string().min(8).max(60)
})

export const SigninSchema = z.object({
    email : z.string().email().min(4).max(60),
    password : z.string().min(8).max(60)
})

export const CreateRoomSchema = z.object({
    username : z.string().min(4).max(60)
})