//import './App.css';
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Promotions from "./Promotions/Promotions";
import { Routes, Route } from "react-router-dom";
import LoginManager from "./LoginManager/LoginManager";
import Signup from "./LoginManager/Signup";
import UserProvider from "./UserContext";

function App() {
  return (
    <div className="App">
      <Header />
      <UserProvider>
        <Routes>
          <Route path="/" element={<Promotions />} />
          <Route path="/login" element={<LoginManager />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        </UserProvider>
      <Footer />
    </div>
  );
}

export default App;
