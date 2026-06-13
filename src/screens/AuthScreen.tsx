import { useState } from "react";
import { UserData } from "../types/api";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

type Props = {
  mode: "login" | "signup";
  setMode: (m: "login" | "signup") => void;
  onLogin: (data: UserData) => Promise<void>;
  onSignup: (data: UserData) => Promise<void>;
};

export default function AuthScreen({
  mode,
  setMode,
  onLogin,
  onSignup
}: Props) {
  const [error, setError] =
    useState<string | null>(null);

  const handleLogin = async (
    data: UserData
  ) => {
    try {
      setError(null);
      await onLogin(data);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleSignup = async (
    data: UserData
  ) => {
    try {
      setError(null);
      await onSignup(data);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">
        <h1 className="text-xl font-bold mb-4">
          Task Tracker
        </h1>

        {error && (
          <div className="text-red-500 mb-3">
            {error}
          </div>
        )}

        {mode === "login" ? (
          <LoginForm onSubmit={handleLogin} />
        ) : (
          <SignupForm
            onSubmit={handleSignup}
          />
        )}

        <div className="mt-4 text-sm text-center">
          {mode === "login" ? (
            <button
              onClick={() => setMode("signup")}
              className="text-blue-600"
            >
              Create account
            </button>
          ) : (
            <button
              onClick={() => setMode("login")}
              className="text-blue-600"
            >
              Already have an account? Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
