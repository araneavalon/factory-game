'use strict';

import { DOMRenderer } from './renderer';
import { DOMNodeRenderer } from './node';


import { Starter } from 'node/starter';
DOMRenderer.addNodeRenderer( Starter, DOMNodeRenderer );

import { Conveyor } from 'node/conveyor';
DOMRenderer.addNodeRenderer( Conveyor, DOMNodeRenderer );

import { Seller } from 'node/seller';
DOMRenderer.addNodeRenderer( Seller, DOMNodeRenderer );


export { DOMRenderer };
