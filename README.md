# Portfolio application

## Run locally

1. Copy `.env.example` to `.env` and set `MONGODB_URI`, `JWT_SECRET`, and the admin account values.
2. Install backend and frontend packages with `npm install` at the repository root and `npm install --prefix client`.
3. In a shell, load the environment and create or promote the admin account:

   ```sh
   set -a
   . ./.env
   set +a
   npm run create-admin
   ```

4. Start the API and frontend with `npm run dev`. The frontend runs on Vite and the API defaults to port `5186`.

The frontend defaults to `http://localhost:5186/api`. Set `VITE_API_URL` when the API is hosted elsewhere. Set `CLIENT_ORIGIN` to the deployed frontend origin and configure the same environment variables in the hosting provider.

## Deploy both parts as one Render service

Create one Render **Web Service** from the repository root with these settings:

- Build command: `npm ci && npm --prefix client ci && npm run build`
- Start command: `npm start`

The build command compiles the Vite frontend into `client/dist`. The Express server serves that build and the API from the same origin. In Render's environment settings, add `MONGODB_URI`, a strong `JWT_SECRET`, and `NODE_ENV=production`. Render provides `PORT` automatically. The production frontend uses `/api` by default, so it does not need a `VITE_API_URL` setting. Set `CLIENT_ORIGIN` to the Render service URL if you want CORS restricted to that origin.

If the frontend is built without the backend, set `VITE_API_URL` to the API URL ending in `/api`.

## Accounts and access

Signup creates a regular user. Admin privileges are assigned only by the `create-admin` script, which reads `ADMIN_NAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` from the environment. Signed-in regular users can read portfolio content; admins can manage projects, education records, and contact messages.

Do not commit `.env` or real credentials. Use a long random `JWT_SECRET` in deployment.
