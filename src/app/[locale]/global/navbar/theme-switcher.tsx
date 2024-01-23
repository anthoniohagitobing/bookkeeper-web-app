'use client';

import Image from "next/image";
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import react, { useState, useEffect } from 'react';
import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
    // STATE AND THEME VARIABLES
    const [mounted, setMounted] = useState<boolean>(false)
    const { setTheme, resolvedTheme } = useTheme()

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
    
    if (resolvedTheme === 'dark') {
        return <SunIcon onClick={() => setTheme('light')} />
    }
    
    if (resolvedTheme === 'light') {
        return <MoonIcon onClick={() => setTheme('dark')} />
    }
}