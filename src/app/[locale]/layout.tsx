// IMPORT MODULES
import { Metadata } from 'next';
import { lusitana } from '@/lib/fonts';
import LayoutSub from './layout-sub';
import NavBar from './navbar';

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
    <html lang={locale}>
      <body className={`${lusitana.className}`}>
        <LayoutSub childrenProp={children}/>
      </body>
    </html>
  )
}
