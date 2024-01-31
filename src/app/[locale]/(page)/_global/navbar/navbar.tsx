// IMPORT MODULES
import { useTranslations } from 'next-intl';
import { Translation } from '@/lib/global-types';
import { getLocale } from 'next-intl/server';

// Sub-page component
import NavBarLogo from "./navbar-logo";
import NavBarSideBar from './navbar-sidebar';
import NavBarNavigation from './navbar-navigation';
import NavBarTheme from './navbar-theme';
import NavBarLocale from './navbar-locale';
import NavBarAccount from './navbar-account';

export default async function NavBar() {
    const t = useTranslations('NavBar');
    const currentLocale: string = await getLocale();

    const sideBarTranslations: {[index: string]: string;} = {
        test1: t('test1'),
        test2: t('test2')
    }

    const navigationTranslations: Translation = {
        NavigationDashboard: t('NavigationDashboard'),
        NavigationProfile: t('NavigationProfile')
    }

    // PAGE COMPONENT
    return (
        <nav className="border-b-2 border-customTheme-lightLine bg-customTheme-lightBlock dark:bg-customTheme-darkBlock dark:border-customTheme-darkLine flex flex-wrap items-center justify-between mx-auto p-3">
            {/* Left */}
            <div className="flex items-center">
                <NavBarLogo t={t}/>
                <NavBarNavigation t={navigationTranslations}/>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
                <NavBarLocale currentLocale={currentLocale}/>
                <NavBarTheme />
                <NavBarAccount />
                <NavBarSideBar currentLocale={currentLocale}/>
            </div>
        </nav>
    )
}