# Auth Frontend (Vite + React + TypeScript)

Instructions:

1. unzip the project
2. cd frontend_auth_frontend
3. npm install
4. npm run dev
5. Open http://localhost:5173

This frontend expects a backend at http://localhost:3000 with the following endpoints:
- POST /Auth/login
- GET /Auth/verify
- POST /Auth/logout

The frontend uses cookie-based auth and sends requests with credentials.
