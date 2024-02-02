// MODULES IMPORT
import { useTranslations } from 'next-intl';
import { Link } from "@/navigation"

// PAGE COMPONENT
export default function Home(): JSX.Element {
    const t = useTranslations('Home');
    
    return (
        <div className='flex flex-col w-full items-center justify-center'>
            <h1 className="mt-20 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{t('Title')}</h1>
            <p className="mb-6 text-center text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                {t('Description')}
            </p>
            <Link href="/user/log-in/" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-customBlue-mid rounded-lg hover:bg-customBlue-light focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                {t('Button')}
                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </Link>

        </div>
    )
}