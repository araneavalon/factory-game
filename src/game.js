'use strict';

import { Board } from 'board';
import { Item } from 'item';


export class Game {
	constructor( target, Renderer, options ) {
		this.target = target;
		this.Renderer = Renderer;
		this.options = options;

		this.board = null;
		this.boards = [];

		this.renderers = new Map();

		this.money = 100;
	}

	addBoard() {
		const { minWidth, minHeight } = this.options.board,
			board = new Board( minWidth, minHeight );
		this.boards.push( board );
		this.renderers.set( board, new this.Renderer( this, board ) );
		this.setBoard( this.boards.length - 1 );
	}
	setBoard( index ) {
		if( !this.boards[ index ] ) {
			throw new Error( `Invalid board index "${index}". (${this.boards.length})` );
		}
		this.board = this.boards[ index ];
		this.renderers.get( this.board ).attach( this.target );
	}

	addNode( Node, ...args ) {
		return new Node( this, this.board, ...args );
	}

	tick() {
		for( const board of this.boards ) {
			for( const node of board ) {
				node.tick();
			}
		}
		for( const board of this.boards ) {
			for( const node of board ) {
				node.executeTick();
			}
		}
	}

	render() {
		this.renderers.get( this.board ).render();
	}


	buy( itemName ) {
		const item = new Item( this, itemName );
		this.money = this.money - item.value;
		console.log( `Bought ${item.itemName} $${this.money} (-$${item.value}).` );
		return item;
	}
	sell( item ) {
		this.money = this.money + item.value;
		console.log( `Sold ${item.itemName} $${this.money} (+$${item.value}).` );
	}
}
