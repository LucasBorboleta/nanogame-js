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
    nanogame.defs.init_module();

    // Init inner classes
    // None

    nanogame.debug.write_message( "nanogame.game.init_module(): done" );
};

nanogame.game.get_active_player = function(){
    return nanogame.game.__active_player;
};

nanogame.game.get_cards = function(player){
    return nanogame.game.__cards[player];
};

nanogame.game.get_play = function(player){
    return nanogame.game.__play[player];
};

nanogame.game.get_score = function(player){
    return nanogame.game.__score[player];
};

nanogame.game.get_winner = function(){
    return nanogame.game.__winner;
};

nanogame.game.game_terminated = function(){
    return nanogame.game.__game_terminated;
};

nanogame.game.round_terminated = function(){
    return nanogame.game.__round_terminated;
};

nanogame.game.set_play = function(card){
    nanogame.debug.assert( !  nanogame.game.__game_terminated);
    nanogame.game.__play[nanogame.game.__active_player] = card;

    nanogame.game.__round_terminated = nanogame.game.__play[nanogame.defs.white_player] !== null
                                    && nanogame.game.__play[nanogame.defs.black_player] !== null;

    nanogame.debug.write_message( "nanogame.game.set_play(): __play[" + nanogame.game.__active_player + "]=" + card );
};

nanogame.game.start = function(){

    nanogame.game.__round_terminated = false;

    nanogame.game.__game_terminated = false;
    nanogame.game.__winner = null;
    nanogame.game.__active_player = nanogame.defs.white_player;

    nanogame.game.__score = [];
    nanogame.game.__score[nanogame.defs.white_player] = 0;
    nanogame.game.__score[nanogame.defs.black_player] = 0;

    nanogame.game.__deck = [];
    for ( let card_value=nanogame.defs.deck_card_min; card_value <= nanogame.defs.deck_card_max ;  card_value++ )  {
        nanogame.game.__deck.push(card_value);
    }

    nanogame.game.__cards = [];
    nanogame.game.__cards[nanogame.defs.white_player] = nanogame.game.__select_random_cards();
    nanogame.game.__cards[nanogame.defs.black_player] = nanogame.game.__select_random_cards();

    nanogame.game.__play = [];
    nanogame.game.__play[nanogame.defs.white_player] = null;
    nanogame.game.__play[nanogame.defs.black_player] = null;

    nanogame.debug.write_message( "nanogame.game.start(): done" );
};

nanogame.game.update = function(){

    if ( ! nanogame.game.__game_terminated ) {

        if ( nanogame.game.__play[nanogame.game.__active_player] !== null ) {

            const card = nanogame.game.__play[nanogame.game.__active_player];

            nanogame.game.__cards[nanogame.game.__active_player] = nanogame.game.__cards[nanogame.game.__active_player].filter(
                function(curent_value){ return ( curent_value !== card ); } );

            nanogame.debug.write_message( "nanogame.game.update(): __cards[" + nanogame.game.__active_player + "]="
                + nanogame.game.__cards[nanogame.game.__active_player] );
        }

        nanogame.game.__round_terminated = nanogame.game.__play[nanogame.defs.white_player] !== null
                                        && nanogame.game.__play[nanogame.defs.black_player] !== null;

        if ( ! nanogame.game.__round_terminated ) {
            nanogame.game.__active_player = (nanogame.game.__active_player + 1) % nanogame.defs.count_player;

        } else {

            const white_card = nanogame.game.__play[nanogame.defs.white_player];
            const black_card = nanogame.game.__play[nanogame.defs.black_player];

            if ( white_card > black_card ) {
                nanogame.game.__score[nanogame.defs.white_player]++;
                nanogame.game.__active_player = nanogame.defs.white_player;

            } else if ( black_card > white_card ) {
                nanogame.game.__score[nanogame.defs.black_player]++;
                nanogame.game.__active_player = nanogame.defs.black_player;
            }

            nanogame.game.__play[nanogame.defs.white_player] = null;
            nanogame.game.__play[nanogame.defs.black_player] = null;
            nanogame.game.__round_terminated = false;

            nanogame.game.__game_terminated = ( nanogame.game.__cards[nanogame.game.__active_player].length === 0 );

            if ( nanogame.game.__game_terminated ) {

                nanogame.game.__round_terminated = true;

                const white_score = nanogame.game.__score[nanogame.defs.white_player];
                const black_score = nanogame.game.__score[nanogame.defs.black_player];

                if ( white_score > black_score ) {
                    nanogame.game.__winner = nanogame.defs.white_player;

                } else if ( black_score > white_score ) {
                    nanogame.game.__winner = nanogame.defs.black_player;
                }
            }
        }
    }
};

nanogame.game.__select_random_cards = function(){

    let selected_cards = [];

    while ( selected_cards.length < nanogame.defs.player_card_max )  {

        let selected_card_index = Math.floor(Math.random()*nanogame.game.__deck.length);
        let card_value = nanogame.game.__deck[selected_card_index];
        selected_cards.push(card_value);

        nanogame.game.__deck = nanogame.game.__deck.filter( function(curent_value, current_index){
            return ( current_index !== selected_card_index ); } );
    }

    selected_cards.sort(function(a, b){ return (a - b); });
    return selected_cards;
};
//////////////////////////////////////////////////////////////////////////
