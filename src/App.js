import "./Assets/Styles/app.css";
import AppRoutes from "./Components/Routes/AppRoutes";
import { AuthProvider } from "./Contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
        <AppRoutes />
    </AuthProvider>
  );
}

export default App;