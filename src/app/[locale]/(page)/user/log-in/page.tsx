// IMPORT MODULES
import LogInComponent from './log-in-component';
import CheckAuthComponent from "../../_global/check-auth-component";
import { useRouter, Link } from "@/navigation";

// IMPORT SUB-PAGE COMPONENTS
import LogInFormComponent from './LogInFormComponent';

// https://nextjs.org/docs/pages/building-your-application/authentication
// https://flowbite.com/blocks/marketing/login/

// PAGE COMPONENT
export default async function LogIn() {
  return (
      <div className='flex flex-col w-full items-center justify-center'>
        <CheckAuthComponent />
        <LogInComponent />
        <LogInFormComponent />
      </div>
  )
}
