'use client';

// MODULES IMPORT
import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useRouter, Link } from "../../../../navigation";
import { toast } from 'react-toastify';
import secureLocalStorage from "react-secure-storage";

// PAGE COMPONENT
export default function LogInComponent(): JSX.Element {
    // STATE VARIABLES
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState<string>("");  
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // NAVIGATION SETUP
    const router = useRouter();

    // HELPER FUNCTION
    // Handle on change function for data change in form
    function handleOnChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setLoginData({...loginData, [e.target.name]: e.target.value});
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        // Prevent webpage from refreshing due to onSubmit event
        e.preventDefault();

        // Guard clause to throw error if one of the field is missing
        if (!loginData.email || !loginData.password) {
            setError("All fields are required");
            return;
        }

        // Make call to api
        const url: string = `${process.env.NEXT_PUBLIC_DATABASE_URL}user/login/`;
        setIsLoading(true);
        const res: AxiosResponse<any, any> = await axios.post(url, loginData);
        setIsLoading(false);

        // Create user variable, this is temporarily disabled
        // const user = {
        //     "email": res.data.email,
        //     "full_name": res.data.full_name
        // }

        // Check response
        if (res.status === 200) {
            // If success, set additional token and user data
            // secureLocalStorage.setItem('user', JSON.stringify(user));
            secureLocalStorage.setItem("access_token", JSON.stringify(res.data.access_token));
            secureLocalStorage.setItem("refresh_token", JSON.stringify(res.data.refresh_token));

            // Redirect to verify email component
            toast.success("Login successful");
            router.push("/profile/");
        }
        // Server error 
    }

    return (
        <div>
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                {isLoading && (
                    <p>Loading...</p>
                )}
                <div>
                    <label htmlFor="email">Email:</label>
                    <input 
                        name="email"
                        id="email"
                        type="email"
                        value={loginData.email}
                        onChange={handleOnChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        name="password"
                        id="password"
                        type="password"
                        value={loginData.password}
                        onChange={handleOnChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
                <Link href="/user/forgot-password">Forgot Password</Link>
            </form>
        </div>
    )
}