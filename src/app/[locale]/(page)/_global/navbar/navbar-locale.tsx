'use client';

// IMPORT MODULES
import { usePathname, useRouter } from "@/navigation";
import { useState } from 'react';
import { classNames } from "@/lib/helper-function";

export default function NavBarLocale({currentLocale}: {currentLocale: string}) {
    // STATE AND THEME VARIABLES
    const [open, setOpen] = useState<boolean>(false);

    // NAVIGATION SETUP
    const router = useRouter();
    const pathname = usePathname();

    // Available locale
    const availableLocale = [
        { acronym: 'en', displayName: 'English-US'},
        { acronym: 'id', displayName: 'Indonesia'},
        { acronym: 'jp', displayName: '日本語'}
    ]

    // HELPER FUNCTION
    // Change locale
    function changeLocale(locale: string) {
        router.replace(`${pathname}`, {locale: locale});
    }

    return (
        <div className="relative hidden md:flex">
            {/* Button component */}
            <button onClick={() => setOpen(prevCheck => !prevCheck)} className="hover:bg-customGray-light rounded-full">
                <span className="sr-only">Change language</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 border-2 border-black rounded-full p-1.5 dark:border-white fill-current" viewBox="0 0 16 16">
                    <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022z"/>
                    <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995q.289.451.63.846c-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6 6 0 0 1-.415-.492 2 2 0 0 1-.94.31"/>
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
                    "absolute transition-all right-0 z-20 mt-10 font-normal bg-white origin-top-right rounded-lg shadow w-32 dark:divide-gray-600",
                )}
            >
                <ul className="py-2 text-sm" aria-labelledby="dropdownHoverButton">
                    {availableLocale.map((item) => (
                        <li 
                            key={item.acronym}
                            onClick={() => {
                                changeLocale(item.acronym)
                                setOpen(prevCheck => !prevCheck)
                            }}
                            className={classNames(
                            currentLocale === item.acronym ? 'text-customBlue-light font-bold' : 'text-black',
                            'block px-4 py-2 text-base hover:cursor-pointer hover:bg-gray-100'
                            )}
                        >
                            {item.displayName}
                        </li>
                    ))}
                </ul>
            </menu>
        </div>
    )
}