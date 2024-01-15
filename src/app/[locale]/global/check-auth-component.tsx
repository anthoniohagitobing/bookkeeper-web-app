'use client'

// MODULES IMPORT
import { toast } from 'react-toastify';
import react, { useState, useEffect } from 'react';
import { useRouter } from '../../../navigation';
import axiosInstance from "@/lib/axios-instance";

// FUNCTION
export default function CheckAuthComponent(): JSX.Element {
    // STATE VARIABLES
    const [checkFinish, setCheckFinish] = useState<boolean>(false);
    const [checkAuth, setCheckAuth] = useState<boolean>(false);

    // OTHER SETUP
    const router = useRouter();
    
    // Check auth function. Once check is finish, it will flip the check finish switch
    // Note that you cannot move this to server side as the axios intercepted takes in token from local storage which is done on client
    async function checkAuthFunction() {
        try {
            const url: string = `user/check/`;
            const res = await axiosInstance.get(url);
            // console.log(res);
            setCheckAuth(true);
        } catch (err) {
            // console.log(err);
            setCheckAuth(false);
        }
        setCheckFinish(true);
    }

    // Initial use effect to trigger the check auth function
    useEffect(() => {
        checkAuthFunction();
    }, []);

    // If user is not authenticated, then display toast message and re-route. 
    useEffect(() => {
        if (checkFinish && !checkAuth) {
            toast.error("Session timeout, please log-in");
            router.push("/user/log-in");
        }
    }, [checkFinish]);

    // This needs to be jsx in order to pop-up the toast message
    return <></>
}