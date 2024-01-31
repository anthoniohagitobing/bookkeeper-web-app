// MODULES IMPORT
import LogInComponent from './log-in-component';
import CheckAuthComponent from "../../_global/check-auth-component";

// PAGE COMPONENT
export default async function LogIn() {
  return (
      <div>
        <CheckAuthComponent />
        <LogInComponent />
      </div>
  )
}