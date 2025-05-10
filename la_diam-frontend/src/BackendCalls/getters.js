import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true,
});

// Fetch user details
const fetchUser = async () => {
  try {
    const response = await api.get('auth/user/');
    return response.data; // Return user data
  } catch (error) {
    console.error("Error fetching user:", error);
    //throw error;
  }
};

const fetchProfile = async () => {
  const response = await api.get('profile/');
  return response.data;
};
// Export all getters
export {
  fetchUser,
  fetchProfile,
};