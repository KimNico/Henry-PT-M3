const express = require('express');
const app = express();

app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send({
    message: 'hola',
  });
});

// app.post('/product', (req, res) => {
//   res.send({
//     result: req.body.a / req.body.b,
//   });
// });

app.get('/test',(req,res)=>{
  res.send({message:"hola"})
})

app.post('/sum',(req,res)=>{
  let {a ,b} = req.body
  res.send({result:a+b})
})

app.post('/product',(req,res)=>{
  let {a ,b} = req.body
  res.send({result:a*b})
})
app.post('/sumArray',(req,res)=>{
  let {arr,num} =req.body
  let resultado = false

  for (let i = 0; i < arr.length; i++) {
    for (let k = i+1; k < arr.length; k++) {
     if(arr[i]+arr[k] === num){
      return resultado = true
      }
    }
    return resultado
  }
  res.json({result:resultado})
})



module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
