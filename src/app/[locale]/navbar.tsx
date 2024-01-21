'use client';

// IMPORT MODULES
import { Link, usePathname } from "../../navigation";
import { ContextVariables } from '../../lib/context-variables';
import react, { useState, useEffect, useContext } from 'react';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Reports', href: '#', current: false },
]

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ')
//   }

// PAGE COMPONENT
export default function NavBar() {
    const { userAuthenticated, setUserAuthenticated } = useContext(ContextVariables);
    // console.log(userAuthenticated);

    return (
        <div>
            { userAuthenticated ? (
                <div></div>
            ) : (
                <div></div>
            )
        }
            <div>
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
            </div>
        </div>
    )
}