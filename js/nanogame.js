"use strict";
/* NANOGAME-JS-COPYRIGHT-MD-BEGIN
# COPYRIGHT

The software NANOGAME-JS implements the rules of the NANOGAME board game. This copyright notice only covers the software NANOGAME-JS. The copyright of the NANOGAME rules and board game concept can be found at https://github.com/LucasBorboleta/nanogame.

Copyright (C) 2022 Lucas Borboleta (lucas.borboleta@free.fr).

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <http://www.gnu.org/licenses>.

NANOGAME-JS-COPYRIGHT-MD-END */
///////////////////////////////////////////////////////////////////////////////
const nanogame = { };
nanogame.__init_module_done = false;

nanogame.init_module = function(){

    if ( nanogame.__init_module_done ) return;
    nanogame.__init_module_done = true;

    // Init required packages
    nanogame.debug.init_module();
    nanogame.debug.enable(false);
    nanogame.broker.init_module();

    // Init inner classes
    // None

    // Hide the pleaseWait message
    if ( true ) {
        document.getElementById( "nanogame_wait_id" ).style.display = "none";
    }

    nanogame.debug.write_message( "nanogame.init_module(): done" );
};

nanogame.start = function(){
    nanogame.broker.start();
    nanogame.debug.write_message( "nanogame.start(): done" );
};
///////////////////////////////////////////////////////////////////////////////
