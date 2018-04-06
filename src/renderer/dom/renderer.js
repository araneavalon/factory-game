'use strict';

import { Renderer } from '../renderer';

export class DOMRenderer extends Renderer {
	constructor( game, board ) {
		super( game, board );

		this.element = document.createElement( 'div' );
		this.element.classList.add( 'dom-renderer', 'board' );

		this.element.style.fontSize = this.options.nodeSize;
		this.element.style.backgroundColor = this.options.backgroundColor;
		this.element.style.backgroundImage = `
			linear-gradient(0deg,
				transparent calc( .5em - 1px ),
				${this.options.gridColor} calc( .5em - .5px ),
				${this.options.gridColor} calc( .5em + .5px ),
				transparent calc( .5em + 1px ),
				transparent
			),
			linear-gradient(90deg,
				transparent calc( .5em - 1px ),
				${this.options.gridColor} calc( .5em - .5px ),
				${this.options.gridColor} calc( .5em + .5px ),
				transparent calc( .5em + 1px ),
				transparent
			)`;

		this.elements = new Map();
	}

	attach( target ) {
		while( target.firstChild ) {
			target.removeChild( target.firstChild );
		}
		target.appendChild( this.element );
	}

	render() {
		for( const node of this.board ) {
			this.renderNode( node );
		}

		this.element.style.width = `${this.board.width}em`;
		this.element.style.height = `${this.board.height}em`;
	}
	renderNode( node ) {
		const element = this.getNodeRenderer( node ).render(),
			previous = this.elements.get( node );
		if( element !== previous ) {
			this.elements.set( node, element );
			if( previous != null ) {
				this.element.removeChild( previous );
			}
			this.element.appendChild( element );
		}
	}
}
