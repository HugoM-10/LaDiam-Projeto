import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import Login from "./Login";

const LoginManager = () => {
  const { user, logout } = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="container">
      {user ? (
        <>
          <p>Olá {user.name || user.username || "Utilizador"}!</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <p>Olá, não estás logado(a)!</p>
          <button onClick={() => setShowLogin(!showLogin)}>Login</button>
          <button onClick={() => navigate("/signup")}>SignUp</button>
          {showLogin && <Login />}
        </>
      )}
    </div>
  );
};

export default LoginManager;
