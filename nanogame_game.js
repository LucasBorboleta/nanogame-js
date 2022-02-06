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
nanogame.game.__initModuleCalled = false;

nanogame.game.__initModule = function(){

    if ( nanogame.game.__initModuleCalled ) return;
    nanogame.game.__initModuleCalled = true;

    // Init required modules
    nanogame.debug.__initModule();

    // Init inner classes
    // None

    nanogame.game.card_min = 1
    nanogame.game.card_max = 10
    nanogame.game.card_count = 5

    nanogame.game.white_player = 0;
    nanogame.game.black_player = 1;
    nanogame.game.count_player = 2;

    nanogame.game.game_is_terminated = false;
    nanogame.game.game_winner = null;

    nanogame.game.active_player = nanogame.game.white_player;

    nanogame.game.cards = [];
    nanogame.game.cards[nanogame.game.white_player] = nanogame.game.select_random_cards();
    nanogame.game.cards[nanogame.game.black_player] = nanogame.game.select_random_cards();

    nanogame.debug.writeMessage( "nanogame.game.__initModule(): white cards=" +  nanogame.game.cards[nanogame.game.white_player]);
    nanogame.debug.writeMessage( "nanogame.game.__initModule(): black cards=" +  nanogame.game.cards[nanogame.game.black_player]);


    nanogame.debug.writeMessage( "nanogame.game.__initModule(): done" );
};

nanogame.game.select_random_cards = function(){

    let remaining_cards = [];
    for ( let card_value=nanogame.game.card_min; card_value <= nanogame.game.card_max ;  card_value++ )  {
        remaining_cards.push(card_value);
    }

    let selected_cards = [];

    while ( selected_cards.length < nanogame.game.card_count )  {

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
