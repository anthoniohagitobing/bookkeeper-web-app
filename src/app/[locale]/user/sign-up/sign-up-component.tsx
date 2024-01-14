'use client';

// MODULES IMPORT
import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "../../../../navigation";
import { toast } from 'react-toastify';

// INTERFACE
interface FormData {
    email: string,
    first_name: string,
    last_name: string,
    password: string,
    password2: string,
}

// PAGE COMPONENT
export default function SignUpComponent(): JSX.Element {
    // STATE VARIABLES
    const [formData, setFormData] = useState<FormData>({
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        password2: "",
    });
    const [error, setError] = useState<string>("");  

    // OTHER SETUP
    const router = useRouter();

    // HELPER FUNCTION
    // Handle on change function for data change in form
    function handleOnChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    // Handle on Submit function for form
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        // Prevent webpage from refreshing due to onSubmit event
        e.preventDefault();

        // Guard clause to throw error if one of the field is missing
        if (!formData.email || !formData.first_name || !formData.last_name || !formData.password || !formData.password2) {
            setError("All fields are required");
            return;
        }

        // Make call to api
        const url: string = `${process.env.NEXT_PUBLIC_DATABASE_URL}user/register/`;
        const res: AxiosResponse<any, any> = await axios.post(url, formData);

        // Check response
        if (res.status === 201) {
            // If success, redirect to verify email component
            router.push("/user/verify-email/");
            toast.success(res.data.message);
        }
        // Server error 
    }

    // COMPONENT
    return (
        <div>
            <h2>Create Account</h2>
            <p>{error ? error : ""}</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input 
                            name="email"
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="first_name">First Name:</label>
                        <input 
                            name="first_name"
                            id="first_name"
                            type="text"
                            value={formData.first_name}
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="last_name">Last Name:</label>
                        <input 
                            name="last_name"
                            id="last_name"
                            type="text"
                            value={formData.last_name}
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
                            value={formData.password}
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='password2'>Confirm Password</label>
                        <input 
                            name='password2'
                            id='password2'
                            type="password" 
                            value={formData.password2}
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