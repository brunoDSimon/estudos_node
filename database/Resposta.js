const Sequilize = require('sequelize');
const conection = require('./conection')

const Resposta = conection.define("respostas",{
    corpo:{
        type: Sequilize.TEXT,
        allowNull: false
    },
    perguntaId:{
        type: Sequilize.INTEGER,
        allowNull: false
    }
})

Resposta.sync({force: false});
module.exports = Resposta;