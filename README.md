# Person Management Vue Frontend

Vue  + TypeScript + Vite frontend for the Person API.

## API

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

Missing .env for environment variables

Vite environment variables are bundled into frontend assets and can be inspected by users.

## Backend CORS

This application uses a springboot backend

If Spring Security is enabled, CORS must also be enabled in the SecurityFilterChain.
