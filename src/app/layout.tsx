// IMPORT MODULES
import LayoutSub from './layout-sub';

// DEFAULT NAMING
export const metadata = {
  title: 'Bookkeeper',
}

// ROOT LAYOUT
export default function RootLayout({ children }: { children: React.ReactNode}) {
  return (
    <html lang="en">
      <LayoutSub childrenProp={children}/>
    </html>
  )
}
