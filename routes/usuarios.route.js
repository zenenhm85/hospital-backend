const { Router } = require('express');
const expressFileUpoload = require('express-fileupload');
const { check } = require('express-validator');

const {validarCampos} = require('../middlewares/validar-campos');
const {validarImagen} = require('../middlewares/validar-archivo-imagen'); 
const {validarJWT} = require('../middlewares/validar-jwt');
const usuariosController = require('../controllers/usuarios.controller');

const router = Router();


router.get('/',validarJWT, usuariosController.getUsuarios);
router.get('/imagen/:nombre',usuariosController.recibirImagen);
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password','La contraseña es obligatoria').not().isEmpty(),
        check('password','La contraseña debe tener más de 5 carateres').isLength({min:6}),        
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'El email no tiene el formato correcto').isEmail(),
        validarCampos
    ],
    usuariosController.crearUsuario
);
router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'El email no tiene el formato correcto').isEmail(),
        validarCampos
    ],
    usuariosController.actualizarUsuario
);

router.delete('/:id',validarJWT, usuariosController.eliminarUsuario);

router.use(expressFileUpoload());//Para usar carga de archivos en la ruta

router.put('/upload/:id', [validarJWT, validarImagen], usuariosController.subirImagenUsuario);

module.exports = router;