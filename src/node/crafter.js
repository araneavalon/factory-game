'use strict';

import _ from 'lodash';
import { Node } from './node';
import { Item } from 'item';


export class Crafter extends Node {
	constructor( game, board, blueprint, x, y ) {
		super( game, board, x, y );

		this.blueprint = blueprint;

		this.products = [];
	}

	craft() {
		const inputs = this.blueprint.input.map( ( { amount, itemName } ) =>
			( { amount, items: this.items.filter( ( item ) => item.itemName === itemName ) } ) );
		const howMany = Math.min( ...inputs.map( ( { amount, items } ) => Math.floor( items.length / amount ) ) );
		if( howMany > 0 ) {
			for( const { amount, items } of inputs ) {
				_.pull( this.items, ...items.slice( 0, amount * howMany ) );
			}
			const { amount, itemName } = this.blueprint.output;
			for( let i = 0; i < amount * howMany; ++i ) {
				this.products.push( new Item( this.game, itemName ) );
			}
		}
	}

	tick() {
		this.craft();
		if( this.front && this.front.canReceive() ) {
			this.front.receive( this.products );
			this.products = [];
		}
	}
}
