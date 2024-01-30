'use client';

// MODULES IMPORT
import React, { useState } from "react";
import { AxiosResponse } from "axios";
import { useRouter } from "@/navigation";
import { toast } from 'react-toastify';
import axiosInstance from "@/lib/axios-instance";

// PAGE COMPONENT
export default function ForgotPasswordComponent(): JSX.Element {
    // STATE VARIABLES
    const [email, setEmail] = useState("");

    // NAVIGATION SETUP
    const router = useRouter();

    // HELPER FUNCTION
    // Handle submit for requesting password reset
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (email) {
          const res: AxiosResponse = await axiosInstance.post('user/forgot-password/', {'email':email})
           if (res.status === 200) {
            console.log(res.data);
            toast.success('a link to reset your password has be sent to your email');
            setEmail("");
            router.push("/user/log-in/");
           } 
        }
    }

    return (
        <div>
            <h2>Enter your registered email</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email Address:</label>
                        <input 
                            type="text"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />    
                    </div>
                    <button>Send</button>
                </form>
            </div>
        </div>
    )
}