import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000/api"; // adjust if deployed

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");

  // Load all projects on mount
  useEffect(() => {
    fetch(`${API_BASE}/profile`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.projects || []);
        setAllProjects(data.projects || []);
      })
      .catch((err) => console.error("Failed to fetch projects:", err));
  }, []);

  // Filter projects by skill (API call)
  const filterBySkill = async (skill) => {
    if (!skill) {
      setProjects(allProjects);
      setSelectedSkill("");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/projects?skill=${skill}`);
      const data = await res.json();
      setProjects(data || []);
      setSelectedSkill(skill);
    } catch (err) {
      console.error("Failed to fetch projects by skill:", err);
    }
  };

  return (
    <section id="projects" className="mt-10">
      <h2 className="flex items-center text-xl font-bold mb-3">📂 Projects</h2>

      {selectedSkill && (
        <div className="mb-4">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
            Filtering by: {selectedSkill}
          </span>
          <button
            onClick={() => filterBySkill("")}
            className="ml-3 text-sm text-red-500 hover:underline"
          >
            Clear Filter
          </button>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {projects.length > 0 ? (
          projects.map((p, i) => (
            <div key={i} className="bg-white border rounded-lg p-4 shadow-sm">
              <h3 className="font-bold text-lg">{p.title}</h3>
              <p className="text-sm text-gray-600">{p.description}</p>

              {/* Skill tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                {p.skillTag?.map((tag, idx) => (
                  <span
                    key={idx}
                    onClick={() => filterBySkill(tag)}
                    className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full cursor-pointer hover:bg-indigo-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="mt-3">
                {p.links && p.links.length > 0 ? (
                  p.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 hover:underline block"
                    >
                      View
                    </a>
                  ))
                ) : (
                  <span className="text-gray-400 text-sm">No links available</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No projects found.</p>
        )}
      </div>
    </section>
  );
};

export default Projects;
