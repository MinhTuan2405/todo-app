import axios from "axios";
import { ACCESS_TOKEN } from "./constant";

const api_url = 'https://web-production-2d6f.up.railway.app/'

const api = axios.create ({
    baseURL: import.meta.env.VITE_API_URL? import.meta.env.VITE_API_URL : api_url
})

api.interceptors.request.use (
    (config) => {
        const token = localStorage.getItem (ACCESS_TOKEN)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },

    (err) => {
        return Promise.reject (err)
    }
)

export default api