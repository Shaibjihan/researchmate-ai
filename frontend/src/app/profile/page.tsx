"use client";

import { useEffect, useState } from "react";
import { getProfile } from "@/lib/profile";

interface UserProfile {
  id: number;
  username: string;
  email: string;
  documents: number;
  chat_history: number;
  member_since: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-xl">
        Failed to load profile.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white rounded-2xl shadow-xl overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-10 text-white">

        <div className="flex flex-col items-center">

          <div className="w-28 h-28 rounded-full bg-white text-blue-600 flex items-center justify-center text-5xl font-bold shadow-lg">
            {profile.username.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-3xl font-bold mt-5">
            {profile.username}
          </h1>

          <p className="text-blue-100 mt-2">
            {profile.email}
          </p>

        </div>

      </div>

      {/* Content */}
      <div className="p-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div className="border rounded-xl p-5">
            <p className="text-gray-500 text-sm">
              Username
            </p>

            <p className="text-lg font-semibold mt-1">
              {profile.username}
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <p className="text-gray-500 text-sm">
              Email
            </p>

            <p className="text-lg font-semibold mt-1 break-all">
              {profile.email}
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <p className="text-gray-500 text-sm">
              Documents Uploaded
            </p>

            <p className="text-2xl font-bold text-blue-600 mt-2">
              {profile.documents}
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <p className="text-gray-500 text-sm">
              AI Chats
            </p>

            <p className="text-2xl font-bold text-purple-600 mt-2">
              {profile.chat_history}
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <p className="text-gray-500 text-sm">
              Member Since
            </p>

            <p className="text-lg font-semibold mt-1">
              {new Date(profile.member_since).toLocaleDateString()}
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <p className="text-gray-500 text-sm">
              Account Status
            </p>

            <p className="text-lg font-semibold text-green-600 mt-1">
              ● Active
            </p>
          </div>

        </div>

        <button
          onClick={logout}
          className="w-full mt-8 bg-red-600 hover:bg-red-700 transition text-white font-semibold py-3 rounded-xl"
        >
          Logout
        </button>

      </div>

    </div>
  );
}