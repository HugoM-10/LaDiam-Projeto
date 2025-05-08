import axios from 'axios';

// Fetch user details
const fetchUser = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/auth/user/', { withCredentials: true });
    return response.data; // Return user data
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
// Export all getters
export {
  fetchUser,
};