import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Routes, Route } from "react-router-dom";
import LoginManager from "./Pages/LoginManager/LoginManager";
import Signup from "./Pages/LoginManager/Signup/Signup";
import UserProvider from "./UserContext";
import Profile from "./Pages/Profile/Profile";

import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./Pages/HomePage/HomePage";
import Login from "./Pages/LoginManager/Login/Login";

function App() {
  return (
    <div className="App">
      <Header />
      <UserProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </UserProvider>
      <Footer />
    </div>
  );
}

export default App;
