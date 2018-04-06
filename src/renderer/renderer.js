'use strict';


export class Renderer {
	static NodeRenderers = new Map();
	static addNodeRenderer( Node, Renderer ) {
		this.NodeRenderers.set( Node, Renderer );
	}

	constructor( game, board ) {
		this.game = game;
		this.board = board;

		this.options = this.game.options.renderer;

		this.nodeRenderers = new Map();
	}

	// attach( target ) {}

	getNodeRenderer( node ) {
		if( !this.nodeRenderers.has( node ) ) {
			const { NodeRenderers } = this.constructor,
				Node = node.constructor;
			const NodeRenderer = NodeRenderers.get( Node ),
				nodeRenderer = new NodeRenderer( node, this.options[ Node.name ] );
			this.nodeRenderers.set( node, nodeRenderer );
		}
		return this.nodeRenderers.get( node );
	}

	// render() {}
}
