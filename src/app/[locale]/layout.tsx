// IMPORT MODULES
import LayoutSub from './layout-sub';

// DEFAULT NAMING
export const metadata = {
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
