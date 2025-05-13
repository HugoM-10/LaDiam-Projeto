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
import UserProvider from "./UserContext";
import CardProvider from "./CartContext";
import Login from "./Pages/LoginManager/Login/Login";
import NotFound from "./Pages/NotFound/NotFound";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <CardProvider>
          <AppContent />
        </CardProvider>
      </UserProvider>
    </div>
  );
}

function AppContent() {
  return (
    <div className="App">
      <Header />
      <Routes className="container">
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
