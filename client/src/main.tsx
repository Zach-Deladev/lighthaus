import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Toast from "./components/Toast.tsx";
import { DataProvider } from "./context/DataContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <DataProvider>
    <Toast />
    <App />
  </DataProvider>
);
