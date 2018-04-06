'use strict';


export class DOMNodeRenderer {
	constructor( node, options ) {
		this.node = node;
		this.options = options;

		this.container = document.createElement( 'div' );
		this.container.classList.add( 'dom-renderer', 'node' );

		this.container.style.color = this.options.color;

		const icon = document.createElement( 'i' );
		icon.classList.add( ...this.options.icon );
		this.container.appendChild( icon );

		this.text = document.createElement( 'b' );
		this.text.style.position = 'absolute';
		this.text.style.userSelect = 'none';
		this.text.style.fontSize = '.5em';
		this.text.style.color = 'red';
		this.container.appendChild( this.text );
	}

	render() {
		this.container.style.left = `${this.node.x}em`;
		this.container.style.bottom = `${this.node.y}em`;
		this.container.style.transform = `rotate(${this.node.d * .25}turn)`;

		while( this.text.firstChild ) {
			this.text.removeChild( this.text.firstChild );
		}
		const text = document.createTextNode( String( this.node.size ) );
		this.text.appendChild( text );
		this.text.style.transform = `rotate(-${this.node.d * .25}turn)`;

		return this.container;
	}
}
