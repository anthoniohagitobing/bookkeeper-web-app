'use client';

// IMPORT MODULES
import { Link } from "@/navigation"
import { FormEvent } from 'react'
import { useRouter} from "@/navigation";
import axios, { AxiosResponse } from "axios";
import { toast } from 'react-toastify';
import secureLocalStorage from "react-secure-storage";
import { Translation } from '@/lib/global-types';

// PAGE COMPONENT
export default function LogInFormComponent({t}: {t:Translation}): JSX.Element {
    // NAVIGATION SETUP
    const router = useRouter();

    // Handle log in
    async function handleLogIn(e: FormEvent<HTMLFormElement>) {
        // Prevent form default
        e.preventDefault()
        
        // Extract form data
        const formData: FormData = new FormData(e.currentTarget)
        const email: FormDataEntryValue | null = formData.get('email')
        const password: FormDataEntryValue | null = formData.get('password')
     
        // Make call to api
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
            router.push("/dashboard/");
        } else {
            // Server error 
            toast.error("Log-in failed")
        }
    }

    return (
        <form className="space-y-4 md:space-y-6" onSubmit={handleLogIn}>
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t["Email1"]}</label>
                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={t["Email2"]} required/>
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t["Password"]}</label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
            </div>
            <div className="flex items-center justify-between">
                {/* <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required/>
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                    </div>
                </div> */}
                <Link href="/user/forgot-password" className="text-sm font-bold text-customBlue-light text-primary-600 hover:underline dark:text-primary-500">{t["ForgotPassword"]}</Link>
            </div>
            <button type="submit" className="w-full text-white bg-customBlue-mid hover:bg-customBlue-light focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-800">{t["LogIn"]}</button>
        </form>
    )
}