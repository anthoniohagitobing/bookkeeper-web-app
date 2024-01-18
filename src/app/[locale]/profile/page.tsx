// MODULES IMPORT
import ProfileComponent from './profile-component';
import CheckAuthComponent from "../global/check-auth-component";

// PAGE COMPONENT
export default async function Profile(): Promise<JSX.Element> {
  // const checkAuth = await checkAuthFunction();

  return (
      <div>
        <CheckAuthComponent />
        <ProfileComponent />
      </div>
  )
}
