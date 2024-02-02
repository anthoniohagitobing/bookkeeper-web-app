'use client';

// IMPORT MODULES
import { FormEvent } from 'react'
import { redirect} from "@/navigation";
import axios, { AxiosResponse } from "axios";
import { toast } from 'react-toastify';
import secureLocalStorage from "react-secure-storage";

export default async function handleLogIn(e: FormEvent<HTMLFormElement>) {
    // Prevent form default
    e.preventDefault()
    console.log("test")

    // NAVIGATION SETUP
    // const router = useRouter();
 
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
 
    const url: string = `${process.env.NEXT_PUBLIC_DATABASE_URL}user/login/`;
    const res: AxiosResponse<any, any> = await axios.post(url, { email, password });
 
    // Check response
    if (res.status === 200) {
        // If success, set tokens to secure local storage. Note that local storage only received strings.
        // secureLocalStorage.setItem('user', JSON.stringify(user));
        secureLocalStorage.setItem("access_token", JSON.stringify(res.data.access_token));
        secureLocalStorage.setItem("refresh_token", JSON.stringify(res.data.refresh_token));

        // Redirect to verify email component
        toast.success("Login successful");
        redirect("/dashboard/");
    } else {
        // Server error 
        toast.error("Login fail")
    }
  }