import { createContext, useState, useContext, useEffect } from 'react';
import {
  User, updatePassword,
} from 'firebase/auth';
import { auth } from '../config/firebase';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { DatabaseTable, getItemById, getItems } from '../utils/firestore';
import { useDispatch } from 'react-redux';
import { ProfileInfo } from '../state/profile';
import { Division } from '../redux/reducers/divisions';
import { Division as DivisionEnum } from '../state/division';

interface AuthContextProps {
  user: User | null;
  access: Access;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setNewPassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

export interface Access {
  bossAccess: boolean,
  headAccess: boolean,
  seniorOpAccess: boolean,
  chainedAccess: boolean,
  memberAccess: boolean,
  roninAccess: boolean,
}

const DEFAULT_ACCESS: Access = {
  bossAccess: false,
  headAccess: false,
  seniorOpAccess: false,
  chainedAccess: false,
  memberAccess: false,
  roninAccess: false,
};

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  access: DEFAULT_ACCESS,
  login: () => Promise.resolve(undefined),
  logout: () => Promise.resolve(undefined),
  setNewPassword: () => Promise.resolve(undefined),
});

//@ts-ignore
export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState<User | null>(null);
  const [access, setAccess] = useState<Access>(DEFAULT_ACCESS);
  const [loading, setLoading] = useState(true);

  async function login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function logout(): Promise<void> {
    await signOut(auth);
    dispatch({ type: 'RESET' });
  }

  async function setNewPassword(currentPassword: string, newPassword: string): Promise<void> {
    if (user && user.email) {
      const credentials = await signInWithEmailAndPassword(auth, user.email, currentPassword);
      await updatePassword(credentials.user, newPassword);
    }
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      async function getAccess(): Promise<Access> {
        if (user) {
          const profile = await getItemById<ProfileInfo>(DatabaseTable.PROFILES, user.uid);

          if (profile.admin) {
            return {
              bossAccess: true,
              headAccess: true,
              seniorOpAccess: true,
              chainedAccess: true,
              memberAccess: true,
              roninAccess: true,
            }
          }

          const divisions = await getItems<Division>(DatabaseTable.DIVISIONS);
          const profileDivision = divisions.find(division => division.id === profile.division);
          const boss = divisions.find(division => division.id === DivisionEnum.WAKAGASHIRA);
          const head = divisions.find(division => division.id === DivisionEnum.SHATEIGASHIRA);
          const seniorop = divisions.find(division => division.id === DivisionEnum.KYODAI);
          const operative = divisions.find(division => division.id === DivisionEnum.SHATEI);
          const recruit = divisions.find(division => division.id === DivisionEnum.KOBUN);
          const ronin = divisions.find(division => division.id === DivisionEnum.RONIN);

          return {
            bossAccess: boss && profileDivision ? boss.hierarchy >= profileDivision.hierarchy : false,
            headAccess: head && profileDivision ? head.hierarchy >= profileDivision.hierarchy : false,
            seniorOpAccess: seniorop && profileDivision ? seniorop.hierarchy >= profileDivision.hierarchy : false,
            chainedAccess: operative && profileDivision ? operative.hierarchy >= profileDivision.hierarchy : false,
            memberAccess: recruit && profileDivision ? recruit.hierarchy >= profileDivision.hierarchy : false,
            roninAccess: profileDivision?.id === ronin?.id,
          };
        }
        return DEFAULT_ACCESS;
      }

      setUser(user);
      setAccess(await getAccess());
      setLoading(false);
    });
    return () => {
      unsubscribe();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, access, login, logout, setNewPassword }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};