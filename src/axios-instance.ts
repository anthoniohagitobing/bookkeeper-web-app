'use client';

// IMPORT MODULE
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

// INTERFACE
interface Token {
    token_type: string,
    exp: number,
    iat: number,
    jti: string,
    user_id: number
}

// CREATE AXIOS FUNCTION
const baseURL: string | undefined = process.env.NEXT_PUBLIC_DATABASE_URL
const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseURL,
    // "Content-type": "application/json",
    // headers: { 
    //     "Authorization": accessToken ? `Bearer ${accessToken}` : ""
    // },
});

// INTERCEPT AXIOS FUNCTION TO HANDLE TOKEN
// This intercept the axios everytime it is being called. This checked if access token has expired and renew it if it has
axiosInstance.interceptors.request.use(async (req) => {
    // Retrieve access and refresh token. Because we are accessing local storage, we need to use if window. We cannot use useEffect as we cannot export it due to invalid hook 
    let accessToken: string | null = null;
    let refreshToken: string | null = null
    if (typeof window !== 'undefined') {
        const jsonAccessToken = localStorage.getItem("access_token");
        accessToken = jsonAccessToken ? JSON.parse(jsonAccessToken) : null;
        const jsonRefreshToken = localStorage.getItem("refresh_token");
        refreshToken = jsonRefreshToken ? JSON.parse(jsonRefreshToken) : null;
        // console.log(accessToken)
    } 
    // console.log(accessToken)

    // If access and refresh token are available, then check token
    // If not available, then the following will not be processed. The axios request will be automatically rejected as it is unauthorized
    if (accessToken && refreshToken) {
        // Apply current accessToken is applied
        req.headers.Authorization = accessToken ? `Bearer ${accessToken}` : ""

        // Decode the accessToken
        const user: Token = jwtDecode(accessToken)
        
        // This checks if the token has expired by comparing current time with exp time in token
        const isExpired: boolean = dayjs.unix(user.exp).diff(dayjs()) < 1
        // console.log('isExpired', isExpired);

        // If it has not expired, return as it is
        if(!isExpired) return req

        // If expired, we want to renew the get a new access token
        const url: string = `${baseURL}user/token/refresh/`
        const res = await axios.post(url, {
            refresh: refreshToken
        });

        // If response is successful, then the refresh token has not expired and we got a renew access token
        if (res.status === 200) {
            // Apply new access token to local storage and axios request, then return req
            console.log('new access token: ', res.data.access)
            localStorage.setItem('access_token', JSON.stringify(res.data.access))
            req.headers.Authorization = `Bearer ${res.data.access}`
        }
    } 

    // Return axios request
    return req
})

export default axiosInstance;