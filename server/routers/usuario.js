const express = require('express');
const app = express();


app.get('/', function(req, res) {
    res.json('Hello World')
});


app.get('/usuario', function(req, res) {
    res.json('GET USUARIO')
});

app.post('/usuario', function(req, res) {

    let datos = req.body;

    if (datos.Nombres === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'Error los nombres son necesarios...'
        });

    } else {
        res.json({
            persona: datos
        });

    }


});

app.put('/usuario/:idx', function(req, res) {

    let id = req.params.idx;

    res.json({
        consecutivo: id
    });
});

app.delete('/usuario', function(req, res) {
    res.json('DELETE USUARIO')
});

module.exports = app;