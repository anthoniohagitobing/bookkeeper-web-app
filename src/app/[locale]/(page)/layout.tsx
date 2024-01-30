import NavBar from './_global/navbar/navbar';
import { getLocale } from 'next-intl/server';

export default async function Layout({ children }: { children: React.ReactNode }) {
    const locale: string = await getLocale();
    return (
        <>
            <NavBar currentLocale={locale}/>
            <div>{children}</div>
        </>
    )
}