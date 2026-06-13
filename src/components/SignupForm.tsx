import { useState } from "react";
import { UserData } from "../types/api";

type Props = {
  onSubmit: (data: UserData) => Promise<void>;
};

export default function SignupForm({
  onSubmit
}: Props) {
  const [username, setUsername] =
    useState("");
  const [password, setPassword] =
    useState("");
  const [email, setEmail] =
    useState("");
  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    await onSubmit({
      username,
      password,
      email: email || null
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
        className="w-full p-2 border rounded"
        placeholder="Email (optional)"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
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
        className="w-full bg-green-600 text-white p-2 rounded"
      >
        {loading
          ? "Creating account..."
          : "Sign Up"}
      </button>
    </form>
  );
}
