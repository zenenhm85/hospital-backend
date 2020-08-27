const { validationResult } = require('express-validator')

const validarCampos = (req, res, next ) => {

    const errores = validationResult( req );

    if ( !errores.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped(),
            message: 'Error en la validación de campos!'
        });
    }

    next();
}

module.exports = {
    validarCampos
}
