"use client";

import { useRef, useState, useEffect } from "react";
import API, { setAuthToken } from "../../lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Login page - checking token:", token);
    if (token) {
      console.log("Token found, redirecting to dashboard...");
      router.push("/dashboard");
    }
  }, [router]);

  const login = async () => {
    console.log("Login button clicked!");
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    console.log("Form values:", { email, password });

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    try {
      console.log("Attempting login with:", { email, password });
      const res = await API.post("/auth/login", { email, password });
      console.log("Login response:", res.data);
      localStorage.setItem("token", res.data.token);
      setAuthToken(res.data.token);

      // Notify navbar that user logged in
      window.dispatchEvent(new Event("userLoggedIn"));

      console.log("Redirecting to dashboard...");
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      console.error("Error response:", error.response?.data);
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="space-y-4">
        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          defaultValue=""
          className="p-2 text-black border rounded"
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          defaultValue=""
          className="p-2 text-black border rounded"
          onKeyPress={(e) => e.key === 'Enter' && login()}
        />
        <button 
          onClick={login} 
          disabled={isLoading}
          className="bg-indigo-600 px-4 py-2 rounded text-white disabled:opacity-50"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <div className="text-sm text-gray-600">
          <p>Test credentials:</p>
          <p>Email: test@example.com</p>
          <p>Password: password123</p>
        </div>
      </div>
    </div>
  );
}
