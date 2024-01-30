import NavBarOld from './_global/navbar/navbar-old';
import NavBar from './_global/navbar/navbar';
import { getLocale } from 'next-intl/server';

export default async function Layout({ children }: { children: React.ReactNode }) {
    const locale: string = await getLocale();
    return (
        <div className='min-h-screen'>
            <NavBarOld currentLocale={locale}/>
            <NavBar currentLocale={locale}/>
            <div className='flex grow'>{children}</div>
        </div>
    )
}