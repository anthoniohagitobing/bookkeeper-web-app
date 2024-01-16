'use client';

// MODULES IMPORT
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "../../../navigation";
import axiosInstance from "@/lib/axios-instance";
import { ContextVariables } from '../../../lib/context-variables';
import { toast } from 'react-toastify';
import axios, { AxiosResponse } from "axios";
import secureLocalStorage from "react-secure-storage";

// PAGE COMPONENT
export default function ProfileComponent(): JSX.Element {
    // STATE AND CONTEXT VARIABLES
    const [refreshToken, setRefreshToken] = useState<string | null >(null);
    const { setUserAuthenticated } = useContext(ContextVariables);

    // NAVIGATION SETUP
    const router = useRouter();

    // HELPER FUNCTION
    async function handleLogout() {
        const url: string = "user/logout/"
        const res: AxiosResponse<any, any> = await axiosInstance.post(url, {"refresh_token": refreshToken})
        if (res.status = 200) {
            // Remove token from local storage
            secureLocalStorage.removeItem("access_token");
            secureLocalStorage.removeItem("refresh_token");

            // Set global authentication as false;
            setUserAuthenticated(false);

            // Display success messsage and push to log-in
            toast.success("Log-out successful");
            router.push("/user/log-in/");
        }
    }

    // INITIAL USE EFFECT
    // From local storage, retrieve user and access token> Note that you need to parse it as it is in json
    // Because it is retrieving from local storage, we need to use useEffect
    useEffect(() => {
        const jsonRefreshToken: string = secureLocalStorage.getItem("refresh_token") as string;
        setRefreshToken(jsonRefreshToken ? JSON.parse(jsonRefreshToken) : null);
    }, []);

    // COMPONENTS
    return (
        <div>
            <p>Profile</p>
            <p>Welcome to your profile</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}