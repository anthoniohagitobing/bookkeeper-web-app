'use client';

// MODULES IMPORT
import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "../../../../navigation";
import { toast } from 'react-toastify';

// PAGE COMPONENT
export default function LogInComponent(): JSX.Element {
    // STATE VARIABLES
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState<string>("");  
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // OTHER SETUP
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
        console.log(res);

        // Check response
        if (res.status === 200) {
            // If success, redirect to verify email component
            router.push("/auth/verify-email");
            toast.success("Login successful");
        }
        // Server error 
    }

    return (
        <div>
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                <div>
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
                </div>
            </form>
        </div>
    )
}