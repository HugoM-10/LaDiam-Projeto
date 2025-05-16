import { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'bootstrap'; 

const EditDeleteProductForm = ({ product }) => {
    const [formData, setFormData] = useState({
        name: product.name,
        default_price: product.default_price,
        description: product.description,
    });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleEdit = (e) => {
        e.preventDefault();
        console.log('Edit product', formData);
        // Submit logic here
    };

    const handleDelete = () => {
        console.log('Delete product with ID:', product.id);
        // Delete logic here
    };

    return (
        <form onSubmit={handleEdit}>
            <h3>Editing: {product.name}</h3>
            <div>
                <label>Name:</label>
                <input name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Price:</label>
                <input name="default_price" type="number" value={formData.default_price} onChange={handleChange} required />
            </div>
            <div>
                <label>Description:</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required />
            </div>
            <button type="submit">Edit</button>
            <button type="button" onClick={handleDelete}>Delete</button>
        </form>
    );
};
export default EditDeleteProductForm;