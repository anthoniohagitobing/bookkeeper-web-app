'use client';

import Image from "next/image";
import { MoonIcon, SunIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react'
import react, { useState, useEffect, Fragment } from 'react';
import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
    // STATE AND THEME VARIABLES
    const [mounted, setMounted] = useState<boolean>(false)
    const { setTheme, resolvedTheme } = useTheme()

    // HELPER FUNCTION
    // Join function for classname
    function classNames(...classes: String[]) {
        return classes.filter(Boolean).join(' ')
    }

    // Use effect to check if client side has been rendered. This is for dark mode
    useEffect(() => setMounted(true), [])

    if (!mounted) return (
        <Image
          src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
          width={12}
          height={12}
          sizes="12x12"
          alt="Loading Light/Dark Toggle"
          priority={false}
          title="Loading Light/Dark Toggle"
        />
    )
    
    // if (resolvedTheme === 'dark') {
    //     return <SunIcon onClick={() => setTheme('light')} />
    // }
    
    // if (resolvedTheme === 'light') {
    //     return <MoonIcon onClick={() => setTheme('dark')} />
    // }

    return (
            <Menu as="div" className="relative">
                <Menu.Button className="hover:bg-customGray-light rounded-full">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Change light or dark mode</span>
                    {/* <SunIcon className="block h-8 w-8" /> */}
                    {resolvedTheme   === 'light' ? <SunIcon className="block h-8 w-8 border-2 border-black rounded-full p-px" aria-hidden="true"/> : <MoonIcon className="block h-8 w-8 border-2 border-black rounded-full p-px" aria-hidden="true"/>}
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                            {({ active }) => (
                            <div
                                onClick={ () => setTheme('light')}
                                className={classNames(
                                active ? 'bg-gray-100 cursor-pointer' : '',
                                resolvedTheme === 'light' ? 'text-customBlue-light font-bold' : 'text-black',
                                'px-4 py-2 text-base flex items-center gap-2'
                                )}
                            >
                                <SunIcon className="block h-8 w-8"/>
                                <p>Light</p>
                            </div>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                            <div
                                onClick={ () => setTheme('dark')}
                                className={classNames(
                                active ? 'bg-gray-100 cursor-pointer' : '',
                                resolvedTheme === 'dark' ? 'text-customBlue-light font-bold' : 'text-black',
                                'px-4 py-2 text-base flex items-center gap-2'
                                )}
                            >
                                <MoonIcon className="block h-8 w-8"/>
                                <p>Dark</p>
                            </div>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
    )
}