const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const Sequelize = require('sequelize');


 //CONFIGTEMPLATE ENGINE
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// conexao BD
const sequelize = new Sequelize('testenode', 'root', '', {
    host: "localhost",
    dialect:"mariadb"
});

    app.get('/cad', function(req, res) {
        res.render('formulario')
    })

app.listen(4300, function() {console.log("server on")});