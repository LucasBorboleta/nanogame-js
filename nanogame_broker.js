"use strict";
/* NANOGAME-JS-COPYRIGHT-MD-BEGIN
# COPYRIGHT

The software NANOGAME-JS implements the broker of the NANOGAME board game. This copyright notice only covers the software NANOGAME-JS. The copyright of the NANOGAME broker and board game concept can be found at https://github.com/LucasBorboleta/nanogame.

Copyright (C) 2022 Lucas Borboleta (lucas.borboleta@free.fr).

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <http://www.gnu.org/licenses>.

NANOGAME-JS-COPYRIGHT-MD-END */
///////////////////////////////////////////////////////////////////////////////
nanogame.broker = { };
nanogame.broker.__initModuleCalled = false;

nanogame.broker.__initModule = function(){

    if ( nanogame.broker.__initModuleCalled ) return;
    nanogame.broker.__initModuleCalled = true;

    // Init required modules
    nanogame.debug.__initModule();
    nanogame.presenter.__initModule();
    nanogame.game.__initModule();

    // Init inner classes
    // None

    nanogame.debug.writeMessage( "nanogame.broker.__initModule(): done" );
};

nanogame.broker.start = function(){
    nanogame.debug.writeMessage( "nanogame.broker.start(): done" );
};
/////////////////////////////////////////////////////////////////////////
