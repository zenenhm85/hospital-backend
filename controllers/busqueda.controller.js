
const {response, request} = require('express');
const Usuario = require('../models/usuario.model');
const Hospital = require('../models/hospital.model');
const Medico = require('../models/medico.model');


getBusqueda = async (req = request, res = response) => {

    const busqueda = req.params.busqueda;

    try{
        const regexp = new RegExp(busqueda, 'i');

        const [usuarios, hospitales, medicos] = await Promise.all([

            Usuario.find({nombre:regexp}),
            Hospital.find({nombre:regexp}),
            Medico.find({nombre:regexp})
            
        ]);

        return res.status(200).json({
            ok:true,
            usuarios,
            hospitales,
            medicos
        });

    }
    catch(error){
        return res.status(500).json({
            ok:false,
            msg:'Error en el servidor',
            errors: error
        });

    }
    
}

/*=============================================
Exportando funcionalidades
=============================================*/
module.exports = {
    getBusqueda
}