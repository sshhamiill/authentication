import { useAuth } from "../contexts/useAuth";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex flex-col items-center mb-8">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-28 h-28 rounded-full object-cover mb-4"
            />
            <h2 className="text-2xl font-bold">
              {user.fullName}
            </h2>
            <p className="text-gray-500">
              @{user.username}
            </p>
          </div>
          {/* User Details */}
          <div className="space-y-5">
            <div>
              <p className="text-gray-500 text-sm">
                Full Name
              </p>
              <h3 className="font-semibold">
                {user.fullName}
              </h3>
            </div>
            <div>
              <p className="text-gray-500 text-sm">
                Username
              </p>
              <h3 className="font-semibold">
                {user.username}
              </h3>
            </div>
            <div>
              <p className="text-gray-500 text-sm">
                Email Address
              </p>
              <h3 className="font-semibold">
                {user.email}
              </h3>
            </div>
            <div>
              <p className="text-gray-500 text-sm">
                Account Created
              </p>
              <h3 className="font-semibold">
                {new Date(user.createdAt).toLocaleDateString()}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DashboardPage;