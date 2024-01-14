// MODULES IMPORT
import {useTranslations} from 'next-intl';

// PAGE COMPONENT
export default function Home(): JSX.Element {
    const t = useTranslations('Index');
    
    return (
        <div>
            <h1>{t('title')}</h1>
            <p>Bookkeeper</p>
            <p>Bookkeeper</p>
        </div>
    )
}