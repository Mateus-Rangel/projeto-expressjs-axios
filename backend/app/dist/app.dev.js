"use strict";

var express = require("express");

var app = express();
var port = 3000;

var passaros = require("./passaros.js");

app.use(express["static"]("public")); // servir arquivos estáticos

app.use("/passaros", passaros); // uso de constante router para modularização das rotas referentes a /passaros

app.get("/", function (req, res) {
  res.send("Hello world");
}); //#region rotas

app.get("/teste", function (req, res) {
  res.send("teste");
});
app.get("/exemplo/a", function (req, res) {
  res.send("A diz olá!");
});
app.get("/exemplo/b", function (req, res, next) {
  console.log("a resposta será enviada para a próxima função");
  next();
}, function (req, res) {
  res.send("B diz olá!");
});

var cb0 = function cb0(req, res, next) {
  console.log("cb0");
  next();
};

var cb1 = function cb1(req, res, next) {
  console.log("cb1");
  next();
};

var cb2 = function cb2(req, res) {
  res.send("C diz olá!");
};

app.get("/exemplo/c", [cb0, cb1, cb2]);
app.get("/exemplo/d", [cb0, cb1], function (req, res, next) {
  console.log("a resposta será enviada para a próxima função");
  next();
}, function (req, res) {
  res.send("D diz olá!");
});
app.route("/livro").get(function (req, res) {
  res.send("Retorna um livro aleatório");
}).post(function (req, res) {
  res.send("Adiciona um livro");
}).put(function (req, res) {
  res.send("Atualiza um livro");
}); //#endregion
//#region middleware

var myLogger = function myLogger(req, res, next) {
  console.log("LOGGED");
  next();
}; //já que a função myLogger foi declarada depois de todas as outras rotas, então não será mostrado a menssagem de LOGGED no terminal e sim só na rota de /inicio pois essa rota foi declarada depois do app.use(myLogger)


app.use(myLogger);

var requestTime = function requestTime(req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);
app.get("/inicio", function (req, res) {
  res.send("Hello world com logged e request time: ".concat(req.requestTime));
}); //#endregion
//#region uso de middleware

var autenticado = false;
app.get("/user/:id", function (req, res, next) {
  // se o parametro do id for zero ele pula pra proxima rota
  if (req.params.id == 0 && autenticado) next("route"); // se não, passe o controle para o próximo middleware na stack
  else next();
}, function (req, res, next) {
  // mostre pagina regular
  res.send("regular");
});
app.get('/user/:id', function (req, res, next) {
  res.send('especial');
}); //#endregion
//#region usando mecanismos de modelo com o express

app.set('view engine', 'pug');
app.get('/pug', function (req, res) {
  res.render('index', {
    title: 'Hey',
    message: 'Estou usando Pug'
  });
}); //#endregion

app.listen(port, function () {
  console.log("Example app listening in the port: ".concat(port));
});