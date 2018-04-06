'use strict';


export class Item {
	static count = 0;

	constructor( game ) {
		this.game = game;
	}

	sell() {
		Item.count++;
		console.log( 'Sold!', Item.count );
	}
}
