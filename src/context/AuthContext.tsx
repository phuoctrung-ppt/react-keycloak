import Keycloak from 'keycloak-js';
import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import { UserInfo } from '../types/user-info.type';
import { KEYCLOAK_CONFIG } from '../configs/keycloak-config';

interface IAuthContext {
  userInfo?: Partial<UserInfo>;
  isAuth?: boolean;
}

export const AuthContext = createContext<IAuthContext>({});

AuthContext.displayName = 'KeycloakContext';

interface IAuthProviderProps {
  children?: ReactNode;
}

const keycloak = new Keycloak(KEYCLOAK_CONFIG);

const kcinit = keycloak.init({ onLoad: 'check-sso' });

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [userInfo, setUserInfo] = useState<IAuthContext>({});

  const [hasToken, setHasToken] = useState<boolean>(false);

  useEffect(() => {
    kcinit
      .then((res) => {
        if (res) return setHasToken(res);
        if (!res) return keycloak.login();
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (hasToken) {
      keycloak
        .loadUserInfo()
        .then((res) => setUserInfo({ ...res, isAuth: true }))
        .catch((_: unknown) => setUserInfo({ ...userInfo, isAuth: false }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasToken]);

  const valuesMemoization = useMemo(() => ({ ...userInfo }), [userInfo]);

  return (
    <AuthContext.Provider value={valuesMemoization}>
      {children}
    </AuthContext.Provider>
  );
};
