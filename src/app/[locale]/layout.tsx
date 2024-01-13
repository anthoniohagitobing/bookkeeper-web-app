// IMPORT MODULES
import { Metadata } from 'next';
import LayoutSub from './layout-sub';
// import 'react-toastify/dist/ReactToastify.css';

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
      <LayoutSub childrenProp={children}/>
    </html>
  )
}
