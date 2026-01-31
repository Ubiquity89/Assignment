"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import API from "../lib/api";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkAuth();

    // Listen for storage changes (for login/logout sync)
    window.addEventListener("storage", checkAuth);
    
    // Also listen for custom login event
    const handleLogin = () => {
      checkAuth();
    };
    
    window.addEventListener("userLoggedIn", handleLogin);
    
    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("userLoggedIn", handleLogin);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <nav className="flex justify-between px-8 py-4 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm">
      <Link href="/" className="font-bold text-white text-lg">
        StartupBenefits
      </Link>
      <div className="space-x-6 flex items-center">
        <Link href="/deals" className="text-slate-300 hover:text-white transition-colors text-base font-medium">Deals</Link>
        {isLoggedIn && <Link href="/dashboard" className="text-slate-300 hover:text-white transition-colors text-base font-medium">Dashboard</Link>}
        {isLoggedIn ? (
          <button 
            onClick={handleLogout}
            className="text-indigo-400 hover:text-indigo-300 transition-colors text-base font-medium"
          >
            Logout
          </button>
        ) : (
          <Link 
            href="/login" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors text-base font-medium"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
