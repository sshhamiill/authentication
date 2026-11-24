import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import {
  validateUsername,
  validateEmail,
  validatePassword,
  validateFullName
} from "../utils/validation";

function RegisterPage() {
  const navigate = useNavigate();
  const { register, checkUsername } = useAuth();
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (field, value) => {
    setServerError("");
    const validators = {
      username: validateUsername,
      fullName: validateFullName,
      email: validateEmail,
      password: validatePassword
    };
    const error = validators[field](value);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
    switch (field) {
      case "username":
        setUsername(value);
        break;
      case "fullName":
        setFullName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };


  // Submit form
  const handleSubmit = async (e) => {

    e.preventDefault();

    setServerError("");


    const newErrors = {

      username: validateUsername(username),

      fullName: validateFullName(fullName),

      email: validateEmail(email),

      password: validatePassword(password),

      confirmPassword:
        password !== confirmPassword
          ? "Passwords do not match"
          : ""

    };


    setErrors(newErrors);


    // Stop if validation fails
    if (Object.values(newErrors).some(error => error)) {
      return;
    }


    try {

      setIsSubmitting(true);


      // Check username
      const exists = await checkUsername(username);

      if (exists) {

        setErrors(prev => ({

          ...prev,

          username: "Username already exists"

        }));

        return;

      }


      // Register user
      await register({

        username,

        fullName,

        email,

        password

      });


      navigate("/dashboard");


    } catch (error) {

      setServerError(error.message || "Registration failed");

    } finally {

      setIsSubmitting(false);

    }

  };


  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold text-center mb-2">

          Create Account

        </h1>


        <p className="text-gray-500 text-center mb-6">

          Register to get started

        </p>


        {serverError && (

          <p className="text-red-500 text-sm mb-4">

            {serverError}

          </p>

        )}


        <form onSubmit={handleSubmit} className="space-y-4">


          {/* Username */}
          <div>

            <input

              type="text"

              placeholder="Username"

              value={username}

              onChange={(e) =>
                handleChange("username", e.target.value)
              }

              className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"

            />

            {errors.username && (

              <p className="text-red-500 text-sm mt-1">

                {errors.username}

              </p>

            )}

          </div>


          {/* Full Name */}
          <div>

            <input

              type="text"

              placeholder="Full Name"

              value={fullName}

              onChange={(e) =>
                handleChange("fullName", e.target.value)
              }

              className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"

            />

            {errors.fullName && (

              <p className="text-red-500 text-sm mt-1">

                {errors.fullName}

              </p>

            )}

          </div>


          {/* Email */}
          <div>

            <input

              type="email"

              placeholder="Email Address"

              value={email}

              onChange={(e) =>
                handleChange("email", e.target.value)
              }

              className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"

            />

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

              className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"

            />

            {errors.password && (

              <p className="text-red-500 text-sm mt-1">

                {errors.password}

              </p>

            )}

          </div>


          {/* confirm Password */}
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Creating Account..." : "Register"}
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-600 font-semibold ml-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}


export default RegisterPage;