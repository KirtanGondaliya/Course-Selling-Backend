import {z} from 'zod'

const purchaseSchema=z.object({
   courseId:z.string()
})

export default purchaseSchema;