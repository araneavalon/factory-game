'use strict';

import { Node } from './node';


export class Seller extends Node {
	rotate() {
		return this;
	}

	tick() {
		for( const item of this.items ) {
			item.sell();
		}
		this.items = [];
	}
}
