import { useState, useEffect } from "react";
import './simple_style.css';
import { useNavigate, Routes, Route } from "react-router-dom";
import Login from './Login';
import Signup from './Signup';
import { fetchUser } from '../BackendCalls/getters';
import { logoutUser } from '../BackendCalls/posters';

const SimpleLoginManager = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);

  const handleFetchUser = async () => {
    try {
      const user = await fetchUser(); // Await the async function
      if (user) {
        setUsername(user.username);
      }
    } catch (error) {
      console.error("Error in handleFetchUser:", error);
    }
  };

  useEffect(() => {
    handleFetchUser(); // Call when the component mounts
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUsername(null);
    } catch (error) {
      console.error("Error in handleFetchUser:", error);
    }
  };


  return (
    <div className="container">
      {username ? (
        <>
          <p>Olá {username}!</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <p>Olá, não estás logado(a)!</p>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/signup")}>SignUp</button>
        </>
      )}
    </div>
  );
};

const LoginManager = () => {
  return (
    <Routes>
      <Route path="/" element={<SimpleLoginManager />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default LoginManager;