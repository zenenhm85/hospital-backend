const { Router } = require('express');

const {validarJWT} = require('../middlewares/validar-jwt');
const busquedaController = require('../controllers/busqueda.controller');

const router = Router();


router.get('/:busqueda',validarJWT, busquedaController.getBusqueda);


module.exports = router;