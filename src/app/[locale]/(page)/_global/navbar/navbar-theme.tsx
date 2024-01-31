'use client';

// IMPORT MODULES
import Image from "next/image";
import react, { useState, useEffect } from 'react';
import { useTheme } from "next-themes";
import { classNames } from "@/lib/helper-function";

export default function NavBarTheme() {
    // STATE AND THEME VARIABLES
    const [open, setOpen] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false)
    const { setTheme, resolvedTheme } = useTheme()

    // Use effect to check if client side has been rendered. This is for dark mode
    useEffect(() => setMounted(true), [])

    // If still not mounted, return placeholder picture
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
    
    // Once mounted, return theme button
    return (
        <div className="relative hidden md:flex">
            {/* Button component */}
            <button onClick={() => setOpen(prevCheck => !prevCheck)} className="hover:bg-customGray-light rounded-full">
                <span className="sr-only">Change light or dark mode</span>
                {resolvedTheme   === 'light' ? 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 border-2 border-black rounded-full p-1.5 dark:border-white fill-current" viewBox="0 0 16 16">
                        <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
                    </svg>
                    : 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 border-2 border-black rounded-full p-1.5 dark:border-white fill-current" viewBox="0 0 16 16">
                        <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"/>
                    </svg>
                }
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
                    open ? "absolute" : "hidden",
                    "right-0 z-20 mt-10 font-normal bg-white origin-top-right rounded-lg shadow w-24 dark:divide-gray-600",
                )}
            >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                    <li>
                        <div
                            onClick={() => {
                                setTheme('light');
                                setOpen(prevCheck => !prevCheck);
                            }}
                            className={classNames(
                            resolvedTheme === 'light' ? 'text-customBlue-light font-bold' : 'text-black',
                            'px-4 py-2 text-base flex items-center gap-2 hover:cursor-pointer hover:bg-gray-100'
                            )}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 16 16">
                                <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
                            </svg>
                            <p>Light</p>
                        </div>
                    </li>
                    <li>
                        <div
                            onClick={() => {
                                setTheme('dark');
                                setOpen(prevCheck => !prevCheck);
                            }}
                            className={classNames(
                            resolvedTheme === 'dark' ? 'text-customBlue-light font-bold' : 'text-black',
                            'px-4 py-2 text-base flex items-center gap-2 hover:cursor-pointer hover:bg-gray-100'
                            )}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 16 16">
                                <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"/>
                            </svg>
                            <p>Dark</p>
                        </div>
                    </li>
                </ul>
            </menu>
        </div>
    )
}