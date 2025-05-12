import { useContext } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Signup from "./Pages/LoginManager/Signup/Signup";
import Profile from "./Pages/Profile/Profile";
import Menu from "./Pages/Menu/Menu";

import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./Pages/HomePage/HomePage";
import { UserProvider, UserContext } from "./UserContext";
import Login from "./Pages/LoginManager/Login/Login";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <AppContent />
      </UserProvider>
    </div>
  );
}

function AppContent() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} />
      <Routes className="container">
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
