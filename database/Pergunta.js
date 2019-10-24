const Sequilize = require('sequelize');
const conection = require("./conection");

const Pergunta = conection.define('pergunta',{
    titulo:{
        type: Sequilize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequilize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force: false}).then((result) => {
    console.log('tabela criada'+ result)
}).catch((err) => {
    console.log('erro ao criar tabela' + err)
});

module.exports = Pergunta;