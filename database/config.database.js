const mongoose = require('mongoose');

const dbConection = async () => {
    /*=============================================
MONGOOSE DEPRECATIONS
=============================================*/
    // https://mongoosejs.com/docs/deprecations.html
    const optionsMongoose = {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    }
    try {
        await mongoose.connect(`${process.env.DBURL}${process.env.DBPORT}/${process.env.DBNAME}`, optionsMongoose, (err, res) => {

            if (err) throw new Error('Error al conectarse a la Base de Datos');

        });
        console.log("Conectado a Base de Datos con éxito");
    }
    catch (error) {
        console.log(error);
    }


}
module.exports = {
    dbConection
}