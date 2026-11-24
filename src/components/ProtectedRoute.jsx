import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../contexts/useAuth";
function ProtectedRoute() {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-semibold">
          Loading...
        </h2>
      </div>
    );
  }



  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}


export default ProtectedRoute;