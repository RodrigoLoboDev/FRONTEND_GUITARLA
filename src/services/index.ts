import axios from "axios"
import { GuitarsSchema } from "../types";

export const getGuitars = async () => {

    try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/guitarras?populate=imagen`
        const {data} = await axios(url)
        //console.log(data.data);
        const result = GuitarsSchema.safeParse(data.data)
        //console.log(result);
        if (result.success) {
            return result.data
        }
    } catch (error) {
        console.log(error);
    }
}