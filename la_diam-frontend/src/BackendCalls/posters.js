import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  withCredentials: true,
});

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
    const csrftoken = getCookie("csrftoken");
    const response = await api.post(
      "auth/login/",
      { username, password },
      {
        headers: {
          "X-CSRFToken": csrftoken,
        },
      }
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

    const response = await api.post(
      "auth/logout/",
      {},
      {
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
    const response = await api.post("auth/signup/", {
      username,
      password,
      email,
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error signing up user:", error);
    throw error;
  }
};

const updateProfile = async (profileData) => {
  const csrftoken = getCookie("csrftoken");
  const response = await api.put("profile/", profileData, {
    headers: {
      "X-CSRFToken": csrftoken,
    },
  });
  return response.data;
};

const updateUser = async (userData) => {
  const csrftoken = getCookie("csrftoken");
  const response = await api.post("auth/edit_user/", userData, {
    headers: {
      "X-CSRFToken": csrftoken,
    },
  });
  return response.data;
};

const createComment = async (productId, texto) => {
  try {
    const csrftoken = getCookie("csrftoken");
    const response = await api.post(
      "comments/create/",
      { product_id: productId, texto },
      {
        headers: {
          "X-CSRFToken": csrftoken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

// Export all posters
export {
  loginUser,
  logoutUser,
  signupUser,
  updateProfile,
  updateUser,
  createComment,
};
