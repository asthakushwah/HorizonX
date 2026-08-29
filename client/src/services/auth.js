import axios from "axios";

// Placeholder auth client — no backend wired up. Endpoints are stubs
// showing the intended shape of the real API.
const authClient = axios.create({
  baseURL: "/api/auth",
});

export const login = ({ email, password }) =>
  authClient.post("/login", { email, password });

export const signup = ({ name, email, password }) =>
  authClient.post("/signup", { name, email, password });

export const loginWithGoogle = () => authClient.post("/google");

export const logout = () => authClient.post("/logout");

export default authClient;
