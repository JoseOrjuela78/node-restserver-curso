//==================================

//==============PUERTO==============

//==================================

process.env.PORT = process.env.PORT || 3000;


process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONTO_URI;
}

process.env.URLDB = urlDB;





//==================================

//Vencimiento

//==================================
process.env.CADUCIDAD_TOKEN = '48h';


//==================================

//SEED de autenticacion

//==================================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

//==================================

//GOOGLE CLIENT_ID

//==================================

process.env.CLIENT_ID = process.env.CLIENT_ID || '786385837548-n8as9efs4rmvnb0l6rln5g7tvm0aa6jh.apps.googleusercontent.com';