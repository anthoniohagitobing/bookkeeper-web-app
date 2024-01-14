'use client';

// MODULES IMPORT
import React, { useEffect, useState } from "react";
import { useRouter } from "../../../navigation";
import axiosInstance from "@/axios-instance";
import { toast } from 'react-toastify';
import axios, { AxiosResponse } from "axios";

interface User {
    email: string,
    full_name: string,
}

// PAGE COMPONENT
export default function ProfileComponent(): JSX.Element {
    // STATE VARIABLES
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null >(null);
    const [refreshToken, setRefreshToken] = useState<string | null >(null);
    const [check, setCheck] = useState<boolean>(false);

    // OTHER SETUP
    const router = useRouter();

    // HELPER FUNCTION

    async function handleLogout() {
        const url: string = "user/logout/"
        const res: AxiosResponse<any, any> = await axiosInstance.post(url, {"refresh_token": refreshToken})
        if (res.status = 200) {
            // Remove data from local storage
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("user");

            // Display success messsage and push to log-in
            router.push("/user/log-in/");
            toast.success("Log-out successful");
        }
    }

    async function getSomeData() {
        const url: string = `user/check/`;
        const res: AxiosResponse<any, any> = await axiosInstance.get(url);

        if (res.status === 200) {
            console.log(res.data);
        }
    }

    // INITIAL USE EFFECT
    // From local storage, retrieve user and access token> Note that you need to parse it as it is in json
    // Because it is retrieving from local storage, we need to use useEffect
    useEffect(() => {
        const jsonUser: string | null = localStorage.getItem("user");
        setUser(jsonUser ? JSON.parse(jsonUser) : null);
        const jsonAccessToken = localStorage.getItem("access_token");
        setAccessToken(jsonAccessToken ? JSON.parse(jsonAccessToken) : null);
        const jsonRefreshToken = localStorage.getItem("refresh_token");
        setRefreshToken(jsonRefreshToken ? JSON.parse(jsonRefreshToken) : null);
        setCheck(true);
    }, []);

    // If no access token, push to log in
    useEffect(() => {
        if (check) {
            if (accessToken === null && !user) {
                router.push("/user/log-in/");
            } else {
                getSomeData()
            }
        } 
    }, [check])

    // COMPONENTS
    return (
        <div>
            <p>Profile</p>
            <h2>Hi {user && user.full_name}</h2>
            <p>Welcome to your profile</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}