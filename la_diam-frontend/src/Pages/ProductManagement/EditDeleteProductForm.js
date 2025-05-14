import React from 'react';

const EditDeleteProductForm = () => {
    const handleEdit = (e) => {
        e.preventDefault();
        // Logic for editing the product
        console.log('Edit product');
    };

    const handleDelete = () => {
        // Logic for deleting the product
        console.log('Delete product');
    };

    return (
        <div>
            <h2>Edit/Delete Product STILL TODO</h2>
            <form onSubmit={handleEdit}>
                <div>
                    <label htmlFor="productName">Product Name:</label>
                    <input type="text" id="productName" name="productName" required />
                </div>
                <div>
                    <label htmlFor="productPrice">Product Price:</label>
                    <input type="number" id="productPrice" name="productPrice" required />
                </div>
                <div>
                    <label htmlFor="productDescription">Product Description:</label>
                    <textarea id="productDescription" name="productDescription" required />
                </div>
                <button type="submit">Edit Product</button>
                <button type="button" onClick={handleDelete}>
                    Delete Product
                </button>
            </form>
        </div>
    );
};

export default EditDeleteProductForm;