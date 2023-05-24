const { Router } = require('express');
const {getAll} = require('../controllers/getAll')
const {getDogById} = require('../controllers/getDogById')
const {getDogByName} = require('../controllers/getDogByName')
const {postDog} = require ('../controllers/postDog')
const {getTemperaments} = require('../controllers/getTemperaments')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get ("/dogs/nameSearch", getDogByName)

router.get ("/dogs", getAll)

router.post ("/dogs", postDog)

router.get ("/dogs/:id", getDogById)

router.get ("/temperaments", getTemperaments)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
