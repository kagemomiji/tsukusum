export const Common = {
    backendURL: process.env.REACT_APP_BACKEND_URL ?? "http://localhost:8080",
} as const;