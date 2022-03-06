"use strict";
/* NANOGAME-JS-COPYRIGHT-MD-BEGIN
# COPYRIGHT

The software NANOGAME-JS implements the server of the NANOGAME board game. This copyright notice only covers the software NANOGAME-JS. The copyright of the NANOGAME server and board game concept can be found at https://github.com/LucasBorboleta/nanogame.

Copyright (C) 2022 Lucas Borboleta (lucas.borboleta@free.fr).

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <http://www.gnu.org/licenses>.

NANOGAME-JS-COPYRIGHT-MD-END */
///////////////////////////////////////////////////////////////////////////////
nanogame.server = { };
nanogame.server.__init_module_done = false;

nanogame.server.init_module = function(){

    if ( nanogame.server.__init_module_done ) return;
    nanogame.server.__init_module_done = true;

    // Init required modules
    nanogame.debug.init_module();

    // Init inner classes
    // None

    if ( (window.location.protocol === "http:" || window.location.protocol === "https:") && window.location.hostname !== "" ) {
            nanogame.server.is_running = true;

    } else if ( window.location.protocol === "file:" || window.location.hostname === "" ) {
        nanogame.server.is_running = false;

    } else {
        nanogame.server.is_running = false;
    }

    nanogame.debug.write_message( "nanogame.server.init_module(): nanogame.server.is_running=" + nanogame.server.is_running);

    nanogame.debug.write_message( "nanogame.server.init_module(): done" );
};

nanogame.server.request = function(command_name, command_input, command_output_reader){

    if ( ! nanogame.server.is_running ) {
        nanogame.debug.write_message( "nanogame.server.request(): call is ignored, because server is not running !" );
        return;
    }

    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            const command_output = JSON.parse(xhttp.responseText);
            command_output_reader(command_output);
        }
    };

    // Prepare random_digit_string for avoiding caching (not useful with "POST" method)
    const random_digit_string = Math.random().toString().replace(".", "");
    const url = "/:NANO:" + random_digit_string + ":" + command_name + ":" + JSON.stringify(command_input);
    const async = true;
    const method = "POST";
    xhttp.open(method, url, async);
    xhttp.send();
}
/////////////////////////////////////////////////////////////////////////
