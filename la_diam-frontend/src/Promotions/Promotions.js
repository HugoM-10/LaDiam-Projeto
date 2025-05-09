import React from 'react';
import './Promotions.css';
import pizzasData from '../menuPizzas.json';

function Promotions() {
    const pizzasEmPromocao = pizzasData.pizzas.slice(0, 4);
    
    return (
        <section className="promotions-section">
            <h2 className="promotions-title">EM PROMOÇÃO</h2>
            <div className="promotions-catalog">
                {pizzasEmPromocao.map((pizza) => (
                    <div key={pizza.id} className="promotion-card">
                        <div className="image-container">
                            <img 
                                src={pizza.imagem.src} 
                                alt={pizza.imagem.alt} 
                                className="promotion-image" 
                                onError={(e) => {
                                    e.target.onerror = null; 
                                    e.target.src = 'placeholder-pizza.jpg'
                                }}
                            />
                        </div>
                        <div className="promotion-details">
                            <h3 className="promotion-name">{pizza.nome}</h3>
                            <p className="promotion-description">{pizza.descricao}</p>
                            <div className="promotion-price">{pizza.preco}</div>
                            <button className="order-button">Pede Já</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Promotions;