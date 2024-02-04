// IMPORT MODULES
import { Link } from "@/navigation"

// IMPORT SUB-PAGE COMPONENTS
import CheckAuthComponent from "../../_global/check-auth-component";
import LogInFormComponent from './log-in-form-component';

// https://nextjs.org/docs/pages/building-your-application/authentication
// https://flowbite.com/blocks/marketing/login/

// PAGE COMPONENT
export default async function LogIn() {
  return (
      <>
        <CheckAuthComponent />
        <div className="flex flex-col items-center justify-center w-full"> 
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-full bg-white dark:border md:mt-0 dark:bg-gray-800 dark:border-gray-700">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Log in to your account
              </h1>
              <LogInFormComponent />
              <p className="text-sm font-light text-black dark:text-white">
                  Don’t have an account yet? <Link href="/user/sign-up" className="font-bold text-customBlue-light hover:underline">Sign up</Link>
              </p>
          </div>
          {/* picture at mid size */}
        </div>
      </>
  )
}
