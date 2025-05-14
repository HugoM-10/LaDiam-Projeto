import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true,
});

// Fetch user details
const fetchUser = async () => {
  try {
    const response = await api.get('auth/user/');
    console.log("User:", response.data); // Log the user data
    return response.data; // Return user data
  } catch (error) {
    console.error("Error fetching user:", error);
    //throw error;
  }
};

const fetchProfile = async () => {
  try {
    const response = await api.get('profile/');
    console.log("Profile:", response.data); // Log the profile data
    return response.data; // Return profile data
  } catch (error) {
    console.error("Error fetching profile:", error);
    //throw error;
  }
};


// Fetch all products

const fetchProducts = async () => {
  try {
    const response = await api.get('products/');
    console.log("Products:", response.data); // Log the products data
    return response.data; // Return product data
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Fetch all comments for a specific product
const fetchProductComments = async (productId) => {
  try {
    const response = await api.get(`comments/product/${productId}/`);
    console.log("Product Comments:", response.data); // Log the product comments data
    return response.data;
  } catch (error) {
    console.error("Error fetching product comments:", error);
    throw error;
  }
};

const fetchOrders = async () => {
  try {
    const response = await api.get('orders/');
    console.log("Orders:", response.data); // Log the orders data
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

const fetchUserOrders = async () => {
  try {
    const response = await api.get('orders/my/');
    return response.data;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
};

const fetchUserComments = async () => {
  try {
    const response = await api.get('comments/my/');
    return response.data;
  } catch (error) {
    console.error("Error fetching user comments:", error);
    throw error;
  }
};

// Fetch all ratings for a specific product
const fetchProductRatings = async (productId) => {
  try {
    const response = await api.get(`ratings/${productId}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching ratings:", error);
    throw error;
  }
};


// Export all getters
export {
  fetchUser,
  fetchProfile,
  fetchProducts,
  fetchProductComments,
  fetchUserComments,
  fetchProductRatings,
  fetchUserOrders,
  fetchOrders
};