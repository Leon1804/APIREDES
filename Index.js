const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var objetos=[
  {nombre:"Pedro", edad:20, nivel:"admin"},
  {nombre:"Alejandra", edad:18, nivel:"admin"},
  {nombre:"Octavio", edad:29, nivel:"admin"},
  {nombre:"Sandra", edad:30, nivel:"admin"},
  {nombre:"Jordan", edad:227, nivel:"admin"},
  {nombre:"Jose", edad:19, nivel:"admin"},
  {nombre:"Leonidas", edad:25, nivel:"admin"},
]
var datos

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "animales_db"
});

function Autorizar(req, res, next){
  const F1 = req.headers.authorization;
  if(F1 === "A1C2E3"){
    next();
  }else{
    res.send("No hay autorizacion");
  }
}

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM animales_tb", function (err, result, fields) {
    if (err) throw err;
    datos = result;
  });
});

app.get('/', Autorizar, (req, res) => {
  res.send(datos);
});

app.get('/datos', (req, res) => {
  res.send(datos);
});

app.get('/leonidas', (req, res) => {
  res.send(objetos[6]);
});

app.post('/agregar-persona', Autorizar, (req, res) => {
  console.log(req.body);
  const { nombre, edad, tam } = req.body;
  con.connect(function(err) {
  con.query(`INSERT INTO animales_tb (ID, nombre, edad, dimension) VALUES (NULL, '${nombre}','${edad}','${tam}');`, function (err, result, fields) {
    if (err) throw err;
    datos = result;
  });
});
  })

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});