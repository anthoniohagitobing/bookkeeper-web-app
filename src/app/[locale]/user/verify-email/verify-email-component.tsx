'use client';

// MODULES IMPORT
import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { useRouter } from "../../../../navigation";

// PAGE COMPONENT
export default function VerifyEmailComponent(): JSX.Element {
    // STATE VARIABLES
    const [otp, setOtp] = useState<string>("");

    // OTHER SETUP
    const router = useRouter();

    // Handle on Submit function for form
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        // Prevent webpage from refreshing due to onSubmit event
        e.preventDefault();

        // Guard clause if otp is empty
        if (!otp) return;

        // Make call to api
        const url: string = `${process.env.NEXT_PUBLIC_DATABASE_URL}user/verify-email/`;
        const data: {
            otp: string;
        } = {
            'otp': otp
        }
        const res = await axios.post(url, data)

        // Check response
        if (res.status === 200) {
            // If success, redirect to verify email component
            router.push("/user/login/");
            toast.success(res.data.message);
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="otp">Enter your OTP code:</label>
                    <input 
                        name="otp"
                        id="otp"
                        type="number"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}