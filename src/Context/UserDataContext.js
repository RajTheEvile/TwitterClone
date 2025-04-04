import { createContext, useState } from 'react';

const UserDataContext = createContext();

export const ModeProvider = ({ children }) => {
  const [modeDark, setModeDark] = useState(false);
  const [userData, setUserData] = useState({});

  const changeMode = () => {
    setModeDark((prevMode) => !prevMode);
  };

  return (
    <UserDataContext.Provider value={{ modeDark, changeMode, userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export { UserDataContext };
