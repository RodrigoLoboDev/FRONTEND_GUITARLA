import axios from "axios"
import { BlogsSchema, CategoriesSchema, GuitarSchema, GuitarsSchema, Order, PromosSchema } from "../types";

export const getGuitars = async () => {

    try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/guitarras?populate=*`
        
        const {data} = await axios(url)
        const result = GuitarsSchema.safeParse(data.data)

        if (result.success) {
            return result.data
        }
    } catch (error) {
        console.log(error);
    }
}

export const getGuitarBySlug = async (slug : string) => {

    try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/guitarras?filters[slug][$eq]=${slug}&populate=*`
        const {data} = await axios(url)       
        const result = GuitarSchema.safeParse(data.data[0])

        if (result.success) {
            return result.data
        }
    } catch (error) {
        console.log(error);
    }
}

export const getGuitarByIsFeatured = async () => {

    try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/guitarras?filters[isFeatured][$eq]=true&populate=*`
        
        const {data} = await axios(url)
        const result = GuitarsSchema.safeParse(data.data)

        if (result.success) {
            return result.data
        }
    } catch (error) {
        console.log(error);
    }
}

export const getBlogs = async (page: number = 1, pageSize: number = 3) => {

    try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/blogs?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`
        
        const {data} = await axios(url)
        const result = BlogsSchema.safeParse(data.data)

        if (result.success) {
            return {
                data: result.data,
                meta: data.meta
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export const getBlogBySlug = async (slug : string) => {

    try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/blogs?filters[slug][$eq]=${slug}&populate=*`
        
        const {data} = await axios(url)
        const result = BlogsSchema.safeParse(data.data)

        if (result.success) {
            return result.data
        }
    } catch (error) {
        console.log(error);
    }
}

export const getCategories = async () => {

    try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/categorias?populate=*`
        const {data} = await axios(url)
        const result = CategoriesSchema.safeParse(data.data)        

        if (result.success) {
            return result.data
        }
    } catch (error) {
        console.log(error);
    }
}

export const getCategoryBySlug = async (slug : string) => {

    try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/guitarras?populate=*&filters[categoria][slug][$eq]=${slug}`
        const {data} = await axios(url)
        const result = GuitarsSchema.safeParse(data.data)
        
        if (result.success) {
            return result.data
        }
    } catch (error) {
        console.log(error);
    }
}

export const getPromos = async () => {

    try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/promo-guitars?populate=*`
        const {data} = await axios(url)
        const result = PromosSchema.safeParse(data.data)        

        if (result.success) {
            return result.data
        }
    } catch (error) {
        console.log(error);
    }
}

// API DE MERCADO-PAGO
const makePaymentRequest = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
})

export const createPreference = (products: Order) => {    
    return makePaymentRequest.post("/api/orders", {
      products
    });
};

// OBTENER DATOS DEL CLIENTE
export const getDataClient = async (paymentId: string, preferenceId: string) => {
    try {
        // Paso 1: Obtener los detalles del pago desde la API de Mercado Pago
        const url = `https://api.mercadopago.com/v1/payments/${paymentId}`;
        const result = await axios(url, {
            headers: {
                'Authorization': `Bearer ${import.meta.env.VITE_MERCARDOPAGO_ACCESS_TOKEN}`
            }
        });

        // Extraer el estado del pago y detalles del cliente
        const paymentStatus = result.data.status;  // por ejemplo, 'approved', 'rejected', etc.
        const playerInfo = {
            email: result.data.payer.email,
            firstName: result.data.payer.first_name,
            lastName: result.data.payer.last_name,
            identification: result.data.payer.identification,
            phone: result.data.payer.phone,
        };

        // Paso 2: Buscar la orden en Strapi utilizando el preferenceId
        const searchUrl = `${import.meta.env.VITE_BACKEND_URL}/api/orders?filters[preferenceId][$eq]=${preferenceId}`;
        const searchResult = await axios.get(searchUrl);
        
        if (searchResult.data.data.length === 0) {
            throw new Error('No se encontró ninguna orden con ese preferenceId');
        }

        // Obtener el ID de la orden
        const orderId = searchResult.data.data[0].id;

        // Paso 3: Actualizar el estado del pago en tu backend (Strapi) usando el id de la orden
        const url_update = `${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`;
        await axios.put(url_update, {
            data: {
                paymentStatus,  // Actualiza el campo paymentStatus en la orden
                send: playerInfo  // Crea el campo "send" con la información del cliente
            }
        });

        // console.log('Orden actualizada con éxito');
        
    } catch (error) {
        console.log('Error al procesar el pago:', error);
    }
};
