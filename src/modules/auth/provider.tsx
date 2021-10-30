import { useRouter } from 'next/dist/client/router';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react';
import { useHasMounted } from '../../hooks/useHasMounted';
import { dapp } from '../../lib/waxnet';
import { WalletUser } from '../../typings/acount/user';
import { anchorLink } from './anchor';

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextProps<T> = {
  user: WalletUser;
  setUser: Dispatch<SetStateAction<WalletUser | undefined>>;
  isLoggedIn: boolean;
  logout: () => void;
  login: (user: WalletUser) => void;
};

const AuthContext = createContext<AuthContextProps<unknown>>({
  user: { wallet: '', pubKeys: [], type: 'cloudwallet' },
  setUser: () => {},
  isLoggedIn: false,
  logout: () => {},
  login: () => {}
});

const getUser = (): WalletUser => {
  if (typeof window === 'undefined') return;

  return JSON.parse(window.localStorage.getItem('wax-user'));
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();

  const [user, setUser] = useState<WalletUser | undefined>(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const mounted = useHasMounted();

  const logout = () => {
    // remove anchor session
    anchorLink.clearSessions(dapp);

    // remove from localstorage
    window.localStorage.removeItem('wax-user');

    setIsLoggedIn(false);
    setUser(undefined);

    router.push('/');
  };

  const login = (user: WalletUser) => {
    if (!window) return;

    setUser(user);
    window.localStorage.setItem('wax-user', JSON.stringify(user));

    router.push('/dashboard');
  };

  useEffect(() => {
    if (mounted) {
      setUser(getUser());
    }
  }, [mounted]);

  useEffect(() => {
    if (user && !isLoggedIn) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn, user]);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoggedIn, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('<AuthProvider></AuthProvider>');

  return context;
};

export default AuthProvider;

export { AuthContext, useAuth };
