'use client';

// IMPORT MODULE
import axios from "axios";

const jsonAccessToken = localStorage.getItem("access_token");
const accessToken = jsonAccessToken ? JSON.parse(jsonAccessToken) : null;
const jsonRefreshToken = localStorage.getItem("refresh_token");
const refreshToken = jsonRefreshToken ? JSON.parse(jsonRefreshToken) : null;
const baseURL = process.env.NEXT_PUBLIC_DATABASE_URL

const axiosInstance = axios.create({
    baseURL: baseURL,
    // "Content-type": "application/json",
    headers: { 
        "Authorization": jsonAccessToken ? `Bearer ${accessToken}` : null
    },
});

export default axiosInstance;