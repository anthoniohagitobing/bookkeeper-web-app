// MODULES IMPORT
import { Metadata } from 'next';
import {useTranslations} from 'next-intl';

// PAGE NAME
export const metadata: Metadata = {
    title: 'Home',
}

// PAGE COMPONENT
export default function Home(): JSX.Element {
    const t = useTranslations('Index');
    
    return (
        <div className="home">
            <h1>{t('title')}</h1>
            <p>Bookkeeper</p>
            <p>Bookkeeper</p>
        </div>
    )
}