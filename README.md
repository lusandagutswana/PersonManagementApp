# Person Management Vue Frontend

Vue 3 + TypeScript + Vite frontend for the Person API.

## API

The frontend expects the API at:

http://localhost:8081

Endpoints:

- GET `/api-v1/All-persons`
- GET `/api-v1/persons/{id}`
- POST `/api-v1/create-update-person`

## Run

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Then open:

http://localhost:5173

## Important security note

The supplied `.env` is intended only for local development.

Do not deploy Basic Auth credentials in a browser-based Vue application. Vite environment variables are bundled into frontend assets and can be inspected by users.

For production, use a suitable authentication architecture such as a backend-for-frontend, secure session-based authentication, OAuth2/OIDC, or another server-side mechanism.

## Backend CORS

The browser considers `localhost:5173` and `localhost:8081` different origins. Add the CORS configuration from `SPRING_BOOT_CORS.java.txt` to the Spring Boot application.

If Spring Security is enabled, CORS must also be enabled in the SecurityFilterChain.
