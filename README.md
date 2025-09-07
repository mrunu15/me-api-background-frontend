Frontend (React)

This project was bootstrapped with Create React App
.

Environment

Create .env in the frontend root:

REACT_APP_API_BASE=https://me-api-background-hwdx.onrender.com


All API calls use this variable.

Available Scripts

In the project directory, run:

npm start

Runs the app in development mode. Open http://localhost:3000
 to view it.

npm run build

Builds the app for production in the build/ folder.
Bakes environment variables (REACT_APP_API_BASE) into the build. Ready to deploy.

Deployment

Deployed on Vercel: https://me-api-background-frontend.vercel.app

Connect GitHub repo to Vercel and set the REACT_APP_API_BASE environment variable.

Rebuild after any changes.

Frontend .gitignore:

node_modules/
build/
.env


Architecture
React Components → API calls → Node.js Backend → MongoDB


Main Components:

Navbar

ProfileCard → shows profile info

Skills → top skills list

Projects → project cards with optional filter

Search → searches  skills, list projects

Setup

Local Setup:

Clone repo:

git clone https://github.com/mrunu15/me-api-frontend.git
cd me-api-frontend


Install dependencies:

npm install


Create .env file:

REACT_APP_API_BASE=http://localhost:5000


Run development server:

npm start


Open http://localhost:3000
 in your browser.

Production Setup (Vercel):

Push repo to GitHub

Connect repo in Vercel

Add environment variable:

REACT_APP_API_BASE=https://me-api-background-hwdx.onrender.com


Build & deploy → URL available: https://me-api-background-frontend.vercel.app

Postman / API Usage (Frontend)

Frontend uses API URLs from src/api.js:

export const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";
export const PROFILE_URL = `${API_BASE}/api/profile`;
export const PROJECTS_URL = `${API_BASE}/api/projects`;
export const SEARCH_URL = `${API_BASE}/api/search`;


All frontend components fetch data dynamically from backend.





MongoDB Atlas
