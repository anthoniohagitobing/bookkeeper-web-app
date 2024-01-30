// IMPORT MODULES
import {useTranslations} from 'next-intl';
import { Translation } from '@/lib/global-types';

// Sub-page component
import NavBarLogo from "./navbar-logo"
import NavBarSideBar from './navbar-sidebar';
import NavBarNavigation from './navbar-navigation';
import NavBarTheme from './navbar-theme';

export default function NavBar({currentLocale}: {currentLocale: string}) {
    const t = useTranslations('NavBar');

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
        <nav className="border-b-2 border-customTheme-lightLine bg-customTheme-lightBlock dark:bg-customTheme-darkBlock dark:border-customTheme-darkLine max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
            {/* Left */}
            <div className="flex items-center">
                <NavBarLogo t={t}/>
                <NavBarNavigation t={navigationTranslations}/>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
                <NavBarTheme />
                <NavBarSideBar />
            </div>
        </nav>
    )
}