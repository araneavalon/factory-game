'use strict';

import { Node } from './node';


export class Starter extends Node {
	constructor( game, board, itemName, x, y ) {
		super( game, board, x, y );

		this.itemName = itemName;

		this.count = 0;
	}

	get size() {
		return this.count;
	}

	canReceive() {
		return false;
	}

	tick() {
		if( this.front != null && this.front.canReceive() ) {
			const item = this.game.buy( this.itemName );
			if( item != null ) {
				this.count++;
				this.front.receive( item );
			}
		}
	}
}
