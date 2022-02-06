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
nanogame.game = { };
nanogame.game.__init_module_done = false;

nanogame.game.init_module = function(){

    if ( nanogame.game.__init_module_done ) return;
    nanogame.game.__init_module_done = true;

    // Init required modules
    nanogame.debug.init_module();

    // Init inner classes
    // None

    nanogame.debug.write_message( "nanogame.game.init_module(): done" );
};

nanogame.game.start = function(){

    nanogame.game.__card_min = 1
    nanogame.game.__card_max = 10
    nanogame.game.__card_count = 5

    nanogame.game.__white_player = 0;
    nanogame.game.__black_player = 1;
    nanogame.game.__count_player = 2;

    nanogame.game.__is_terminated = false;
    nanogame.game.__winner = null;

    nanogame.game.__active_player = nanogame.game.__white_player;

    nanogame.game.__cards = [];
    nanogame.game.__cards[nanogame.game.__white_player] = nanogame.game.__select_random_cards();
    nanogame.game.__cards[nanogame.game.__black_player] = nanogame.game.__select_random_cards();

    nanogame.debug.write_message( "nanogame.game.start(): white cards=" +  nanogame.game.__cards[nanogame.game.__white_player]);
    nanogame.debug.write_message( "nanogame.game.start(): black cards=" +  nanogame.game.__cards[nanogame.game.__black_player]);
};

nanogame.game.is_terminated = function(){
    return nanogame.game.__is_terminated;
};

nanogame.game.get_white_player = function(){
    return nanogame.game.__white_player;
};

nanogame.game.get_black_player = function(){
    return nanogame.game.__black_player;
};

nanogame.game.get_active_player = function(){
    return nanogame.game.__active_player;
};

nanogame.game.get_winner = function(){
    return nanogame.game.__winner;
};

nanogame.game.__select_random_cards = function(){

    let remaining_cards = [];
    for ( let card_value=nanogame.game.__card_min; card_value <= nanogame.game.__card_max ;  card_value++ )  {
        remaining_cards.push(card_value);
    }

    let selected_cards = [];

    while ( selected_cards.length < nanogame.game.__card_count )  {

        let selected_card_index = Math.floor(Math.random()*remaining_cards.length);
        let card_value = remaining_cards[selected_card_index];
        selected_cards.push(card_value);

        remaining_cards = remaining_cards.filter(function(curent_value, current_index){
            return ( current_index !== selected_card_index ); });

    }

    selected_cards.sort(function(a, b){ return (a - b); });
    return selected_cards;
};
//////////////////////////////////////////////////////////////////////////
