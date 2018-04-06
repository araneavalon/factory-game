'use strict';

import 'av/fontawesome';

import { Game } from 'game';
import { DOMRenderer } from 'renderer/dom';

import OPTIONS from './options.json';


const game = new Game( document.getElementById( 'board' ), DOMRenderer, OPTIONS );

game.addBoard();


import { Starter } from 'node/starter';
import { Conveyor } from 'node/conveyor';
import { Crafter } from 'node/crafter';
import { Seller } from 'node/seller';

game.addNode( Starter, 'Copper', 1, 1 ).rotate( 'right' );
game.addNode( Conveyor, 2, 1 ).rotate( 'right' );
game.addNode( Crafter, OPTIONS.blueprints.CopperWire, 3, 1 ).rotate( 'up' );
game.addNode( Conveyor, 3, 2 ).rotate( 'up' );

game.addNode( Starter, 'Copper', 1, 2 ).rotate( 'right' );
game.addNode( Crafter, OPTIONS.blueprints.CopperWire, 2, 2 ).rotate( 'right' );

game.addNode( Starter, 'Iron', 1, 5 ).rotate( 'right' );
game.addNode( Conveyor, 2, 5 ).rotate( 'right' );
game.addNode( Crafter, OPTIONS.blueprints.IronRod, 3, 5 ).rotate( 'down' );
game.addNode( Conveyor, 3, 4 ).rotate( 'down' );

game.addNode( Crafter, OPTIONS.blueprints.Electromagnet, 3, 3 ).rotate( 'right' );
game.addNode( Conveyor, 4, 3 ).rotate( 'right' );
game.addNode( Seller, 5, 3 );


game.render();

let tick = 0;
const interval = setInterval( () => {
	console.log( 'Interval.', tick );

	game.tick();
	game.render();

	tick++;

	if( tick >= 100 ) {
		clearInterval( interval );
	}
}, 1000 );
