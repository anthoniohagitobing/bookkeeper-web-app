// MODULES IMPORT
import {useTranslations} from 'next-intl';
import { Link } from "../../navigation"

// PAGE COMPONENT
export default function Home(): JSX.Element {
    const t = useTranslations('Home');
    
    return (
        <div>
            <h1>{t('title')}</h1>
            <Link href="/user/log-in/"><button>Get Started</button></Link>
        </div>
    )
}