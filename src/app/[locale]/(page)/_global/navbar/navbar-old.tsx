'use client';

// IMPORT MODULES
import { Link, usePathname, useRouter } from "@/navigation";
import { ContextVariables } from '@/lib/context-variables';
import react, { useState, useEffect, useContext, Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, LanguageIcon } from '@heroicons/react/24/outline'
import { UserCircleIcon } from "@heroicons/react/24/solid";
import secureLocalStorage from "react-secure-storage";
import axiosInstance from "@/lib/axios-instance";
import axios, { AxiosResponse } from "axios";
import { toast } from 'react-toastify';

// SUB-COMPONENTS
import ThemeSwitcher from "./theme-switcher";

// PAGE COMPONENT
export default function NavBarOld({currentLocale}: {currentLocale: string}) {
    // STATE AND CONTEXT VARIABLES
    const { userAuthenticated } = useContext(ContextVariables);
    const { userEmail, userFullName } = useContext(ContextVariables);
    const { setUserAuthenticated } = useContext(ContextVariables);

    // NAVIGATION SETUP
    const router = useRouter();
    const pathname = usePathname();

    // HELPER FUNCTION
    // Join function for classname
    function classNames(...classes: String[]) {
        return classes.filter(Boolean).join(' ')
    }

    // Change locale
    function changeLocale(locale: string) {
        router.replace(`${pathname}`, {locale: locale});
    }

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

    // ADDITIONAL DICTIONARIES FOR MAPPING COMPONENTS
    const user = {
        email: userEmail,
        fullName: userFullName,
        // imageUrl: "",
      }

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', current: true },
        { name: 'Profile', href: '/profile', current: false },
    ]
      
    const userNavigation = [
        { name: 'Profile', href: '/profile' },
        // { name: 'Settings', href: '#' },
    ]

    const availableLocale = [
        { acronym: 'en', displayName: 'English-US'},
        { acronym: 'id', displayName: 'Indonesia'},
        { acronym: 'jp', displayName: '日本語'}
    ]

    // COMPONENTS
    return (
        <>
            <Disclosure as="nav" className="bg-white dark:bg-black border-b-2 border-customGray-light">
                {({ open }) => (
                    <>
                    {/* Navbar block */}
                    <div className="mx-auto px-4 sm:px-4 lg:px-6">
                        {/* Separating left and right */}
                        <div className="flex h-16 items-center justify-between">

                            {/* Left Section */}
                            <div className="flex items-center">
                                {/* Logo */}
                                <Link href="/" className="flex items-center">
                                    <div className="flex flex-shrink-0">
                                        <img
                                            className="h-10 w-10 rounded-xl"
                                            src="/logo.jpeg"
                                            alt="Bookkeeper logo"
                                        />
                                    </div>
                                    <p className="text-black font-bold text-xl ml-2">Bookkeeper</p>
                                </Link>
                                {/* Other items, only shown on desktop and when aunthicated*/}
                                { userAuthenticated ? (
                                    <div className="hidden md:block">
                                        <div className="ml-12 flex items-baseline space-x-4">
                                            {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className="text-black hover:bg-customBlue-mid hover:text-white rounded-md px-7 py-2 text-base font-medium"
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Link>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>

                            {/* Right section */}
                            <div className="flex h-full items-center gap-3">
                                {/* Language */}
                                <Menu as="div" className="relative">
                                    <Menu.Button className="hover:bg-customGray-light rounded-full">
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">Change language</span>
                                        <LanguageIcon className="block h-8 w-8 border-2 border-black rounded-full p-px" aria-hidden="true"/>
                                    </Menu.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            {availableLocale.map((item) => (
                                            <Menu.Item key={item.acronym}>
                                                {({ active }) => (
                                                <div
                                                    onClick={() => changeLocale(item.acronym)}
                                                    className={classNames(
                                                    active ? 'bg-gray-100 cursor-pointer' : '',
                                                    currentLocale === item.acronym ? 'text-customBlue-light font-bold' : 'text-black',
                                                    'block px-4 py-2 text-base'
                                                    )}
                                                >
                                                    {item.displayName}
                                                </div>
                                                )}
                                            </Menu.Item>
                                            ))}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>

                                {/* Theme switcher */}
                                <ThemeSwitcher />

                                { userAuthenticated ? (
                                    <>
                                        {/* Profile dropdown, desktop */}
                                        <div className="hidden md:block">
                                            <Menu as="div" className="relative hidden md:block">
                                                {/* Button to open */}
                                                <Menu.Button className="block border-black rounded-full">
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">Open user menu</span>
                                                    <UserCircleIcon className="block h-10 w-10" aria-hidden="true"/>
                                                    {/* <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" /> */}
                                                </Menu.Button>
                                                {/* Transition effect */}
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    {/* Menu items */}
                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                            <div
                                                                className='block px-4 py-2 text-base text-black'
                                                            >
                                                                {/* <div className="border-t border-customGray-light pb-3 pt-4"> */}
                                                                {/* User info */}
                                                                <div className="flex ">
                                                                    <div className="flex-shrink-0">
                                                                        {/* <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" /> */}
                                                                        <UserCircleIcon className="block h-10 w-10 text-black bg-white" aria-hidden="true"/>
                                                                    </div>
                                                                    <div className="ml-3">
                                                                        <div className="text-base font-medium leading-none text-black">{user.fullName}</div>
                                                                        <div className="text-sm font-medium leading-none text-customGray-mid">{user.email}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            )}
                                                        </Menu.Item>
                                                        {userNavigation.map((item) => (
                                                            <Menu.Item key={item.name}>
                                                                {({ active }) => (
                                                                <Link
                                                                    href={item.href}
                                                                    className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-base text-black'
                                                                    )}
                                                                >
                                                                    {item.name}
                                                                </Link>
                                                                )}
                                                            </Menu.Item>
                                                        ))}
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                            <div
                                                                className={classNames(
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-base text-black hover:cursor-pointer'
                                                                )}
                                                                onClick={handleLogout}
                                                            >
                                                                Log-out
                                                            </div>
                                                            )}
                                                        </Menu.Item>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>

                                        {/* Navbar dropdown button, mobile only */}
                                        <div className="flex md:hidden">
                                            {/* Mobile menu button */}
                                            <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-customGray-light border-2 border-customGray-light hover:bg-customBlue-light hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 ">
                                                <span className="absolute -inset-0.5" />
                                                <span className="sr-only">Open main menu</span>
                                                {open ? (
                                                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                                ) : (
                                                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                                )}
                                            </Disclosure.Button>
                                        </div>
                                    </>
                                ) : (
                                    <div>
                                        <Link href="/user/log-in/" className="text-black hover:bg-customBlue-mid hover:text-white rounded-md px-2 py-2 text-base font-medium">
                                            Log-in/Sign-up
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Navbar dropdown paper, for mobile only */}
                    <Disclosure.Panel className="md:hidden border-t-2 border-customGray-light bg-white fixed min-w-full min-h-screen">
                        {/* Page navigation, primary item */}
                        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                            {navigation.map((item) => (
                                <Link 
                                    key={item.name}
                                    href={item.href}
                                >
                                    <Disclosure.Button
                                        as="div"
                                        className='text-black hover:bg-customBlue-mid hover:text-white block rounded-md px-3 py-2 text-base font-medium'
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                </Link>
                            ))}
                        </div>
                        
                        {/* Page navigation, user item */}
                        <div className="border-t border-customGray-light pb-3 pt-4">
                            {/* User info */}
                            <div className="flex items-center px-5">
                                <div className="flex-shrink-0">
                                    {/* <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" /> */}
                                    <UserCircleIcon className="block h-10 w-10" aria-hidden="true"/>
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium leading-none text-black">{user.fullName}</div>
                                    <div className="text-sm font-medium leading-none text-customGray-mid">{user.email}</div>
                                </div>
                            </div>
                            <div className="mt-3 space-y-1 px-2">
                                {userNavigation.map((item) => (
                                    <Link 
                                        key={item.name}
                                        href={item.href}
                                    >
                                        <Disclosure.Button
                                            as="div"
                                            className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-customBlue-mid hover:text-white"
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    </Link>
                                ))}
                                <Disclosure.Button
                                    as="div"
                                    className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-customBlue-mid hover:text-white hover:cursor-pointer"
                                    onClick={handleLogout}
                                >
                                    Log-out
                                </Disclosure.Button>
                            </div>
                        </div>
                    </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </>
    )
}