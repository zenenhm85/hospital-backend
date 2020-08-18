const Usuario = require('../models/usuario.model');
const { generarJWT } = require('../helpers/jwt');
const { response, request } = require('express')
const bcrypt = require('bcryptjs');

const { googleVerify } = require('../helpers/google-verify');

const loginUsuario = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {
        const usuarioBD = await Usuario.findOne({ email });

        if (!usuarioBD) {
            return res.status(404).json({
                ok: false,
                msg: "Usuário o contraseña incorrectos"
            });
        }

        const verificarPasword = await bcrypt.compare(password, usuarioBD.password);

        if (!verificarPasword) {
            return res.status(404).json({
                ok: false,
                msg: "Usuário o contraseña incorrectos"
            });
        }
        //Generar token
        let token = await generarJWT(usuarioBD.id);

        return res.status(200).json({
            ok: true,
            msg: "Login realizado con éxito",
            token
        });

    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error en el servidor, contacte con su administrador"
        });
    }
}

const loginGoogle = async (req = request, res = response) => {

    const token = req.body.token;

    try {

        const { name, email, picture } = await googleVerify(googleToken);

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if (!usuarioDB) {
            // si no existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            // existe usuario
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guardar en DB
        await usuario.save();

        // Generar el TOKEN - JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            token
        });
    }
    catch (error) {
        res.status(401).json({
            ok: false,
            msg: "El Token de Google no es correcto",
            error
        });
    }

}
const renewToken = async (req = request, res = response)=>{

    try{
        const uid = req.uid;

        const token = await generarJWT(uid);
    
        res.status(200).json({
            ok:true,
            token
        });
    }
    catch(error){
        res.status(500).json({
            ok:false,
            msg:"Error inesperado en el servidor"
        });        

    }   

}

/*=============================================
Exportando funcionalidades
=============================================*/
module.exports = {
    loginUsuario,
    loginGoogle,
    renewToken
}