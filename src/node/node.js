'use strict';


export const DIRECTIONS = [ 'up', 'right', 'down', 'left' ];

export class Node {
	constructor( game, board, x, y ) {
		this.game = game;
		this.board = board;

		this.x = null;
		this.y = null;
		this.d = null;

		this.items = [];
		this.pendingItems = [];

		this.move( x, y );
		this.rotate( 0 );
	}

	move( x, y ) {
		if( !this.board.onBoard( x, y ) ) {
			throw new Error( `Can not move ${this.constructor.name} Node to ( ${x}, ${y} ). ( ${this.board.width}, ${this.board.height} )` );
		}
		if( this.x === x && this.y === y ) {
			return this;
		}
		const old = this.board.get( x, y );
		if( old != null ) {
			this.board.set( this.x, this.y, null );
			old.move( this.x, this.y );
		}
		this.x = x;
		this.y = y;
		this.board.set( x, y, this );
		return this;
	}
	rotate( d ) {
		if( d == null ) {
			this.d = ( this.d + 1 ) % DIRECTIONS.length;
		} else if( 0 <= d && d < DIRECTIONS.length ) {
			this.d = d;
		} else if( DIRECTIONS.includes( d ) ) {
			this.d = DIRECTIONS.indexOf( d );
		}
		return this;
	}

	_getNeighbor( offset ) {
		const key = DIRECTIONS[ ( this.d + offset ) % DIRECTIONS.length ];
		return this.board[ key ]( this.x, this.y );
	}
	get front() { return this._getNeighbor( 0 ); }
	get right() { return this._getNeighbor( 1 ); }
	get back() { return this._getNeighbor( 2 ); }
	get left() { return this._getNeighbor( 3 ); }

	get size() {
		return this.items.length;
	}

	canReceive() {
		return true;
	}
	receive( items ) {
		this.pendingItems = this.pendingItems.concat( items );
	}

	tick() {}
	executeTick() {
		this.items = this.items.concat( this.pendingItems );
		this.pendingItems = [];
	}
}
