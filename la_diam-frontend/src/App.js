import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Routes, Route } from "react-router-dom";


import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./Pages/HomePage/HomePage";
import UserProvider from "./UserContext";
import CartProvider from "./CartContext";
import Login from "./Pages/LoginManager/Login";
import ProductPage from "./Pages/ProductPage/ProductPage";
import HistoryPage from "./Pages/HistoryPage/HistoryPage";
import NotFound from "./Pages/NotFound/NotFound";
import Estatisticas from "./Pages/Estatisticas/Estatisticas";
import Pedidos from "./Pages/Pedidos/Pedidos";
import Signup from "./Pages/LoginManager/Signup";
import Profile from "./Pages/Profile/Profile";
import Menu from "./Pages/Menu/Menu";
import ProductManager from "./Pages/ProductManagement/ProductManager";
import FinalizarPedido from "./Pages/FinalizarPedido/FinalizarPedido";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
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
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/ProductPage/:id" element={<ProductPage />} />
        <Route path="/estatisticas" element={<Estatisticas />} />
        <Route path="/pedidos" element={<Pedidos />} />¨
        <Route path="/FinalizarPedido" element={<FinalizarPedido />} />
        <Route path="/gestaoProdutos" element={<ProductManager />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
