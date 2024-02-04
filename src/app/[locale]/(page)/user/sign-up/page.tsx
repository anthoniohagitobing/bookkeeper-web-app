// IMPORT MODULES
import { Link } from "@/navigation"

// IMPORT SUB-PAGE COMPONENTS
import CheckAuthComponent from "../../_global/check-auth-component";
import SignUpFormComponent from "./sign-up-form-component";

import BackupSignUpComponent from './backup-sign-up-component';

// PAGE COMPONENT
export default async function SignUp() {
  return (
      <>
        <CheckAuthComponent />
        <div className="flex flex-col items-center justify-center w-full"> 
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-full bg-white dark:border md:mt-0 dark:bg-gray-800 dark:border-gray-700">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create a new account
              </h1>
              <SignUpFormComponent />
              <p className="text-sm font-light text-black dark:text-white">
                  Already have an account yet? <Link href="/user/log-in" className="font-bold text-customBlue-light hover:underline">Log in</Link>
              </p>
          </div>
        </div>
      </>
  )
}