const { Router } = require('express');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');

const authController = require('../controllers/auth.controller');

const router = Router();


router.post('/',
    [
        check('password','La contraseña es obligatoria').not().isEmpty(),
        check('password','La contraseña debe tener más de 5 carateres').isLength({min:6}),        
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'El email no tiene el formato correcto').isEmail(),
        validarCampos
    ],
    authController.loginUsuario
);
router.post('/google',
    [
        check('token','El token de Google es requerido').not().isEmpty(),        
        validarCampos
    ],
    authController.loginGoogle
);


module.exports = router;