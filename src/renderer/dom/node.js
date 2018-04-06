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
		if( this.options.iconTransform ) {
			icon.setAttribute( 'data-fa-transform', this.options.iconTransform.join( ' ' ) );
		}
		this.container.appendChild( icon );

		this.text = document.createElement( 'b' );
		this.text.classList.add( 'text' );
		this.text.style.color = this.options.textColor;
		this.container.appendChild( this.text );
	}

	render() {
		this.container.style.left = `${this.node.x}em`;
		this.container.style.bottom = `${this.node.y}em`;
		this.container.style.transform = `rotate(${this.node.d * .25}turn)`;

		const text = document.createTextNode( String( this.node.size ) );
		if( this.text.firstChild ) {
			this.text.replaceChild( text, this.text.firstChild );
		} else {
			this.text.appendChild( text );
		}
		this.text.style.transform = `rotate(-${this.node.d * .25}turn)`;

		return this.container;
	}
}
