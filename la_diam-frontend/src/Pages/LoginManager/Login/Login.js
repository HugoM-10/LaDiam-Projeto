import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../../UserContext";
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, user } = useContext(UserContext);

  // Redirect to main page if user already exists
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      const result = await login(username, password);
      if (result.success) {
        alert('Login successful!');
        navigate('/');
      } else {
        alert('Login failed: ' + result.message);
      }
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup'); // Adjust the path if your signup route differs
  };

  return (
  <div className="login-page">
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username: </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      <hr />

      <p>Don't have an account?</p>
      <button type="submit" onClick={handleSignupRedirect}>Sign Up</button>
    </div>
  </div>
);

}

export default Login;
