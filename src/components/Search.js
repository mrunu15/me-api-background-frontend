// src/components/Search.js
import React, { useState } from "react";
import { SEARCH_URL } from "../api";

export default function Search() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const doSearch = async () => {
    if (!q) return;
    try {
      setLoading(true);
      const res = await fetch(`${SEARCH_URL}?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("search error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">🔎 Search</h2>
      <div className="flex gap-3 mb-4">
        <input
          className="flex-1 p-3 border rounded"
          placeholder="Search name, skills, projects..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && doSearch()}
        />
        <button onClick={doSearch} className="px-4 py-2 bg-indigo-600 text-white rounded">
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {results && (
        <div className="text-sm bg-gray-50 p-4 rounded">
          <pre className="whitespace-pre-wrap">{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
