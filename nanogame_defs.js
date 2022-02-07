"use strict";
/* NANOGAME-JS-COPYRIGHT-MD-BEGIN
# COPYRIGHT

The software NANOGAME-JS implements the game of the NANOGAME board game. This copyright notice only covers the software NANOGAME-JS. The copyright of the NANOGAME game and board game concept can be found at https://github.com/LucasBorboleta/nanogame.

Copyright (C) 2022 Lucas Borboleta (lucas.borboleta@free.fr).

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <http://www.gnu.org/licenses>.

NANOGAME-JS-COPYRIGHT-MD-END */
///////////////////////////////////////////////////////////////////////////////
nanogame.defs = { };
nanogame.defs.__init_module_done = false;

nanogame.defs.init_module = function(){

    if ( nanogame.defs.__init_module_done ) return;
    nanogame.defs.__init_module_done = true;

    // Init required modules
    nanogame.debug.init_module();

    // Init inner classes
    // None

    nanogame.defs.card_min = 1;
    nanogame.defs.card_max = 10;
    nanogame.defs.card_count = 5;

    nanogame.defs.white_player = 0;
    nanogame.defs.black_player = 1;
    nanogame.defs.count_player = 2;

    nanogame.debug.write_message( "nanogame.defs.init_module(): done" );
};
//////////////////////////////////////////////////////////////////////////
