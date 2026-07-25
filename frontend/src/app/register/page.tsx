"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/register", {
        username,
        email,
        password,
      });

      alert("Registration successful!");

      router.push("/login");
    } catch (err: any) {
    console.log("REGISTER ERROR:", err);
    console.log("RESPONSE:", err.response);
    console.log("DATA:", err.response?.data);

    setError(
        JSON.stringify(err.response?.data) ||
        "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Join ResearchMate AI
        </p>

        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >

          <div>
            <label className="block text-sm font-medium mb-2">
              Username
            </label>

            <input
              type="text"
              placeholder="Give your Good Name"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition"
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </button>

          <p className="text-center text-sm text-gray-500">

            Already have an account?{" "}

            <Link
              href="/login"
              className="font-semibold text-black hover:underline"
            >
              Login
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}