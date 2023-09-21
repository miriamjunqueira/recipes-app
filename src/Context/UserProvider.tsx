import UserContext from './UserContext';

type UserProviderProps = {
  children: React.ReactNode;
};

export default function UserProvider({ children }: UserProviderProps) {

    const [] = useState();

  return (
    <UserContext.Provider value={ {} } }>
      {children}
    </UserContext.Provider>
  );
}
