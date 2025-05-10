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
      <Navbar />
      <Home />
      <FAQ />
      <AboutUs />
      <Footer />
    </div>
  );
}

export default App;
