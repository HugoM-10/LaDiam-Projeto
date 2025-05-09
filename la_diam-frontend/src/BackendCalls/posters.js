import axios from "axios";

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (const element of cookies) {
      const cookie = element.trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// Login user
const loginUser = async (username, password) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/auth/login/",
      { username, password },
      { withCredentials: true }
    );
    return response.data; // Return login success message
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

// Logout user
const logoutUser = async () => {
  try {
    const csrftoken = getCookie("csrftoken");

    const response = await axios.post(
      "http://localhost:8000/api/auth/logout/",
      {},
      {
        withCredentials: true,
        headers: {
          "X-CSRFToken": csrftoken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error logging out user:", error);
    throw error;
  }
};

// Signup user
const signupUser = async (username, password, email) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/auth/signup/",
      { username, password, email }
    );
    return response.data; // Return signup success message
  } catch (error) {
    console.error("Error signing up user:", error);
    throw error;
  }
};

// Export all posters
export { loginUser, logoutUser, signupUser };
