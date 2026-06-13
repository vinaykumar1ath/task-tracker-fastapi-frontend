import { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import AuthScreen from "./screens/AuthScreen";
import DashboardScreen from "./screens/DashboardScreen";
import LoadingScreen from "./components/LoadingScreen";

type Screen = "login" | "signup";

export default function App() {
  const auth = useAuth();
  const [screen, setScreen] =
    useState<Screen>("login");

  if (auth.status === "loading") {
    return <LoadingScreen />;
  }

  if (auth.status === "unauthenticated") {
    return (
      <AuthScreen
        mode={screen}
        setMode={setScreen}
        onLogin={auth.login}
        onSignup={auth.signup}
      />
    );
  }

  return (
    <DashboardScreen
      logout={auth.logout}
    />
  );
}
