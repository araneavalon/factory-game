'use strict';


export class Board {
	constructor( width, height ) {
		this.width = width;
		this.height = height;

		this.board = ( new Array( this.width * this.height ) ).fill( null );
	}

	onBoard( x, y ) {
		return 0 <= x && x < this.width && 0 <= y && y < this.height;
	}
	get( x, y ) {
		if( this.onBoard( x, y ) ) {
			return this.board[ this.width * y + x ];
		}
		return null;
	}
	set( x, y, node = null ) {
		if( this.onBoard( x, y ) ) {
			this.board[ this.width * y + x ] = node;
		}
	}

	up( x, y ) {
		return this.get( x, y + 1 );
	}
	right( x, y ) {
		return this.get( x + 1, y );
	}
	down( x, y ) {
		return this.get( x, y - 1 );
	}
	left( x, y ) {
		return this.get( x - 1, y );
	}

	*[ Symbol.iterator ]() {
		for( const node of this.board ) {
			if( node != null ) {
				yield node;
			}
		}
	}
}
