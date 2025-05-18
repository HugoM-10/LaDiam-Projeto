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





const createComment = async (productId, texto) => {
  try {
    const csrftoken = getCookie("csrftoken");
    const response = await api.post(
      `comments/product/${productId}/`,
      { texto },
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

const submitProductRating = async (productId, rating) => {
  try {
    const csrftoken = getCookie("csrftoken");
    const response = await api.post(
      "ratings/",
      { product_id: productId, rating },
      {
        headers: {
          "X-CSRFToken": csrftoken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting rating:", error);
    throw error;
  }
};

const addNewProduct = async (productData) => {
  const csrftoken = getCookie("csrftoken");
  try {
    const response = await api.post("products/", productData, {
      headers: {
        "X-CSRFToken": csrftoken,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding new product:", error);
    throw error;
  }
};

const createOrder = async (cartItems) => {
  try {
    const csrftoken = getCookie("csrftoken");
    const response = await api.post(
      "orders/my/",
      {
        items: cartItems.map(item => ({
          product: item.product.id,
          quantity: item.quantity,
        }))
      },
      {
        headers: {
          "X-CSRFToken": csrftoken,
        },
      }
    );
    return response.data
  } catch (error) {
    console.error("Error creating order:", error.response?.data || error);
    throw error;
  }
};


// Export all posters
export {
  loginUser,
  logoutUser,
  signupUser,
  createComment,
  submitProductRating,
  addNewProduct,
  createOrder
};
