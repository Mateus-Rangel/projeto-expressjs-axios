const express = require("express");
const router = express.Router();

//middleware especifico para esta roteador
router.use((req, res, next) => {
  console.log(`horário: ${Date.now()}`);
  next();
});
// define a rota da homepage
router.get('/', (req, res) => {
    res.send('Homepage dos passaros')
})

// define a rota da ajuda
router.get('/ajuda', (req, res) => {
    res.send('ajuda dos passaros')
})

module.exports = router