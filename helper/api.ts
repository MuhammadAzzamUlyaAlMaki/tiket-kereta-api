import axios from "axios"
 const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY
    }
})

export default axiosInstance

