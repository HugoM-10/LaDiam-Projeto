import logo from './logo.svg';
import './App.css';
import Header from './Header/Header';	
import Footer from './Footer/Footer';
import Promotions from './Promotions/Promotions';

function App() {
  return (
    <div className="App">
      <Header />
      <Promotions />
      <Footer />
    </div>
  );
}

export default App;
