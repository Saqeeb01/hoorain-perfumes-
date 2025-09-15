import React, { useState } from "react";
import { classNames, goldText } from "../utils";

export function LoginForm({
  onLogin,
}: {
  onLogin: (password: string) => void;
}) {
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 max-w-sm mx-auto">
      <div className="grid gap-2">
        <label className="text-sm text-yellow-200/80">Admin Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-yellow-400/50"
        />
      </div>
      <button
        type="submit"
        className="mt-2 px-4 py-2.5 rounded-xl bg-yellow-400 text-black font-semibold hover:brightness-95 w-max"
      >
        Login
      </button>
    </form>
  );
}
