'use client';

// IMPORT MODULES
import { ContextVariables } from '../../lib/context-variables';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Navbar from './global/navbar/navbar';

// DATA TYPE
interface Props {
    childrenProp: React.ReactNode,
    currentLocale: string
}

// PAGE COMPONENT
export default function LayoutSub(props: Props): JSX.Element {
    const [userAuthenticated, setUserAuthenticated] = useState<boolean>(false);
    const [userEmail, setUserEmail] = useState<string>('noEmail');
    const [userFullName, setUserFullName] = useState<string>('noFullName');
    
    // const [userId, setUserId] = useState<number>(0);
    // const [userUid, setUserUid] = useState<string>('noUid');
    // const [userFirstName, setUserFirstName] = useState<string>('noFirstName');
    // const [userLastName, setUserLastName] = useState<string>('noLastName');
    // const [userPhotoUrl, setUserPhotoUrl] = useState<string>('noPhotoUrl');

    return (
        <>
            <ContextVariables.Provider value={{userAuthenticated, userEmail, userFullName, setUserAuthenticated, setUserEmail, setUserFullName}}>
                <ToastContainer />
                <Navbar currentLocale={props.currentLocale}/>
                {props.childrenProp}
            </ContextVariables.Provider>
        </>
    )
}