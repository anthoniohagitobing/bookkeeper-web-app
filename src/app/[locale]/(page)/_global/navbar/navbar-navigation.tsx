'use client'

// IMPORT MODULES
import { Link } from "@/navigation";
import { useContext } from "react";
import { ContextVariables } from '@/lib/context-variables';
import { Translation } from "@/lib/global-types";

export default function NavBarNavigation({t}:{t: Translation}): JSX.Element {
    // STATE AND CONTEXT VARIABLES
    const { userAuthenticated } = useContext(ContextVariables);

    // Navigation library
    const navigation = [
        { name: t["NavigationDashboard"], href: '/dashboard', current: true },
        { name: t["NavigationProfile"], href: '/profile', current: false },
    ]

    // If user is not authenticated, return no navigation button
    if (!userAuthenticated) {
        return <></>
    }

    // If user is authenticated, return navigation
    return (
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
    )
}