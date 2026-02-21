import {z} from 'zod'

const courseSchema=z.object({
    title:z.string(),
    description:z.string(),
    price:z.number(),
})

export default courseSchema;