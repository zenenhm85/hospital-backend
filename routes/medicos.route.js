const { Router } = require('express');
const expressFileUpoload = require('express-fileupload');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const {validarImagen} = require('../middlewares/validar-archivo-imagen'); 
const { validarJWT } = require('../middlewares/validar-jwt');

const medicosController = require('../controllers/medicos.controller');

const router = Router();

router.get('/', validarJWT, medicosController.getMedicos);
router.get('/imagen/:nombre',medicosController.recibirImagen);
router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('hospital', 'La id de hospital no es válido').isMongoId(),
        validarCampos
    ],
    medicosController.crearMedico
);
router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    medicosController.actualizarMedico
);
router.delete('/:id', validarJWT, medicosController.eliminarMedico);

router.use(expressFileUpoload());//Para usar carga de archivos en la ruta

router.put('/upload/:id', [validarJWT, validarImagen], medicosController.subirImagenMedico);


module.exports = router;