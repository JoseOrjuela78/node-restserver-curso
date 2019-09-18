require('./config/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// configuracion global de rutas
app.use(require('./routers/index'));


mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true }, (err, res) => {
        if (err) throw err;

        console.log('Base de datos On Line');
    }

);

app.listen(process.env.PORT, () => {
    console.log('Escuchando por el puerto: ', process.env.PORT);
})