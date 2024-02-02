// IMPORT MODULES
import LogInComponent from './log-in-component';
import CheckAuthComponent from "../../_global/check-auth-component";
import { useRouter, Link } from "@/navigation";

// IMPORT SUB-PAGE COMPONENTS
import LogInFormComponent from './log-in-form-component';

// https://nextjs.org/docs/pages/building-your-application/authentication
// https://flowbite.com/blocks/marketing/login/

// PAGE COMPONENT
export default async function LogIn() {
  return (
      <>
        <CheckAuthComponent />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"> 
          <LogInFormComponent />
          {/* picture */}
        </div>
        {/* <LogInComponent /> */}
      </>
  )
}
