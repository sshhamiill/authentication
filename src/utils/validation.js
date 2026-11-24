// Email validation
export const validateEmail = (email) => {

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return "Email is required";
  }

  if (!regex.test(email)) {
    return "Enter a valid email address";
  }

  return "";
};


// Username validation
export const validateUsername = (username) => {

  if (!username) {
    return "Username is required";
  }

  if (username.length < 3) {
    return "Minimum 3 characters required";
  }

  if (username.length > 20) {
    return "Maximum 20 characters allowed";
  }

  return "";
};


// Password validation
export const validatePassword = (password) => {

  if (!password) {
    return "Password is required";
  }

  if (password.length < 6) {
    return "Password must contain at least 6 characters";
  }

  return "";
};


// Full name validation
export const validateFullName = (fullName) => {

  if (!fullName.trim()) {
    return "Full name is required";
  }

  if (fullName.trim().length < 2) {
    return "Minimum 2 characters required";
  }

  return "";
};