const express  = require('express');
const app      = express();
const mongoose = require('mongoose');
const Product  = require('./models/productModel');

//import form datafrom express
app.use(express.urlencoded({ extended: true }));
//json middleware
app.use(express.json());

//get all products
app.get('/products', async(req, res) => {
    try { 
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//find by id
app.get('/products/:id', async(req, res) => {
    try {
        const{ id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//create new product
app.post('/products',async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

//update
app.put('/products/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
        throw Error('Something went wrong while updating the product!');}
        const updatedProduct  = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

//remove    
app.delete('/products/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndRemove(id);
        if (!deletedProduct) {
            throw Error('Something went wrong while deleting the product!');
        }
        res.status(200).json(deletedProduct);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});


//database connection
mongoose
.connect('mongodb+srv://kaviru:58ophjPIorkPttfC@crud-app.jgjleuo.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() =>{ 
    app.listen(3000, () => {
        console.log('Server started on port 3000');
    });
    console.log('MongoDB Connected');
}).catch((err) => {
    console.log(err);
}   );