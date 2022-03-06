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
nanogame.debug = { };
nanogame.debug.__init_module_done = false;

nanogame.debug.init_module = function(){

    if ( nanogame.debug.__init_module_done ) return;
    nanogame.debug.__init_module_done = true;

    // Init required modules
    // None

    // Init inner classes
    // None

    nanogame.debug.__zone = document.getElementById( "nanogame_debug_div_id" );
    nanogame.debug.__messages = document.getElementById( "nanogame_debug_messages_id" );

    nanogame.debug.__message_count = 0;
    nanogame.debug.__is_enabled = false;
    nanogame.debug.enable(nanogame.debug.__is_enabled);

    nanogame.debug.__test_data = 123;

    nanogame.debug.write_message( "nanogame.debug.init_module(): done" );
};

nanogame.debug.assert = function(condition, message){
    if ( typeof message === "undefined" ) {
        message = "[look at javascript console]";
    }

    console.assert(condition, message);
    if ( ! condition ) {
        nanogame.debug.write_message( "assertion failed: " + message);
    }
};

nanogame.debug.clear_messages = function(){
    nanogame.debug.__messages.innerHTML = "" ;
};

nanogame.debug.enable = function(condition){
    nanogame.debug.__is_enabled = condition;

    if ( ! nanogame.debug.__is_enabled ) {
        nanogame.debug.clear_messages();
    }

    if ( nanogame.debug.__is_enabled ) {
        nanogame.debug.__zone.style.display = "inherit";
    } else {
        nanogame.debug.__zone.style.display = "none";
    }
};

nanogame.debug.key_listner = function(event){
    if ( event.key === 'd' ) {
        nanogame.debug.toggle();

    } else if ( event.key === 'c' ) {
        nanogame.debug.clear_messages();

    } else if ( event.key === 't' ) {
        nanogame.debug.__perform_some_test();
   }
};

nanogame.debug.toggle = function(event){
    nanogame.debug.__is_enabled = ! nanogame.debug.__is_enabled;
    nanogame.debug.enable(nanogame.debug.__is_enabled);
};

nanogame.debug.write_message = function(text){
    if ( nanogame.debug.__is_enabled ) {
        nanogame.debug.__message_count += 1 ;
        const new_message = "<p>" + nanogame.debug.__message_count + ":" + text + "</p>";
        nanogame.debug.__messages.innerHTML = new_message + nanogame.debug.__messages.innerHTML;
    }
};

nanogame.debug.__perform_some_test = function(text){

    nanogame.debug.write_message( "window.location.href: >" + window.location.href + "<" );
    nanogame.debug.write_message( "window.location.hostname: >" + window.location.hostname + "<" );
    nanogame.debug.write_message( "window.location.pathname: >" + window.location.pathname + "<" );
    nanogame.debug.write_message( "window.location.protocol: >" + window.location.protocol + "<" );


    nanogame.debug.write_message( "command_output_reader: before __test_data=" + nanogame.debug.__test_data);
    const command_name = "INCR";
    const command_input = nanogame.debug.__test_data;
    const command_output_reader = function(command_output){
        nanogame.debug.__test_data = parseInt(command_output)
        nanogame.debug.write_message( "command_output_reader: after __test_data=" + nanogame.debug.__test_data);
    };


    /*
    const command_name = "NEXT";
    const command_input = null;
    const command_output_reader = function(command_output){
        const next = parseInt(command_output)
        nanogame.debug.write_message( "command_output_reader: after next=" + next);
    };
    */

    nanogame.server.request(command_name, command_input, command_output_reader);
}
///////////////////////////////////////////////////////////////////////////////
