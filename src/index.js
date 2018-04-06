'use strict';

import 'av/fontawesome';

import { Game } from 'game';
import { DOMRenderer } from 'renderer/dom';

import OPTIONS from './options.json';


const game = new Game( document.getElementById( 'board' ), DOMRenderer, OPTIONS );
window.GAME = game;

game.addBoard();


import { Starter } from 'node/starter';
import { Conveyor } from 'node/conveyor';
import { Seller } from 'node/seller';

import { Item } from './item';

game.addNode( Starter, Item, 3, 3 ).rotate( 'right' );
game.addNode( Conveyor, 4, 3 ).rotate( 'right' );
game.addNode( Seller, 5, 3 );

game.addNode( Starter, Item, 3, 4 ).rotate( 'right' );
game.addNode( Conveyor, 4, 4 ).rotate( 'right' );
game.addNode( Conveyor, 5, 4 ).rotate( 'left' );

game.render();

let tick = 0;
const interval = setInterval( () => {
	console.log( 'Interval.', tick );

	// if( tick > 10 && tick % 15 === 0 ) {
	// 	game.board.get( 4, 4 ).rotate( 'down' );
	// }
	// if( tick > 10 && tick % 15 === 5 ) {
	// 	game.board.get( 4, 4 ).rotate( 'up' );
	// }

	game.tick();
	game.render();

	tick++;

	if( tick > 100 ) {
		clearInterval( interval );
	}
}, 100 );
