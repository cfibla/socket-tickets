// Comando para establecer la conexión
var socket = io();

var label = $('#lblNuevoTicket');


// CONNECT
socket.on('connect', function() {
	console.log('Conectado al servidor');
});

// DISCONNECT
socket.on('disconnect', function() {
	console.log('SERVIDOR DESCONECTADO!');
});

socket.on('estadoActual', function(resp){
	label.text(resp.actual);
})

$('button').on('click', function(){
	socket.emit ('siguienteTicket', null, function(tiquet) {
		label.text(tiquet);
	});
})