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
nanogame.broker.__init_module_done = false;

nanogame.broker.init_module = function(){

    if ( nanogame.broker.__init_module_done ) return;
    nanogame.broker.__init_module_done = true;

    // Init required modules
    nanogame.debug.init_module();
    nanogame.defs.init_module();
    nanogame.game.init_module();
    nanogame.presenter.init_module();
    nanogame.server.init_module();

    nanogame.broker.__state = null;
    nanogame.broker.__key = 0;

    nanogame.broker.__user_name = null;
    nanogame.broker.__user_player = null;

    nanogame.broker.__user_name = []
    nanogame.broker.__user_name[0] = null;
    nanogame.broker.__user_name[1] = null;

    nanogame.broker.__user_player = []
    nanogame.broker.__user_player[0] = null;
    nanogame.broker.__user_player[1] = null;

    nanogame.broker.__user_confirm = []
    nanogame.broker.__user_confirm[0] = false;
    nanogame.broker.__user_confirm[1] = false;

    // Init inner classes
    // None

    nanogame.debug.write_message( "nanogame.broker.init_module(): done" );
};

nanogame.broker.disable_interaction = function(){

    nanogame.presenter.enable_committer(nanogame.defs.white_player, false);
    nanogame.presenter.enable_committer(nanogame.defs.black_player, false);

    nanogame.presenter.enable_selector(nanogame.defs.white_player, false);
    nanogame.presenter.enable_selector(nanogame.defs.black_player, false);
};

nanogame.broker.next_key = function(key){
    /* Compute the next key

     We just want to ensure a maximal cycle length, no more.

        When c ≠ 0, correctly chosen parameters allow a period equal to m, for all seed values.
        This will occur if and only if
        1) m and c are relatively prime,
        2) (a - 1) is divisible by all prime factors of m,
        3) (a - 1) is divisible by 4 if m is divisible by 4.

        References:
        [1] Hull, T. E.; Dobell, A. R. (July 1962). "Random Number Generators"
        [2] Knuth, Donald (1997). Seminumerical Algorithms. The Art of Computer Programming. 2 (3rd ed.).
    */
    const a = 5;
    const c = 3;
    const m = 256;
    return (a*key + c) % m;
};

nanogame.broker.start = function(){

    nanogame.presenter.start();

    if ( nanogame.server.is_running ) {

        if ( nanogame.broker.__state === null ) {
            const command_name = "SET_STATE";

            const state = { };
            state.player_name = []
            state.player_name[0] = "Alice"
            state.player_name[1] = null

            const key = nanogame.broker.next_key(nanogame.broker.__key);

            const command_input = {key:key, state: state};

            const command_output_reader = function(command_output){
                if ( command_output === "OK" ) {
                    nanogame.broker.__key = key;
                    nanogame.broker.__state = state;

                } else if ( command_output === "NOK" ) {
                    const command_name = "GET_STATE";
                    const command_input = null;
                    const command_output_reader = function(command_output){
                        nanogame.broker.__key = command_output.key;
                        nanogame.broker.__state = command_output.state;
                        nanogame.broker.start();
                    };
                    nanogame.server.request(command_name, command_input, command_output_reader);
                    return;
                };
                nanogame.broker.start();
            }
            nanogame.server.request(command_name, command_input, command_output_reader);
            return;
        }

        nanogame.presenter.show_roles_zone(true);
        nanogame.presenter.show_client_name(true);

        if ( nanogame.broker.__user_name === null ) {
            const command_name = "NEW_PLAYER";
            const command_input = null;
            const command_output_reader = function(command_output){
                nanogame.broker.__user_name = command_output;
                nanogame.presenter.set_client_name(nanogame.broker.__user_name);
                nanogame.broker.start();
            }
            nanogame.server.request(command_name, command_input, command_output_reader);
            return;
        }
    } else {
        nanogame.presenter.show_roles_zone(true);
        nanogame.presenter.show_client_name(false);

        nanogame.presenter.set_user_name(0, "Alice");
        nanogame.presenter.set_user_name(1, "Bob");

        nanogame.presenter.set_role_options(0, ["Black", "White"]);
        nanogame.presenter.set_role_options(1, ["Black", "White"]);

        nanogame.presenter.set_role_selection(0, "White");
        nanogame.presenter.set_role_selection(1, "Black");

        nanogame.presenter.set_role_check(0, false);
        nanogame.presenter.set_role_check(1, false);
    }

    nanogame.game.start();
    nanogame.presenter.set_observer(nanogame.broker);
    nanogame.broker.update_presenter();
    nanogame.debug.write_message( "nanogame.broker.start(): done" );
};

nanogame.broker.update_from_observable = function(observable){

    nanogame.broker.disable_interaction();

    const card = nanogame.presenter.get_selector_selection(nanogame.game.get_active_player());
    nanogame.game.set_play(card);
    nanogame.broker.update_presenter();
    nanogame.broker.disable_interaction();
    nanogame.presenter.play_click_sound();

    // A delay is required to display each played card
    const broker_delay = 1000;
    let broker_timeout = null;

    broker_timeout = setTimeout( function(){
        clearTimeout(broker_timeout);

        if ( nanogame.game.round_terminated() ) {
            nanogame.presenter.play_slide_sound();
        }

        nanogame.game.update();

        nanogame.broker.update_presenter();
        }, broker_delay);
};

nanogame.broker.update_presenter = function(){

    nanogame.broker.disable_interaction();

    nanogame.presenter.set_score(nanogame.defs.white_player, nanogame.game.get_score(nanogame.defs.white_player));
    nanogame.presenter.set_score(nanogame.defs.black_player, nanogame.game.get_score(nanogame.defs.black_player));

    const empty_play = "_";

    {
        const white_play = nanogame.game.get_play(nanogame.defs.white_player);

        if ( white_play == null )  {
            nanogame.presenter.set_play(nanogame.defs.white_player, empty_play);
        } else {
            nanogame.presenter.set_play(nanogame.defs.white_player, white_play);
        }
    }

    {
        const black_play = nanogame.game.get_play(nanogame.defs.black_player);

        if ( black_play == null )  {
            nanogame.presenter.set_play(nanogame.defs.black_player, empty_play);
        } else {
            nanogame.presenter.set_play(nanogame.defs.black_player, black_play);
        }
    }

    {
        const white_cards = nanogame.game.get_cards(nanogame.defs.white_player);

        if ( nanogame.defs.white_player === nanogame.game.get_active_player() ) {
            nanogame.presenter.set_selector_options(nanogame.defs.white_player, white_cards);
            if ( white_cards.length !== 0 ) {
                const card_index = Math.floor(Math.random()*white_cards.length);
                const card_value = white_cards[card_index];
                nanogame.presenter.set_selector_selection(nanogame.defs.white_player, card_value);
            }
        } else {
            nanogame.presenter.set_selector_options(nanogame.defs.white_player, []);
            nanogame.presenter.set_selector_selection(nanogame.defs.white_player, "" );
        }
    }

    {
        const black_cards = nanogame.game.get_cards(nanogame.defs.black_player);

        if ( nanogame.defs.black_player === nanogame.game.get_active_player() ) {
            nanogame.presenter.set_selector_options(nanogame.defs.black_player, black_cards);
            if ( black_cards.length !== 0 ) {
                const card_index = Math.floor(Math.random()*black_cards.length);
                const card_value = black_cards[card_index];
                nanogame.presenter.set_selector_selection(nanogame.defs.black_player, card_value);
            }
        } else {
            nanogame.presenter.set_selector_options(nanogame.defs.black_player, []);
            nanogame.presenter.set_selector_selection(nanogame.defs.black_player, "" );
        }
    }

    if ( nanogame.game.game_terminated() ) {

        if ( nanogame.game.get_winner() === nanogame.defs.white_player )  {
            nanogame.presenter.play_clap_sound();
            nanogame.presenter.set_status( "White wins !" );

        } else if ( nanogame.game.get_winner() === nanogame.defs.black_player ) {
            nanogame.presenter.play_clap_sound();
            nanogame.presenter.set_status( "Black wins !" );

        } else {
            nanogame.presenter.set_status( "Nobody wins !" );
            nanogame.presenter.play_bling_sound();
        }

    } else {

        nanogame.presenter.enable_committer(nanogame.game.get_active_player(), true);
        nanogame.presenter.enable_selector(nanogame.game.get_active_player(), true);

        if ( nanogame.game.get_active_player() === nanogame.defs.white_player ) {
            nanogame.presenter.set_status( "White turn ..." );

        } else if ( nanogame.game.get_active_player() === nanogame.defs.black_player ) {
            nanogame.presenter.set_status( "Black turn ..." );
        }
    }
};
/////////////////////////////////////////////////////////////////////////
