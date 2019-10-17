const express = require('express');
const { verificaToken, verificaADMIN_ROLE } = require('../middlewares/autorizacion');
const app = express();
const Categoria = require('../models/categoria');


//============================
//Mostrar todas las categorias
//============================

app.get('/categoria', verificaToken, (req, res) => {

    Categoria.find({})
        .sort('description')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categorias
            });
        });

});

//============================
//Mostrar una categoria por ID
//============================

app.get('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Id no existe'
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });



    });



});

//============================
//Crear una nueva categoria 
//============================

app.post('/categoria', verificaToken, (req, res) => {
    let body = req.body; // recibe la información json
    let categoria = new Categoria({
        description: body.descripcion,
        usuario: req.usuario._id
    }); // crea una instancia de Modelo Categoria

    categoria.save((err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });


    });


});

//============================
//Actualizar una categoria 
//============================

app.put('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;
    let descCategoria = {
        description: body.descripcion
    };

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });

});

//============================
//Cambiar estado inactiv0 una categoria 
//============================

app.delete('/categoria/:id', [verificaToken, verificaADMIN_ROLE], (req, res) => {

    let id = req.params.id;
    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'el id no existe'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Categoria borrada'
        });


    });

});


module.exports = app;