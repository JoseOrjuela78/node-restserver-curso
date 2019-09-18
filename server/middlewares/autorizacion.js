const jwt = require('jsonwebtoken');

//=========================
//VERIFICA TOKEN
//=========================

let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });

        }

        req.usuario = decoded.usuario;
        next();
    });

};

//=========================
//VERIFICA ADMIN_ROLE
//=========================

let verificaADMIN_ROLE = (req, res, next) => {

    usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });



    }

};



module.exports = {
    verificaToken,
    verificaADMIN_ROLE
}