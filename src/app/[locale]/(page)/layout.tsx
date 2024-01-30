import NavBar from './_global/navbar/navbar';
import { getLocale } from 'next-intl/server';

export default async function Layout({ children }: { children: React.ReactNode }) {
    const locale: string = await getLocale();
    return (
        <div className='min-h-screen'>
            <NavBar currentLocale={locale}/>
            <div className='flex grow'>{children}</div>
        </div>
    )
}