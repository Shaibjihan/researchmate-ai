"use client";

import { useEffect, useState } from "react";
import { getProfile } from "@/lib/profile";

interface UserProfile {
  id: number;
  username: string;
  email: string;
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
      <div className="p-8 text-center">
        Loading profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-8 text-center">
        Failed to load profile.
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white rounded-xl shadow-lg p-8">

      <div className="flex flex-col items-center">

        <div className="w-24 h-24 rounded-full bg-blue-600 text-white text-4xl flex items-center justify-center font-bold">
          {profile.username.charAt(0).toUpperCase()}
        </div>

        <h2 className="text-2xl font-bold mt-4">
          {profile.username}
        </h2>

        <p className="text-gray-500">
          {profile.email}
        </p>

      </div>

      <div className="mt-8 space-y-4">

        <div className="border rounded-lg p-4">
          <p className="text-gray-500">Username</p>
          <p className="font-semibold">{profile.username}</p>
        </div>

        <div className="border rounded-lg p-4">
          <p className="text-gray-500">Email</p>
          <p className="font-semibold">{profile.email}</p>
        </div>

        <div className="border rounded-lg p-4">
          <p className="text-gray-500">User ID</p>
          <p className="font-semibold">{profile.id}</p>
        </div>

        <div className="border rounded-lg p-4">
          <p className="text-gray-500">Account Status</p>
          <p className="text-green-600 font-semibold">
            Active
          </p>
        </div>

      </div>

      <button
        onClick={logout}
        className="w-full mt-8 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg"
      >
        Logout
      </button>

    </div>
  );
}