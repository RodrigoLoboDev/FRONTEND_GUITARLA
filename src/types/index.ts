import { z } from 'zod'

// los tipos de datos para validar lo que enviar el usuario por el formulario
export const DraftGuitarSchema = z.object({
	name: z.string(),
	image: z.string(),
	description: z.string(),
	price: z.number()
})

// los tipos de datos para validar cuando los traemos de la DB
export const GuitarSchema = z.object({
	id: z.number(),
	attributes: z.object({
		descripcion: z.string(),
		imagen: z.object({
			data: z.array(z.object({
				attributes: z.object({
					formats: z.object({
						medium: z.object({
							url: z.string(),
							name: z.string()
						}).optional(),
						small: z.object({
							url: z.string(),
							name: z.string()
						}),
						thumbnail: z.object({
							url: z.string(),
							name: z.string()
						})
					})
				})
			}))
		}),
		nombre: z.string(),
		precio: z.number(),
		url: z.string()
	})
})

export const GuitarsSchema = z.array(GuitarSchema)

const CartItemSchema = GuitarSchema.extend({
    count: z.number().min(1, "La cantidad debe ser al menos 1"),
  });
  

// Creamos el type
export type Guitar = z.infer<typeof GuitarSchema >
export type CartItem = z.infer<typeof CartItemSchema >