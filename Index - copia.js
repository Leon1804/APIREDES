const express = require('express');
const app = express();
const port = 3000;

var objetos=[
  {nombre:"Pedro", edad:20, nivel:"admin"},
  {nombre:"Alejandra", edad:18, nivel:"admin"},
  {nombre:"Octavio", edad:29, nivel:"admin"},
  {nombre:"Sandra", edad:30, nivel:"admin"},
  {nombre:"Jordan", edad:227, nivel:"admin"},
  {nombre:"Jose", edad:19, nivel:"admin"},
  {nombre:"Leonidas", edad:25, nivel:"admin"},
]

app.get('/', (req, res) => {
  res.send(objetos);
});

app.get('/leonidas', (req, res) => {
  res.send(objetos[6]);
});

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});