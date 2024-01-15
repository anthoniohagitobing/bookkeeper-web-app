// MODULES IMPORT
import CheckAuthComponent from "../global/check-auth-component";

// PAGE COMPONENT
export default async function Dashboard(): Promise<JSX.Element> {

    return (
        <div>
            <CheckAuthComponent />
            <p>Dashboard</p>
        </div>
    )
}