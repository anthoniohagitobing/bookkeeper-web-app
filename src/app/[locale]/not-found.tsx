// IMPORT MODULES
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
 
// PAGE COMPONENTS
export default function NotFoundPage() {
    // This function handles all none-available path (404)

    const t = useTranslations('NotFoundPage');
    return (
        <>
            <h1>{t('title')}</h1>
            <Link href="/">Press here to go back to home page</Link>
        </>
    )
}