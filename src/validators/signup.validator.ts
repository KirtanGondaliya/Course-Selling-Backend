import {z} from 'zod'

const signUpSchema=z.object({
    email:z.string().email(),
    password:z.string().min(6),
    name:z.string(),
    role:z.enum(['STUDENT','INSTRUCTOR'])
})

export default signUpSchema;