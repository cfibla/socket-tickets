
const fs = require('fs');


class Ticket {

	constructor(numero, escritorio) {
		this.numero = numero;
		this.escritorio = escritorio;

	}
}

class TicketControl {

	constructor() {

		this.ultimo = 0;
		this.hoy = new Date().getDate();
		this.tickets = [];
		this.ultimos4 = [];

		let data = require('../data/data.json');

		if (data.hoy === this.hoy) {

			this.ultimo = data.ultimo;
			this.tickets = data.tickets;
			this.ultimos4 = data.ultimos4;
		

		} else {

			this.reiniciarConteo();

		}
	}


	siguiente() {
		this.ultimo += 1;

		let ticket = new Ticket(this.ultimo, null);
		this.tickets.push(ticket);
		
		this.grabarArchivo();

		return `Ticket ${this.ultimo}`;
	}


	getUltimoTicket() {
		return `Ticket ${this.ultimo}`;
	}

	getUltimos4() {
		return this.ultimos4;
	}

	atenderTicket(escritorio){
		if (this.tickets.length === 0) {
			return 'No hay tickets';
		}

		// Recogemos el primer número del array en una variable
		let numeroTicket = this.tickets[0].numero;
		// Lo quitamos del array
		this.tickets.shift();

		// Creamos un ticket nuevo, que es el que se va a atender
		let atenderTicket = new Ticket(numeroTicket, escritorio);
		// Lo pegamos en el primer lugar de este array
		this.ultimos4.unshift(atenderTicket);

		// Si el array es mayor que 4, borro el último elemento del array
		if (this.ultimos4.length > 4) {
			this.ultimos4.splice(-1, 1);
		}

		console.log('Últimos 4:', this.ultimos4);

		this.grabarArchivo();

		return atenderTicket;
	}


	reiniciarConteo() {

		this.ultimo = 0;
		this.tickets = [];
		this.grabarArchivo();
		this.ultimos4 = [];

		console.log('Conteo Reiniciado');
		
	}

	grabarArchivo() {

		let jsonData = {

			ultimo: this.ultimo,
			hoy: this.hoy,
			tickets: this.tickets,
			ultimos4: this.ultimos4
		}

		let jsonDataString = JSON.stringify(jsonData);

		fs.writeFileSync('./server/data/data.json', jsonDataString);

	}



}

module.exports = {
	TicketControl
}