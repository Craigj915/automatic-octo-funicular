"use client";
import { ApiClient } from "@/apiClient";
import Login from "@/components/Login";
import Dashboard from "@/components/Dashboard";
import { useState } from "react";

export default function Home() {
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const logout = () => {
    window.localStorage.removeItem("token");
    setToken(undefined);
  };

  const login = (token) => {
    window.localStorage.setItem("token", token);
    setToken(token);
  };

  const client = new ApiClient(
    () => token,
    () => logout()
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {token ? (
        <Dashboard client={client} />
      ) : (
        <Login loggedIn={(token) => login(token)} client={client} />
      )}
    </main>
  );
}
