// src/api.js
export const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";
export const PROFILE_URL = `${API_BASE}/api/profile`;
export const PROJECTS_URL = `${API_BASE}/api/projects`;
export const SEARCH_URL = `${API_BASE}/api/search`;
