'use client';

// IMPORT MODULES
import { Link, usePathname } from "../../../../navigation";
import { ContextVariables } from '../../../../lib/context-variables';
import react, { useState, useEffect, useContext, Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { UserCircleIcon } from "@heroicons/react/24/solid";



const navigation = [
  { name: 'Dashboard', href: '/dashboard', current: true },
  { name: 'Profile', href: '/profile', current: false },
]

const userNavigation = [
  { name: 'Profile', href: '/profile' },
//   { name: 'Settings', href: '#' },
  { name: 'Sign Out', href: '#' },
]

function classNames(...classes: String[]) {
    return classes.filter(Boolean).join(' ')
  }

// PAGE COMPONENT
export default function NavBar() {
    const { userAuthenticated } = useContext(ContextVariables);
    const { userEmail } = useContext(ContextVariables);
    // console.log(userAuthenticated);

    const user = {
        email: userEmail,
        // imageUrl: "",
      }

    return (
        <div>
            { !userAuthenticated ? (
                <div></div>
            ) : (
                <div></div>
            )}
            {/* <div>
                <p>Left</p>
                <Link href="/">
                    <img src="/logo.jpeg"></img>
                    <p className="text-3xl font-bold underline">Bookkeeper</p>
                </Link>
            </div>
            <div>
                <p>Right</p>
                <Link href="/user/sign-up/">
                    <button>Sign-up</button>
                </Link>
                <Link href="/user/log-in/">
                    <button>Log-in</button>
                </Link>
            </div> */}
            <Disclosure as="nav" className="bg-white border-b-2 border-gray-300">
                {({ open }) => (
                    <>
                    {/* Navbar block */}
                    <div className="mx-auto px-2 sm:px-4 lg:px-6">
                        <div className="flex h-16 items-center justify-between">
                            {/* Per item, on left */}
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
                                    <p className="text-black font-bold text-lg ml-2">Bookkeeper</p>
                                </Link>
                                {/* Other items, only shown on desktop */}
                                <div className="hidden md:block">
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className={classNames(
                                            item.current
                                                ? 'bg-gray-900 text-white'
                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'rounded-md px-3 py-2 text-sm font-medium'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Profile dropdown, desktop */}
                            <div className="hidden md:block">
                                <div className="ml-4 flex items-center md:ml-6">
                                    <Menu as="div" className="relative ml-3">
                                        {/* Button to open */}
                                        <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <UserCircleIcon className="block h-8 w-8 text-white" aria-hidden="true"/>
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
                                                {userNavigation.map((item) => (
                                                <Menu.Item key={item.name}>
                                                    {({ active }) => (
                                                    <a
                                                        href={item.href}
                                                        className={classNames(
                                                        active ? 'bg-gray-100' : '',
                                                        'block px-4 py-2 text-sm text-gray-700'
                                                        )}
                                                    >
                                                        {item.name}
                                                    </a>
                                                    )}
                                                </Menu.Item>
                                                ))}
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>

                            {/* Profile dropdown, mobile */}
                            <div className="-mr-2 flex md:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                    {/* Navbar dropdown, for mobile only */}
                    <Disclosure.Panel className="md:hidden">
                        {/* Page navigation, primary item */}
                        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                        {/* Page navigation, user item */}
                        <div className="border-t border-gray-700 pb-3 pt-4">
                            {/* User info */}
                            <div className="flex items-center px-5">
                                <div className="flex-shrink-0">
                                    {/* <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" /> */}
                                    <UserCircleIcon className="block h-8 w-8 text-white" aria-hidden="true"/>
                                </div>
                                <div className="ml-3">
                                    <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                                </div>
                            </div>
                            <div className="mt-3 space-y-1 px-2">
                                {userNavigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                >
                                    {item.name}
                                </Disclosure.Button>
                                ))}
                            </div>
                        </div>
                    </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </div>
    )
}