import { z } from 'zod'

export const widgetFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title too long'),
  description: z.string().optional(),
  site_url: z.url('Enter a valid site URL'),
})

export type WidgetFormData = z.infer<typeof widgetFormSchema>
