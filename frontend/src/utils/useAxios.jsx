import axios from "axios"
import {jwtDecode} from "jwt-decode"
import dayjs from "dayjs"
import { useContext } from "react"
import authContext from "../context/AuthContext"

const baseURL = "http://127.0.0.1:8000/api"

const useAxios = () => {
    const {authTokens, setUser, setAuthTokens} = useContext(authContext)

    const axiosInstance = axios.create({
        baseURL,
        headers: {
            Authorization: `Bearer ${authTokens?.access}`
        }
    })

    axiosInstance.interceptors.request.use(async request => {
        const user = jwtDecode(authTokens.access)
        const expired = dayjs.unix(user.exp).diff(dayjs()) < 1

        if (!expired) {
            return request
        }

        const response = await axios.post(`${baseURL}/token/refresh/`, {
            refresh: authTokens.refresh
        })
        localStorage.setItem("authTokens", JSON.stringify(response.data));

        setAuthTokens(response.data)
        setUser(jwtDecode(response.data.access))
        
        request.headers.Authorization = `Bearer ${response.data.access}`
        return request
    })

    return axiosInstance
}

export default useAxios