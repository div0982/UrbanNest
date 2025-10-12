import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeCapacitor } from "./capacitor";

// Initialize Capacitor for mobile platforms
initializeCapacitor();

createRoot(document.getElementById("root")!).render(<App />);
