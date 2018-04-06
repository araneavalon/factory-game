'use strict';


export class Item {
	constructor( game, itemName ) {
		this.game = game;
		this.itemName = itemName;

		this.options = this.game.options.items[ this.itemName ];
		this.value = this.options.value;
	}

	sell() {
		this.game.sell( this );
	}
}
