// MODULES IMPORT
import SignUpComponent from './sign-up-component';
import CheckAuthComponent from "../../_global/check-auth-component";

// PAGE COMPONENT
export default async function SignUp() {
  return (
      <div>
        <CheckAuthComponent />
        <SignUpComponent />
      </div>
  )
}