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

nanogame.broker.next_turn = function(){

    if ( ! nanogame.game.is_terminated() ) {

        nanogame.presenter.set_score(nanogame.defs.white_player, nanogame.game.get_score(nanogame.defs.white_player));
        nanogame.presenter.set_score(nanogame.defs.black_player, nanogame.game.get_score(nanogame.defs.black_player));

        const white_cards = nanogame.game.get_cards(nanogame.defs.white_player);
        const black_cards = nanogame.game.get_cards(nanogame.defs.black_player);

        nanogame.presenter.set_selector_options(nanogame.defs.white_player, white_cards);
        nanogame.presenter.set_selector_options(nanogame.defs.black_player, black_cards);

        nanogame.presenter.set_selector_selection(nanogame.defs.white_player, white_cards[0]);
        nanogame.presenter.set_selector_selection(nanogame.defs.black_player, black_cards[0]);
    }
};

nanogame.broker.start = function(){
    nanogame.game.start();

    nanogame.presenter.start();
    nanogame.presenter.set_observer(nanogame.broker);

    nanogame.broker.next_turn();

    nanogame.debug.write_message( "nanogame.broker.start(): done" );
};

nanogame.broker.update_from_observable = function(observable){
    const card = nanogame.presenter.get_selector_selection(nanogame.game.get_active_player());
    nanogame.game.set_play(card);
    nanogame.debug.write_message( "nanogame.broker.update_from_observable(): ..." );
};

/////////////////////////////////////////////////////////////////////////
