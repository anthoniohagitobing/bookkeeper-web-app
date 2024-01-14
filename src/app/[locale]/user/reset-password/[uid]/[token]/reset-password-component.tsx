'use client';

// MODULES IMPORT
import React, { useState } from "react";
import { AxiosResponse } from "axios";
import { useRouter } from "../../../../../../navigation";
import { toast } from 'react-toastify';
import axiosInstance from "@/axios-instance";
import { useParams } from 'next/navigation'

interface newPassword {
    password: string,
    confirmPassword: string
}

// PAGE COMPONENT
export default function ResetPasswordComponent(): JSX.Element {
    // STATE VARIABLES
    const params = useParams<{ uid: string; token: string }>()
    // console.log(params);
    const [newPassword, setNewPassword] = useState<newPassword>({
      password: "",
      confirmPassword: "",
    });

    // OTHER SETUP
    const router = useRouter();

    // HELPER FUNCTION
    // Handling form data change 
    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setNewPassword({...newPassword, [e.target.name]:e.target.value})
    }

    // Handling form submit to reset password
    const data = {
        "password": newPassword.password,
        "confirm_password": newPassword.confirmPassword,
        "uidb64": params.uid,
        "token": params.token,
      }
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (data) {
            const res: AxiosResponse = await axiosInstance.patch('user/set-new-password/', data)
            if (res.status === 200) {
                router.push("/user/log-in/");
                toast.success(res.data.message);
            }
            // console.log(res);
        }
    }
        

    return (
        <div>
            <div>
                <h2>Enter your New Password</h2> 
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="password">New Password:</label>
                        <input 
                            type="password"
                            name="password"
                            id="password"
                            value={newPassword.password}
                            onChange={handleChange}     
                        />    
                    </div>
                    <div>
                        <label htmlFor="confirm_password">Confirm Password</label>
                        <input 
                            type="password" 
                            id="confirm_password"
                            name="confirmPassword"
                            value={newPassword.confirmPassword}
                            onChange={handleChange}              
                        />    
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}