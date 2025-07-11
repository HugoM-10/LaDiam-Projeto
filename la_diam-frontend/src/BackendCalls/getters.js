import api from './Api';

// Fetch user details
const fetchUser = async () => {
  try {
    const response = await api.get('auth/user/');
    console.log("User:", response.data); // Log the user data
    return response.data; // Return user data
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

const fetchProfile = async () => {
  try {
    const response = await api.get('profile/');
    console.log("Profile:", response.data); // Log the profile data
    return response.data; // Return profile data
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};


// Fetch product by ID
const fetchProduct = async (productId) => {
  try {
    const response = await api.get(`products/${productId}/`);
    console.log("Product:", response.data); // Log the product data
    return response.data; // Return product data
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

// Fetch all products
const fetchProducts = async () => {
  try {
    const response = await api.get('products/');
    console.log("Products:", response.data); // Log the products data
    return response.data; // Return products data
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

// Fetch paginated products
const fetchProductsPaginated = async (page = 1, type = "") => {
  try {
    let url = `products/?page=${page}&ordering=id`;
    if (type) url += `&type=${type}`;
    const response = await api.get(url);
    // DRF pagination: response.data.results, response.data.count
    return {
      products: response.data.results || response.data,
      total: response.data.count || response.data.length,
    };
  } catch (error) {
    console.error("Error fetching paginated products:", error);
    throw error;
  }
};

// Fetch paginated comments for a specific product
const fetchProductComments = async (productId, page = 1, pageSize = 10) => {
  try {
    const response = await api.get(`comments/product/${productId}/?page=${page}&page_size=${pageSize}`);
    // DRF pagination: { count, next, previous, results }
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

const fetchUserComments = async (page = 1, pageSize = 10) => {
  try {
    const response = await api.get(`comments/my/?page=${page}&page_size=${pageSize}`);
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

const fetchMessages = async () => {
  try {
    const response = await api.get('messages/');
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

export {
  fetchUser,
  fetchProfile,
  fetchProduct,
  fetchProductComments,
  fetchUserComments,
  fetchProductRatings,
  fetchUserOrders,
  fetchOrders,
  fetchMessages,
  fetchProductsPaginated,
  fetchProducts,
};