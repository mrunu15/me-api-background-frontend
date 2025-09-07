// src/components/ProfileCard.js
import React from "react";

export default function ProfileCard({ profile, loading }) {
  if (loading) return <div className="p-6 bg-white rounded-lg shadow">Loading profile...</div>;
  if (!profile) return <div className="p-6 bg-white rounded-lg shadow">No profile found.</div>;

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="flex items-center text-2xl font-semibold mb-4">👤 My Profile</h2>

      <div className="border rounded-lg p-4">
        <p className="mb-1"><span className="font-semibold">Name:</span> {profile.name || "-"}</p>
        <p className="mb-2"><span className="font-semibold">Email:</span> {profile.email || "-"}</p>

        <div className="flex gap-4 mt-3">
          {profile.links?.github && (
            <a className="text-indigo-600 hover:underline" href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a>
          )}
          {profile.links?.linkedin && (
            <a className="text-indigo-600 hover:underline" href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          )}
          {profile.links?.portfolio && (
            <a className="text-indigo-600 hover:underline" href={profile.links.portfolio} target="_blank" rel="noreferrer">Portfolio</a>
          )}
        </div>
      </div>
    </div>
  );
}
