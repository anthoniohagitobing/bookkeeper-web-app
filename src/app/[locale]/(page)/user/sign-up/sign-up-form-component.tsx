'use client';

// MODULES IMPORT
import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useRouter, Link } from "@/navigation";
import { toast } from 'react-toastify';
import { Translation } from '@/lib/global-types';

// PAGE COMPONENT
export default function SignUpFormComponent({t}: {t:Translation}): JSX.Element {
    // NAVIGATION SETUP
    const router = useRouter();


    // Handle on Submit function for form
    async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
        // Prevent webpage from refreshing due to onSubmit event
        e.preventDefault();

        // Extract form data
        const formData: FormData = new FormData(e.currentTarget);
        const email: FormDataEntryValue | null = formData.get('email');
        const full_name: FormDataEntryValue | null = formData.get('full_name');
        const password: FormDataEntryValue | null = formData.get('password');
        const password2: FormDataEntryValue | null = formData.get('password2');

        // Make call to api
        const url: string = `${process.env.NEXT_PUBLIC_DATABASE_URL}user/register/`;
        const res: AxiosResponse<any, any> = await axios.post(url, { email, full_name, password, password2 });

        // Check response
        if (res.status === 201) {
            // If success, 
            
            // For email authentication route, redirect to verify email component
            // router.push("/user/verify-email/");

            // For no email authentication route
            toast.success(res.data.message);
            router.push("/user/log-in");

        } else {
            // Server error 
            toast.error("Sign-up failed")
        }
    }

    return (
        <form className="space-y-4 md:space-y-6" onSubmit={handleSignUp}>
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t["Email1"]}</label>
                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={t["Email2"]} required/>
            </div>
            <div>
                <label htmlFor="full_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t["FullName1"]}</label>
                <input type="text" name="full_name" id="full_name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={t["FullName2"]} required/>
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t["Password"]}</label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
            </div>
            <div>
                <label htmlFor="password2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t["ConfirmPassword"]}</label>
                <input type="password" name="password2" id="password2" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
            </div>
            <button type="submit" className="w-full text-white bg-customBlue-mid hover:bg-customBlue-light focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-800">{t["SignUp"]}</button>
        </form>
    )
}