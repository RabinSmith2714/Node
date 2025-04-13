const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;
const cache = {};

app.get('/',(req,res)=>{
  res.send('Hello World!')
})

async function getproducts(id){

  const API_DOMAIN = 'https://fakestoreapi.com/';
  if (cache[id]) {
    return cache[id];
  }
  const response = await axios.get(API_DOMAIN+'products/'+id);
  
  return (await response).data;
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
  console.log('Server is running in port:${PORT}');
});