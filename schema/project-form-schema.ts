import { z } from 'zod'

export const projectFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title too long'),
  description: z.string().optional(),
})

export type ProjectFormData = z.infer<typeof projectFormSchema>
