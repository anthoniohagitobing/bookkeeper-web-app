// IMPORT MODULES
import { Metadata } from 'next';
import { lusitana } from '@/lib/fonts';
import LayoutSub from './layout-sub';
import { Providers } from '@/lib/providers';

// CSS
import 'react-toastify/dist/ReactToastify.css';
import "../../lib/globals.css"

// DEFAULT NAMING
export const metadata: Metadata = {
  title: 'Bookkeeper',
}

interface RootLayout {
  children: React.ReactNode,
  params: {
    locale: string
  }
}

// ROOT LAYOUT
export default function RootLayout({ children, params: {locale} }: RootLayout) {
  return (
    <html lang={locale} suppressHydrationWarning> 
    {/* Suppress hydration warning is for avoiding dark mode conflict between server and client */}
      <body className={`${lusitana.className}`}>
        <Providers>
          <LayoutSub childrenProp={children} currentLocale={locale}/>
        </Providers>
      </body>
    </html>
  )
}
