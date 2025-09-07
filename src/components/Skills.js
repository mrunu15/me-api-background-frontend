import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000/api"; // adjust if deployed

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/profile`)
      .then((res) => res.json())
      .then((data) => {
        setSkills(data.skills || []);
      })
      .catch((err) => console.error("Failed to fetch skills:", err));
  }, []);

  const filteredSkills = skills.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="skills" className="mt-10">
      <h2 className="flex items-center text-xl font-bold mb-3">🛠 Skills</h2>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search by skill..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      {/* Skills list */}
      <div className="flex flex-wrap gap-3">
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill, idx) => (
            <span
              key={idx}
              className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm shadow-sm"
            >
              {skill.title} <span className="text-gray-500">({skill.rating}/10)</span>
            </span>
          ))
        ) : (
          <p className="text-gray-500">No skills found.</p>
        )}
      </div>
    </section>
  );
};

export default Skills;
