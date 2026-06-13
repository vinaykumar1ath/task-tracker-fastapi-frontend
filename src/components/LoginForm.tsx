import { useState } from "react";
import { UserData } from "../types/api";

type Props = {
  onSubmit: (data: UserData) => Promise<void>;
};

export default function LoginForm({
  onSubmit
}: Props) {
  const [username, setUsername] =
    useState("");
  const [password, setPassword] =
    useState("");
  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    await onSubmit({
      username,
      password
    });

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3"
    >
      <input
        className="w-full p-2 border rounded"
        placeholder="Username"
        value={username}
        onChange={(e) =>
          setUsername(e.target.value)
        }
      />

      <input
        type="password"
        className="w-full p-2 border rounded"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button
        disabled={loading}
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
