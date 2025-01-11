import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <Provider store={store}>
      <ToastContainer className="z-[999999999]" />
      <App />
    </Provider>
  // </StrictMode>
);
