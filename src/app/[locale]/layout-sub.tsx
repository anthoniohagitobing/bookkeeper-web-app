'use client';

// IMPORT MODULES
import { ContextVariables } from '../../lib/context-variables';
import { useState } from 'react';
import { lusitana } from '@/lib/fonts';
import { ToastContainer } from 'react-toastify';
// import Navbar from './navbar';

// DATA TYPE
interface Props {
    childrenProp: React.ReactNode;
}

// PAGE COMPONENT
export default function LayoutSub(props: Props): JSX.Element {
    const [userId, setUserId] = useState<number>(0);
    const [userUid, setUserUid] = useState<string>('noUid');
    const [userFirstName, setUserFirstName] = useState<string>('noFirstName');
    const [userLastName, setUserLastName] = useState<string>('noLastName');
    const [userEmail, setUserEmail] = useState<string>('noEmail');
    const [userPhotoUrl, setUserPhotoUrl] = useState<string>('noPhotoUrl');

    return (
        <ContextVariables.Provider value={{userId, userUid, userFirstName, userLastName, userEmail, userPhotoUrl, setUserId, setUserUid, setUserFirstName, setUserLastName, setUserEmail, setUserPhotoUrl}}>
            <body className={`${lusitana.className}`}>
                <ToastContainer />
                {/* <div><Navbar /></div> */}
                <div>{props.childrenProp}</div>
            </body>
        </ContextVariables.Provider>
    )
}