// IMPORT MODULES
import { Link } from "@/navigation"
import { useTranslations } from 'next-intl';
import { Translation } from '@/lib/global-types';

// IMPORT SUB-PAGE COMPONENTS
import CheckAuthComponent from "../../_global/check-auth-component";
import SignUpFormComponent from "./sign-up-form-component";

// PAGE COMPONENT
export default function SignUp() {
  const t = useTranslations('SignUp');

  const formTranslations: Translation = {
    Email1: t("Email1"),
    Email2: t("Email2"),
    FullName1: t("FullName1"),
    FullName2: t("FullName2"),
    Password: t("Password"),
    ConfirmPassword: t("ConfirmPassword"),
    SignUp: t("SignUp")
  }

  return (
      <>
        <CheckAuthComponent />
        <div className="flex flex-col items-center justify-center w-full"> 
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-full bg-white dark:border md:mt-0 dark:bg-gray-800 dark:border-gray-700">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  {t("Title")}
              </h1>
              <SignUpFormComponent t={formTranslations}/>
              <p className="text-sm font-light text-black dark:text-white">
                {t("LogIn1")} <Link href="/user/log-in" className="font-bold text-customBlue-light hover:underline">{t("LogIn2")}</Link>
              </p>
          </div>
        </div>
      </>
  )
}