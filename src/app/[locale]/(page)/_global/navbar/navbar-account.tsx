'use client'

// IMPORT MODULES
import { Link, usePathname, useRouter } from "@/navigation";
import { useContext, useState } from "react";
import { ContextVariables } from '@/lib/context-variables';
import { classNames } from "@/lib/helper-function";
import secureLocalStorage from "react-secure-storage";
import axiosInstance from "@/lib/axios-instance";
import { AxiosResponse } from "axios";
import { toast } from 'react-toastify';


export default function NavBarAccount() {
    // STATE AND CONTEXT VARIABLES
    const { userAuthenticated } = useContext(ContextVariables);
    const { setUserAuthenticated } = useContext(ContextVariables);
    const { userEmail, userFullName } = useContext(ContextVariables);
    const [open, setOpen] = useState<boolean>(false);

    // NAVIGATION SETUP
    const router = useRouter();

    // Logout
    async function handleLogout() {
        // From local storage, retrieve user refresh token. Note that you need to parse it as it is in json
        // Refresh token is required so that it can be blacklisted in the back end
        // Note that you cannot use useEffect as navbar is only loaded once at the start of the page load. Once log-in, the navbar is no longer reloaded
        const jsonRefreshToken: string = secureLocalStorage.getItem("refresh_token") as string;
        const refreshToken = JSON.parse(jsonRefreshToken);


        const url: string = "user/logout/";
        const res: AxiosResponse<any, any> = await axiosInstance.post(url, {"refresh_token": refreshToken})
        if (res.status = 200) {
            // Remove token from local storage
            secureLocalStorage.removeItem("access_token");
            secureLocalStorage.removeItem("refresh_token");

            // Set global authentication as false;
            setUserAuthenticated(false);

            // Display success messsage and push to log-in
            toast.success("Log-out successful");
            router.push("/user/log-in/");
        }
    }

    // If use is not authenticated, return log-in, sign-up button
    if (!userAuthenticated) {
        return (
            <div>
                <Link href="/user/log-in/" className="text-black hover:bg-customBlue-mid hover:text-white rounded-md px-2 py-2 text-base font-medium">
                    Log-in/Sign-up
                </Link>
            </div>
        )
    }

    // If user is authenticated, return account component
    return (
        <div className="relative hidden md:flex">
            {/* Button component */}
            <button onClick={() => setOpen(prevCheck => !prevCheck)} className="hover:bg-customGray-light rounded-full">
                <span className="sr-only">Open account menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 rounded-full dark:border-white fill-current" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                </svg>
            </button>

            {/* Overlay component */}
            <div 
                onClick={() => setOpen(prevCheck => !prevCheck)}
                className={classNames(
                    open ? "fixed" : "hidden",
                    "top-0 left-0 h-screen w-screen z-10",
                )}
            >
            </div>

            {/* Dropdown menu */}
            <menu 
                className={classNames(
                    open ? "visible opacity-100" : "invisible opacity-0",
                    "absolute transition-all right-0 z-20 mt-10 font-normal bg-white origin-top-right rounded-lg shadow dark:divide-gray-600",
                )}
            >
                <ul className="py-2 text-sm text-black" aria-labelledby="dropdownHoverButton">
                        <li
                            className='block px-4 py-3 border-b-2 border-customTheme-lightLine dark:border-customTheme-darkLine text-base'
                        >
                            <div className="flex ">
                                <div className="flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 rounded-full dark:border-white fill-current" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium leading-none text-black">{userFullName}</div>
                                    <div className="text-sm font-medium leading-none text-customGray-mid">{userEmail}</div>
                                </div>
                            </div>
                        </li>
                        <li
                        >
                            <Link 
                                href='/profile/'
                                className='block px-4 py-2 text-base hover:cursor-pointer hover:bg-gray-100'
                            >
                                Profile
                            </Link>
                        </li>
                        <li
                            onClick={() => {
                                setOpen(prevCheck => !prevCheck)
                                handleLogout()
                            }}
                            className='block px-4 py-2 text-base hover:cursor-pointer hover:bg-gray-100'
                        >
                            Log-out
                        </li>
                </ul>
            </menu>
        </div>
    )
}