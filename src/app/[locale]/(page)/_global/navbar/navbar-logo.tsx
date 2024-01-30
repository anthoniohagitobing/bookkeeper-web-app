// MODULES IMPORT
import { Link } from "@/navigation";

export default function NavBarLogo({t}:{t:any}): JSX.Element {
    
    // PAGE COMPONENT
    return (
            <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="/logo.jpeg" className="h-10" alt="Bookkeeper Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{t("Logo")}</span>
            </Link>
    )
}