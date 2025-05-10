//import './App.css';
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Promotions from "./Promotions/Promotions";
import { Routes, Route } from "react-router-dom";
import LoginManager from "./LoginManager/LoginManager";
import Signup from "./LoginManager/Signup";
import UserProvider from "./UserContext";
import logo from './logo.svg';
import './App.css';

import Header from './Header/Header';	
import Footer from './Footer/Footer';
import FAQ from './FAQ/Faq';
import AboutUs from './AboutUs/AboutUs';
import Home from './_Home/Home';
import Navbar from './Navbar/Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';

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
      <Navbar />
      <Home />
      <FAQ />
      <AboutUs />
      <Footer />
    </div>
  );
}

export default App;
