'use client';

// MODULES IMPORT
import { toast } from 'react-toastify';
import react, { useState, useEffect, useContext } from 'react';
import { useRouter, usePathname } from '../../../navigation';
import { ContextVariables } from '../../../lib/context-variables';
import axiosInstance from "@/lib/axios-instance";

// FUNCTION
export default function CheckAuthComponent(): JSX.Element {
    // STATE AND CONTEXT VARIABLES
    const [checkAuthFinish, setCheckAuthFinish] = useState<boolean>(false);
    const [Authenticated, setAuthenticated] = useState<boolean>(false);
    const { userAuthenticated, setUserAuthenticated } = useContext(ContextVariables);

    // NAVIGATION SETUP
    const router = useRouter();
    const pathname = usePathname();
    
    // HELPER FUNCTION
    // Check auth function. Once check is finish, it will flip the check finish switch
    // Note that you cannot move this to server side as the axios intercepted takes in token from local storage which is done on client
    async function checkAuthFunction() {
        try {
            const url: string = `user/check/`;
            const res = await axiosInstance.get(url);
            // console.log(res);
            setAuthenticated(true);
        } catch (err) {
            // console.log(err);
            setAuthenticated(false);
        }
        setCheckAuthFinish(true);
    }

    // USE EFFECT
    // Initial use effect 
    useEffect(() => {
        // If user is has been globally authenticated, 
        if (userAuthenticated) {
            // If currently on log-in or password, push to dashboard. This is to prevent double log-in
            if (pathname === "/user/log-in" || pathname === "user/sign-up") {
                router.push("/dashboard");
            }

        // If user has not been globally authenticated and not in log-in, then perform authentication
        } else if (!userAuthenticated && pathname !== "/user/log-in") {
            checkAuthFunction();
        }
    }, []);

    // Only execute when check auth is finished. This is to prevent the following from being rendered in the server
    useEffect(() => {
        if (checkAuthFinish) {
            // If user is authenticated
            if (Authenticated) {
                // Set global user authenticated to true
                setUserAuthenticated(true);
            
            // If user is not authenticated 
            } else if (!Authenticated) {
                // If user is not in log-in, display toast message and re-route to log-in.
                if (pathname === "/user/log-in" || pathname === "/user/sign-up") {
                    return
                } else {
                    toast.error("Session timeout, please log-in");
                    router.push("/user/log-in");

                }
            }
        }
    }, [checkAuthFinish]);

    // This needs to be jsx in order to pop-up the toast message
    return <></>
}