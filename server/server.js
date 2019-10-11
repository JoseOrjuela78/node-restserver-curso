require('./config/config');
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');


// cors origin



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// habilitar el index.html
app.use(express.static(path.resolve(__dirname, '../public')))

// configuracion global de rutas
app.use(require('./routers/index'));

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));



mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err, res) => {
        if (err) throw err;

        console.log('Base de datos On Line');
    }

);

app.listen(process.env.PORT, () => {
    console.log('Escuchando por el puerto: ', process.env.PORT);
})