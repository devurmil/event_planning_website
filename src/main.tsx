import { createRoot } from "react-dom/client";
import { AuthProvider } from "./lib/auth";
import "./index.css";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_CLIENT_ID = "832199938987-0300p3i4girn7oubbs41c9e0ibbl91vl.apps.googleusercontent.com";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </GoogleOAuthProvider>,
);
