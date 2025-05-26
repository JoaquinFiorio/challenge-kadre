const mongoose = require('mongoose');

const connectToDatabase = (databaseURI) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseURI)
            .then(() => {
                console.log('[Kadre Backend] Base de datos conectada con éxito');
                resolve();
            })
            .catch((error) => {
                console.error('[Kadre Backend] Error al conectar a la base de datos:', error);
                reject(error);
            });
    });
};

module.exports = {
    connectToDatabase
}