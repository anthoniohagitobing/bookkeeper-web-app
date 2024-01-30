// IMPORT MODULES
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
 
// PAGE COMPONENTS
export default function PageNotFound() {
    // This function handles all none-available path (404)

    const t = useTranslations('PageNotFound');
    return (
        <div className='flex flex-col items-center justify-center gap-5 h-screen w-screen'>
            <h1 className='text-4xl'>{t('Error')}</h1>
            <h2 className='text-2xl'>{t('Title')}</h2>
            <Link href="/" className='text-customBlue-light underline'>
                {t('Link')}
            </Link>
        </div>
    )
}