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

nanogame.broker.start = function(){
    nanogame.game.start();

    nanogame.presenter.start();
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

    // A delay is required to display black play.
    // So let's have a delay after each play, either white or black.
    const broker_delay = 1000;
    let broker_timeout = null;

    broker_timeout = setTimeout( function(){
        clearTimeout(broker_timeout);
        nanogame.game.update();
        nanogame.broker.update_presenter();
        }, broker_delay);
};

nanogame.broker.update_presenter = function(){

    nanogame.broker.disable_interaction();

    nanogame.presenter.set_score(nanogame.defs.white_player, nanogame.game.get_score(nanogame.defs.white_player));
    nanogame.presenter.set_score(nanogame.defs.black_player, nanogame.game.get_score(nanogame.defs.black_player));

    {
        const white_play = nanogame.game.get_play(nanogame.defs.white_player);

        if ( white_play == null )  {
            nanogame.presenter.set_play(nanogame.defs.white_player, "?");
        } else {
            nanogame.presenter.set_play(nanogame.defs.white_player, white_play);
        }
    }

    {
        const black_play = nanogame.game.get_play(nanogame.defs.black_player);

        if ( black_play == null )  {
            nanogame.presenter.set_play(nanogame.defs.black_player, "?");
        } else {
            nanogame.presenter.set_play(nanogame.defs.black_player, black_play);
        }
    }

    {
        const white_cards = nanogame.game.get_cards(nanogame.defs.white_player);

        if ( nanogame.defs.white_player === nanogame.game.get_active_player() ) {
            nanogame.presenter.set_selector_options(nanogame.defs.white_player, white_cards);
            if ( white_cards.length !== 0 ) {
                nanogame.presenter.set_selector_selection(nanogame.defs.white_player, white_cards[0]);
            }
        } else {
            nanogame.presenter.set_selector_options(nanogame.defs.white_player, []);
            nanogame.presenter.set_selector_selection(nanogame.defs.white_player, "");
        }
    }

    {
        const black_cards = nanogame.game.get_cards(nanogame.defs.black_player);

        if ( nanogame.defs.black_player === nanogame.game.get_active_player() ) {
            nanogame.presenter.set_selector_options(nanogame.defs.black_player, black_cards);
            if ( black_cards.length !== 0 ) {
                nanogame.presenter.set_selector_selection(nanogame.defs.black_player, black_cards[0]);
            }
        } else {
            nanogame.presenter.set_selector_options(nanogame.defs.black_player, []);
            nanogame.presenter.set_selector_selection(nanogame.defs.black_player, "" );
        }
    }

    if ( nanogame.game.is_terminated() ) {

        if ( nanogame.game.get_winner() === nanogame.defs.white_player )  {
            nanogame.presenter.set_status("White wins !");

        } else if ( nanogame.game.get_winner() === nanogame.defs.black_player ) {
            nanogame.presenter.set_status("Black wins !");

        } else {
            nanogame.presenter.set_status("Nobody wins !");
        }

    } else {

        nanogame.presenter.enable_committer(nanogame.game.get_active_player(), true);
        nanogame.presenter.enable_selector(nanogame.game.get_active_player(), true);

        if ( nanogame.game.get_active_player() === nanogame.defs.white_player ) {
            nanogame.presenter.set_status("White turn ...");

        } else if ( nanogame.game.get_active_player() === nanogame.defs.black_player ) {
            nanogame.presenter.set_status("Black turn ...");
        }
    }
};
/////////////////////////////////////////////////////////////////////////