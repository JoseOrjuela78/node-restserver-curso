require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(require('./routers/usuario'));


app.listen(process.env.PORT, () => {
    console.log('Escuchando por el puerto: ', process.env.PORT);
})