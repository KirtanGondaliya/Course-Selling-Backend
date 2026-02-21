import {z} from 'zod'

const lessonSchema=z.object({
    title:z.string(),
    content:z.string(),
    courseId:z.string()
})

export default lessonSchema;
