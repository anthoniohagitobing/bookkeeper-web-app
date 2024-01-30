// IMPORT MODULES
import {useTranslations} from 'next-intl';

// Sub-page component
import NavBarLogo from "./navbar-logo"
import NavBarSideBar from './navbar-sidebar';
import NavBarNavigation from './navbar-navigation';
import ThemeSwitcher from './theme-switcher';

export default function NavBar({currentLocale}: {currentLocale: string}) {
    const t = useTranslations('NavBar');

    const sideBarTranslations: {
        [index: string]: string;
    } = {
        test1: t('test1'),
        test2: t('test2')
    }

    // PAGE COMPONENT
    return (
        <nav className="border-b-2 border-customBackground-lightLine bg-customBackground-lightBlock dark:bg-customBackground-darkBlock dark:border-customBackground-darkLine max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
            {/* Left */}
            <div className="flex items-center">
                <NavBarLogo t={t}/>
                <NavBarNavigation />
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
                <ThemeSwitcher />
                <NavBarSideBar />
            </div>
        </nav>
    )
}