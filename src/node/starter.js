'use strict';

import { Node } from './node';


export class Starter extends Node {
	constructor( game, board, Item, x, y ) {
		super( game, board, x, y );

		this.Item = Item;

		this.count = 0;
	}

	get size() {
		return this.count;
	}

	canReceive() {
		return false;
	}

	tick() {
		if( this.size >= 75 ) {
			return;
		}
		if( this.front != null && this.front.canReceive() ) {
			this.count++;
			this.front.receive( new this.Item( this.game ) );
		}
	}
}
