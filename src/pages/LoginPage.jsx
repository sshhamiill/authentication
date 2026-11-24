import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { validateEmail } from "../utils/validation";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleChange = (field, value) => {
    setServerError("");
    if (field === "email") {
      setEmail(value);
      setErrors(prev => ({
        ...prev,
        email: validateEmail(value)
      }));}
    if (field === "password") {
      setPassword(value);
      setErrors(prev => ({
        ...prev,
        password: value ? "" : "Password is required"
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    const newErrors = {
      email: validateEmail(email),
      password: password ? "" : "Password is required"
    };
setErrors(newErrors);
    if (Object.values(newErrors).some(error => error)) {
      return;
    }
    try {
      setIsSubmitting(true);
      await login({
        email,
        password
      });
      navigate("/dashboard");
    } catch (error) {
      setServerError(error.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Login to your account
        </p>
        {serverError && (
          <p className="text-red-500 text-sm mb-4">
            {serverError}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                handleChange("email", e.target.value)
              }
              className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"/>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>
          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                handleChange("password", e.target.value)
              }
              className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"/>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
              {errors.password}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
           {isSubmitting ? "Logging in..." : "Login"}
            </button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          Don't have an account?
          <Link
            to="/register"
            className="text-blue-600 font-semibold ml-1"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
export default LoginPage;