import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { CollectionsProvider } from "./context/CollectionsContext.jsx";
import "./index.css";
import OAuthSuccess from "./pages/OAuthSuccess";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CollectionsProvider>
        <App />
      </CollectionsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
