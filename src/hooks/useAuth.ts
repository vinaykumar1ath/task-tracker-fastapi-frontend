import { useEffect, useState } from "react";
import {
  authCheck,
  login,
  logout,
  signupAndLogin
} from "../api/auth";
import { UserData } from "../types/api";
import { extractError } from "../utils/messages";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export function useAuth() {
  const [status, setStatus] =
    useState<AuthStatus>("loading");

  const [user, setUser] = useState<
    UserData | null
  >(null);

  const checkAuth = async () => {
    try {
      await authCheck();
      setStatus("authenticated");
    } catch {
      setStatus("unauthenticated");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogin = async (
    data: UserData
  ) => {
    try {
      await login(data);
      await checkAuth();
    } catch (err) {
      throw new Error(extractError(err));
    }
  };

  const handleSignup = async (
    data: UserData
  ) => {
    try {
      // IMPORTANT: signup → auto login (your requirement)
      await signupAndLogin(data);
      await checkAuth();
    } catch (err) {
      throw new Error(extractError(err));
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      setStatus("unauthenticated");
      setUser(null);
    }
  };

  return {
    status,
    user,
    setUser,
    login: handleLogin,
    signup: handleSignup,
    logout: handleLogout,
    refreshAuth: checkAuth
  };
}
