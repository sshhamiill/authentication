import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./contexts/useAuth";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";

function HomeRedirect() {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <div className="p-10 text-center">Loading...</div>;
  }
  return (
    <Navigate
      to={user ? "/dashboard" : "/login"}
      replace
    />
  );
}
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Root */}
          <Route
            path="/"
            element={<HomeRedirect />}
          />

          {/* Public Routes */}
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route
            path="/register"
            element={<RegisterPage />}
          />
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/dashboard"
              element={<DashboardPage />}
            />

          </Route>
          {/* Invalid Routes */}
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;