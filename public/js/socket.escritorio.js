//Comando para establecer la conexión
var socket = io();

var label = $('#lblNuevoTicket');

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
	window.location = 'index.html';
	throw new Error('El escritorio es necesario');
}


var escritorio = searchParams.get('escritorio');
var label = $('small');

console.log(escritorio);

$('h1').text('Escritorio ' + escritorio);


/*
socket.on('estadoActual', function(resp){
	label.text(resp.actual);
})
*/

$('button').on('click', function(){
	socket.emit ('atenderTicket', {escritorio: escritorio}, function(resp) {

		if(resp === 'No hay tickets') {
			label.text(resp);
			alert(resp);
			return;
		}

		console.log(resp);

		label.text('Ticket ' + resp.numero);


	});
})

