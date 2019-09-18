const express = require('express');
//npm config set registry="http://registry.npmjs.org/"
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();
const Usuario = require('../models/usuario');
const { verificaToken, verificaADMIN_ROLE } = require('../middlewares/autorizacion');

app.get('/', function(req, res) {
    res.json('Hello World')
});


app.get('/usuario', verificaToken, function(req, res) {

    let desde = parseInt(req.query.desde || 0);
    let limite = parseInt(req.query.limite || 5);
    let activo = { estado: true };

    Usuario.find(activo, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count(activo, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios,
                    conteo
                });


            });


        })
});

app.post('/usuario', [verificaToken, verificaADMIN_ROLE], function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role

    });

    usuario.save(
        (err, usuarioDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                usuario: usuarioDB
            });
        }
    );


});

app.put('/usuario/:idx', [verificaToken, verificaADMIN_ROLE], function(req, res) {

    let id = req.params.idx;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })


});

app.delete('/usuario/:id', [verificaToken, verificaADMIN_ROLE], function(req, res) {
    let id = req.params.id;
    let cambiaEstado = {
        estado: false
    }

    //Usuario.findByIdAndDelete(id, (err, usuarioBorrado) => {
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario No Encontrado...'
                }
            });
        }

        return res.json({
            ok: true,
            usuarioBorrado
        });


    });
});


module.exports = app;