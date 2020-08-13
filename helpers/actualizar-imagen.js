const { request, response } = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const Usuario = require('../models/usuario.model');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');



const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        // borrar la imagen anterior
        fs.unlinkSync(path);
    }
}


const actualizarImagen = async (tipo, id, nombreArchivo) => {

    let pathViejo = '';

    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('No es un médico por id');
                return false;
            }

            pathViejo = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathViejo);

            medico.img = nombreArchivo;
            await medico.save();
            return true;

            break;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('No es un hospital por id');
                return false;
            }

            pathViejo = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathViejo);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;

            break;

        case 'usuarios':

            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No es un usuario por id');
                return false;
            }

            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

            break;
    }
}

const subirImagen = async (req = request, res = response, tipo) => {

    const id = req.params.id;

    // Procesar la imagen...
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.'); 
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // Path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // Mover la imagen
    file.mv(path, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }
                
        // Actualizar base de datos
        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'Archivo subido!!',
            nombreArchivo
        });
    });
}




module.exports = {
    subirImagen
}
