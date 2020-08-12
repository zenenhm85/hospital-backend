const Usuario = require('../models/usuario.model');
const {generarJWT} = require('../helpers/jwt');
const {response, request} = require('express')
const bcrypt = require('bcryptjs');

const loginUsuario = async (req = request, res = response) => {

    const {email, password} = req.body;

    try{
        const usuarioBD = await Usuario.findOne({email});

        if(!usuarioBD){
            return res.status(404).json({
                ok:false,
                msg: "Usuário o contraseña incorrectos"
            });
        }
        
        const verificarPasword = await bcrypt.compare(password, usuarioBD.password);
        
        if(!verificarPasword){
            return res.status(404).json({
                ok:false,
                msg: "Usuário o contraseña incorrectos"
            });
        }
        //Generar token
        let token = await generarJWT(usuarioBD.id);

        return res.status(200).json({
            ok:true,
            msg:"Login realizado con éxito",
            token
        });

    }
    catch(error){
        return res.status(500).json({
            ok:false,
            msg: "Error en el servidor, contacte con su administrador"
        });
    }
}

/*=============================================
Exportando funcionalidades
=============================================*/
module.exports = {
    loginUsuario
}