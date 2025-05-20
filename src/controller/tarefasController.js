// 1) Importações
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

//carregando o modelo
require("../models/tarefas.js");
const Tarefas = mongoose.model("tarefas");

/* __________Rotas das tarefas __________*/
/* 2) Abre e carrega todas as informações de tarefas no formulário tarefas.handlebars */

router.get('/tarefas', (req, res) => {
    Tarefas.find().lean().then((tarefas) => {
        res.render("admin/tarefas/tarefas", { tarefas: tarefas });
    });
});

/* 3) Abre o formulário addtarefas.handlebars */
router.get('/tarefas/add', (req, res) => {
    res.render("admin/tarefas/addtarefas");
});

/* 4) Recebe as informações do botão que está no addtarefas.handlebars 
e efetua o cadastro no Banco de dados, depois ele volta para a listagem das tarefas */
router.post('/tarefas/nova', (req, res) => {
    var tarefas = new Tarefas();
    tarefas.nome = req.body.nome;
    tarefas.descricao = req.body.descricao;
    tarefas.save().then(() => {
        res.redirect("/rota_tarefas/tarefas");
    }).catch((erro) => {
        res.send('Houve um erro: ' + erro)
    });
});

/* 5) Abre e preenche o formulário edittarefas.handlebars com informações do id passado */
router.get('/editar_tarefas/:id', (req, res) => {
    Tarefas.findOne({ _id: req.params.id }).lean().then((tarefas) => {
        res.render("admin/tarefas/edittarefas", { tarefa: tarefas });
    });
});

/* 6) Recebe as informações do botão que está no edittarefa.handlebar e efetua a alteração
no banco de dados. Volta para a listagem das tarefas */
router.post('/tarefas/editar_tarefas', (req, res) => {
    Tarefas.updateOne({ _id: req.body._id },
    {
        $set: {
            nome: req.body.nome,
            descricao: req.body.descricao
        }
    }).then(() => {
        res.redirect("/rota_tarefas/tarefas");
    })
});

/* 7) No form turma.handlebars que lista as turmas possui um botão para deletar
Ele deleta informações e refaz a lista no turma.handlebars */
router.get('/deletar_tarefas/:id', (req, res) => {
    Tarefas.deleteMany({ _id: req.params.id }).then(() => {
        res.redirect("/rota_tarefas/tarefas");
    });
});

/* __________Fim das rotas das tarefas __________*/
module.exports = router;





