import { LogOut } from "lucide-react";

type Props = {
  logout: () => Promise<void>;
};

export default function Header({
  logout
}: Props) {
  return (
    <div className="w-full bg-white shadow">
      <div className="max-w-3xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="font-bold text-lg">
          Task Tracker
        </h1>

        <button
          onClick={logout}
          className="flex items-center gap-2 text-red-500 hover:text-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}
