const { Router } = require('express');
const expressFileUpoload = require('express-fileupload');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const {validarImagen} = require('../middlewares/validar-archivo-imagen'); 
const { validarJWT } = require('../middlewares/validar-jwt');
const {validarIdHospital} = require('../middlewares/validar-id');

const hospitalesController = require('../controllers/hospitales.controller');

const router = Router();

router.get('/', validarJWT, hospitalesController.getHospitales);
router.get('/imagen/:nombre',hospitalesController.recibirImagen);
router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    hospitalesController.crearHospital
);
router.put('/:id',
    [
        validarJWT,
        validarIdHospital,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    hospitalesController.actualizarHospital
);
router.delete('/:id',[validarJWT, validarIdHospital] , hospitalesController.eliminarHospital);

router.use(expressFileUpoload());//Para usar carga de archivos en la ruta

router.put('/upload/:id', [validarJWT, validarImagen], hospitalesController.subirImagenHospital);

module.exports = router;