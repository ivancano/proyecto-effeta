import React from 'react'
import { useLocalObservable } from 'mobx-react'
import { createUserStore } from '../stores/UserStore'

const UserContext = React.createContext(null)

export const UserProvider = ({children}) => {
  const userStore = useLocalObservable(createUserStore);

  return (
    <UserContext.Provider value={userStore}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserStore = () => React.useContext(UserContext);
