const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

const cache = {};
const API_DOMAIN = 'https://fakestoreapi.com/';

app.get('/',(req,res)=>{
  res.send('Hello World!')
})
async function getproducts(id){
  const url = id ? `${API_DOMAIN}products/${id}` : `${API_DOMAIN}products`;

  // Check cache first
  if (cache[url]) {
    console.log(`Fetching from cache: ${url}`);
    return cache[url];
  }

  // If not cached, fetch from API
  console.log(`Fetching from API: ${url}`);
  const response = await axios.get(url);
  cache[url] = response.data; // Store in cache
  return response.data;
}
app.get('/products',async(req,res)=>{
  
  const products = await getproducts();
  res.send(products);
})
app.get('/products/:id',async(req,res)=>{
  console.log(req.params.id);
  const products = await getproducts(req.params.id);
  res.send(products);
})


app.listen(PORT,()=>{
  console.log(`Server is running in port:${PORT}`   );
});