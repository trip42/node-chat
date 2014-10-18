var
    express = require( 'express' )
    , app = express()
    , server = require( 'http' ).Server( app )
    , io = require( 'socket.io' ).listen( server )
    , port = process.env.PORT || 5000
;

server.listen( port );

// serve a file when anyone makes a request to / 
// within our application
app.get( '/', function( req, res ) {
    res.sendFile( __dirname + '/index.html' );
});

io.on( 'connection', function( socket ) {
	// whenever a socket sends us a message
	// echo that message back to every connected socket
    socket.on( 'message', function( message ) {
        io.sockets.emit( 'message', message );
    } );
} );