'use strict';

import { Node } from './node';


export class Conveyor extends Node {
	tick() {
		if( this.front != null && this.front.canReceive() ) {
			this.front.receive( this.items );
			this.items = [];
		}
	}
}
