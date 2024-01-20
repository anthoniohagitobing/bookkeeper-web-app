'use client';

// IMPORT MODULES
import { ContextVariables } from '../../lib/context-variables';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Navbar from './navbar';

// DATA TYPE
interface Props {
    childrenProp: React.ReactNode;
}

// PAGE COMPONENT
export default function LayoutSub(props: Props): JSX.Element {
    const [userAuthenticated, setUserAuthenticated] = useState<boolean>(false);
    
    // const [userId, setUserId] = useState<number>(0);
    // const [userUid, setUserUid] = useState<string>('noUid');
    // const [userFirstName, setUserFirstName] = useState<string>('noFirstName');
    // const [userLastName, setUserLastName] = useState<string>('noLastName');
    // const [userEmail, setUserEmail] = useState<string>('noEmail');
    // const [userPhotoUrl, setUserPhotoUrl] = useState<string>('noPhotoUrl');

    return (
        <>
            <ContextVariables.Provider value={{userAuthenticated, setUserAuthenticated }}>
                <ToastContainer />
                <Navbar />
                {props.childrenProp}
            </ContextVariables.Provider>
        </>
    )
}