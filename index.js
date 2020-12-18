const express = require ('express');
const path = require('path');
const morgan = require('morgan');
const { Console } = require('console');
const app = express();

//middlewares
app.use( morgan( 'dev' ) );
app.use( express.json(  ) );

//routes
app.use( '/api/', require( './routes/routes' ) );


app.set("port", 5001);
app.listen( app.get( "port" ), () => {
    console.log('Servidor corriendo en el puerto 5001');
} );