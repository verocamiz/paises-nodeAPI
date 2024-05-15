
const express = require('express');
const mysql = require('mysql'); 
const config = require('../config');
var cors = require('cors')
 
const app = express(); 
app.set('port', config.api.port);
app.use(cors());
 
module.exports = app;
 
var connection = mysql.createConnection({
    host:'localhost',
    port: 3306,
    user:'root',
    password:'password', 
    database:'paisesdb'
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

  });  

app.get('/paises/:queryString',(req,res)=>{

    var filter = req.params.queryString;

    if (filter.length < 3) return res.status(204).send('Minimo 3 caracteres');
    
    connection.query(`
       SELECT *,
       ROUND(poblacion * 100 /(select SUM(poblacion) as SUM from paises),2) as porcentaje
       from paises
       where nombre like '%${filter}%'
       Limit 5`, function (error, result, fields) {

   if (error) throw error;

   res.json(result); 
});
  
});

app.listen(config.api.port); 