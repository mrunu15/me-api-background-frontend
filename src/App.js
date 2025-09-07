import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000/api"; // change if deployed

function App() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch profile on load
  useEffect(() => {
    fetch(`${API_BASE}/profile`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setProjects(data.projects || []);
      })
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  // Handle search (filter projects by skill)
  useEffect(() => {
    if (!search) {
      setProjects(profile?.projects || []);
      return;
    }

    fetch(`${API_BASE}/projects?skill=${search}`)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error searching projects:", err));
  }, [search, profile]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <a href="/" className="text-indigo-600 font-bold text-lg">
          Me-API Playground
        </a>
        <div className="space-x-6">
          <a href="#profile" className="text-gray-700 hover:text-indigo-600">
            Profile
          </a>
          <a href="#skills" className="text-gray-700 hover:text-indigo-600">
            Skills
          </a>
          <a href="#projects" className="text-gray-700 hover:text-indigo-600">
            Projects
          </a>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Profile */}
        <section id="profile" className="mb-10">
          <h2 className="flex items-center text-2xl font-bold mb-4">
            👤 My Profile
          </h2>
          {profile ? (
            <div className="bg-white shadow rounded-lg p-6">
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Education:</strong> {profile.education}</p>
              <div className="mt-3 flex gap-4">
                {profile.links?.github && (
                  <a
                    href={profile.links.github}
                    className="text-indigo-600 hover:underline"
                  >
                    GitHub
                  </a>
                )}
                {profile.links?.linkedin && (
                  <a
                    href={profile.links.linkedin}
                    className="text-indigo-600 hover:underline"
                  >
                    LinkedIn
                  </a>
                )}
                {profile.links?.portfolio && (
                  <a
                    href={profile.links.portfolio}
                    className="text-indigo-600 hover:underline"
                  >
                    Portfolio
                  </a>
                )}
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Loading profile...</p>
          )}
        </section>

        {/* Skills */}
        <section id="skills" className="mb-10">
          <h2 className="flex items-center text-2xl font-bold mb-4">🛠 Skills</h2>
          <div className="flex flex-wrap gap-3">
            {profile?.skills?.length ? (
              profile.skills.map((skill, idx) => (
                <button
                  key={idx}
                  onClick={() => setSearch(skill.title)}
                  className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm shadow hover:bg-indigo-200 transition"
                >
                  {skill.title} ({skill.rating}/10)
                </button>
              ))
            ) : (
              <p className="text-gray-500">No skills found.</p>
            )}
          </div>
        </section>

        {/* Search bar for projects */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search projects by skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* Projects */}
        <section id="projects" className="mb-10">
          <h2 className="flex items-center text-2xl font-bold mb-4">📂 Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects?.length ? (
              projects.map((p, idx) => (
                <div
                  key={idx}
                  className="bg-white shadow rounded-lg p-6 hover:shadow-md transition"
                >
                  <h3 className="font-semibold text-lg">{p.title}</h3>
                  <p className="text-gray-600 text-sm mt-2">{p.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {p.skillTag?.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs bg-gray-200 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {p.links?.length > 0 && (
                    <a
                      href={p.links[0]}
                      className="text-indigo-600 hover:underline mt-3 block"
                    >
                      View
                    </a>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No projects found.</p>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm mt-10">
          © 2025 Me-API Playground | Built with ❤️ using React & Tailwind
        </footer>
      </main>
    </div>
  );
}

export default App;
