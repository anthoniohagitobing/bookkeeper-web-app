'use client';

import { createContext, Dispatch, SetStateAction } from 'react';

interface ContextVariables {
  userAuthenticated: boolean;
  userEmail: string;
  userFullName: string;
  setUserAuthenticated: Dispatch<SetStateAction<boolean>>;
  setUserEmail: Dispatch<SetStateAction<string>>;
  setUserFullName: Dispatch<SetStateAction<string>>;

  // userId: number;
  // userUid: string;
  // userFirstName: string;
  // userLastName: string;
  // userPhotoUrl: string;
  // setUserId: Dispatch<SetStateAction<number>>;
  // setUserUid: Dispatch<SetStateAction<string>>;
  // setUserFirstName: Dispatch<SetStateAction<string>>;
  // setUserLastName: Dispatch<SetStateAction<string>>;
  // setUserPhotoUrl: Dispatch<SetStateAction<string>>;
}

const defaultState = {
  userAuthenticated: false,
  userEmail: "NoEmail",
  userFullName: "NoFullName",
  setUserAuthenticated: () => {},
  setUserEmail: () => {},
  setUserFullName: () => {},

  // userId: 0,
  // userUid: "noUid",
  // userFirstName: "NoFirstName",
  // userLastName: "NoLastName",
  // userPhotoUrl: "NoPhotoUrl",
  // setUserId: () => {},
  // setUserUid: () => {},
  // setUserFirstName: () => {},
  // setUserLastName: () => {},
  // setUserPhotoUrl: () => {},
}

export const ContextVariables = createContext<ContextVariables>(defaultState);

