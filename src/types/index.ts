import { z } from 'zod'

// los tipos de datos para validar lo que enviar el usuario por el formulario
export const DraftReviewSchema = z.object({
	name: z.string(),
	content: z.string(),
	rating: z.number(),
	blog: z.number()
})

export const ReviewSchema = z.object({
	id: z.number(),
	attributes: z.object({
		name: z.string(),
		content: z.string(),
		rating: z.number(),
		blog: z.object({
			data: z.object({
				id: z.number()
			})
		})
	})	
})

// los tipos de datos para validar cuando los traemos de la DB
export const GuitarSchema = z.object({
	id: z.number(),
	attributes: z.object({
		nombre: z.string(),
		descripcion: z.string(),
		precio: z.number(),
		slug: z.string(),
		active: z.boolean(),
		isFeatured: z.boolean(),
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
		categoria: z.object({
			data: z.object({
				id: z.number(),
				attributes: z.object({
					nombre: z.string(),
					slug: z.string()
				}),
			})
		})
	})
})

export const BlogSchema = z.object({
	id: z.number(),
	attributes: z.object({
		titulo: z.string(),
		slug: z.string(),
		contenido: z.array(z.object({
			children: z.array(z.object({
				text: z.string()
			}))
		})),
		resumen: z.string(),
		fecha: z.string(),
		estado: z.string(),
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
		})
	})
})

export const CategorySchema = z.object({
	id: z.number(),
	attributes: z.object({
		nombre: z.string(),
		slug: z.string(),
		imagen: z.object({
			data: z.object({
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
			})
		})
	})
})

export const PromoSchema = z.object({
	id: z.number(),
	attributes: z.object({
		nombre: z.string(),
		descripcion: z.string(),
		start_date: z.string(),
		end_date: z.string(),
		is_active: z.boolean(),
		external_link: z.string(),
		priority: z.number(),
		slug: z.string(),
		imagen: z.object({
			data: z.object({
				attributes: z.object({
					formats: z.object({
						thumbnail: z.object({
							url: z.string(),
							name: z.string()
						})
					})
				})
			})
		}),
		guitarras: z.object({
			data: z.array(z.object({
				id: z.number(),
				attributes: z.object({
					nombre: z.string(),
					descripcion: z.string(),
					precio: z.number(),
					slug: z.string()
				}),
			})).optional()
		})
	})
})

export const OrderSchema = z.object({
	products: z.array(z.object({
		id: z.number(),
		nombre: z.string(),
		descripcion: z.string(),
		precio: z.number(),
	})),
	total: z.number()
})

export const ReviewsSchema = z.array(ReviewSchema)
export const GuitarsSchema = z.array(GuitarSchema)
export const BlogsSchema = z.array(BlogSchema)
export const CategoriesSchema = z.array(CategorySchema)
export const PromosSchema = z.array(PromoSchema)

const CartItemSchema = GuitarSchema.extend({
    count: z.number().min(1, "La cantidad debe ser al menos 1"),
  });
  

// Creamos el type
export type DarftReview = z.infer<typeof DraftReviewSchema >
export type Review = z.infer<typeof ReviewSchema >
export type Guitar = z.infer<typeof GuitarSchema >
export type CartItem = z.infer<typeof CartItemSchema >
export type Blog = z.infer<typeof BlogSchema >
export type Category = z.infer<typeof CategorySchema >
export type Promo = z.infer<typeof PromoSchema >
export type Order = z.infer<typeof OrderSchema >