const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const conection = require('./database/conection')
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");
conection.authenticate()
    .then(() => {
        console.log('conectado')
    }).catch((err) => {
        console.log('nao conectado' + err)
    });



app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res)=> {
    Pergunta.findAll({raw: true, order: [
        ['id', 'DESC']
    ]}).then((perguntas) => {
        res.render("index",{
            perguntas: perguntas
        });
    }).catch((err) => {
        
    });;
});
app.get('/perguntas', (req, res)=> {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req, res)=> {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then((result) => {
        res.redirect("/");
    }).catch((err) => {
        alert("não foi enviado" + err);
    });
});


app.get('/pergunta/:id', (req, res)=> {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta =>{
        if (pergunta != undefined) {
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order:[['id', 'DESC']]
            }).then(respostas =>{
                res.render("pergunta" ,{
                    pergunta: pergunta,
                    respostas:  respostas
                });
            })
        } else {
            res.redirect('/');
        }
    })
});
app.post("/responder" ,(req, res) =>{
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() =>{
        res.redirect("/pergunta/"+perguntaId);
    })
});

app.listen(4300, ()=>  {console.log("app rodando");})