const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send({ message: "Hello World!" });
});

async function getproducts() {
    const API_DOMAIN = 'https://fakestoreapi.com';
    const response = await axios.get(API_DOMAIN + '/products');
    return (await response).data;
} 

async function getproductswithId(id) {
    const API_DOMAIN = 'https://fakestoreapi.com';
    const response = await axios.get(API_DOMAIN + '/products/' + id);
    return (await response).data;
}

app.get('/products', async (req, res) => {
    const products = await getproductswithId();
    res.send(products);
});

app.get('/products/:id', async (req, res) => {
    console.log(req.params.id);
    const products = await getproductswithId(req.params.id);
    res.send(products);
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

