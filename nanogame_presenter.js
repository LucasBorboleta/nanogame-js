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
nanogame.presenter = { };
nanogame.presenter.__init_module_done = false;

nanogame.presenter.init_module = function(){

    if ( nanogame.presenter.__init_module_done ) return;
    nanogame.presenter.__init_module_done = true;

    // Init required modules
    nanogame.debug.init_module();
    nanogame.defs.init_module();

    // Init inner classes
    // None

    nanogame.debug.write_message( "nanogame.presenter.init_module(): done" );
};

nanogame.presenter.commit = function(){
    nanogame.presenter.__notify_observer();
};

nanogame.presenter.enable_committer = function(player, condition){
    const element = nanogame.presenter.__committer[player];
    nanogame.presenter.__enable_element(element, condition);
};

nanogame.presenter.enable_selector = function(player, condition){
    const element = nanogame.presenter.__selector[player];
    nanogame.presenter.__enable_element(element, condition);
};

nanogame.presenter.get_selector_selection = function(player){
    const element = nanogame.presenter.__selector[player];
    const selection = parseInt(element.value) ;
    return selection;
};

nanogame.presenter.set_observer = function(observer){
    nanogame.presenter.__observer = observer;
};

nanogame.presenter.set_play = function(player, play){
    const element = nanogame.presenter.__play[player];
    element.innerHTML = "" + play;
};

nanogame.presenter.set_score = function(player, score){
    const element = nanogame.presenter.__score[player];
    element.innerHTML = "" + score;
};

nanogame.presenter.set_selector_options = function(player, options){
    const element = nanogame.presenter.__selector[player];
    element.innerHTML = "" ;
    for ( const option of options ) {
        element.innerHTML += "<option value=" + "\"" +  option + "\"" + ">" + option + "</option>" ;
    }
};

nanogame.presenter.set_selector_selection = function(player, selection){
    const element = nanogame.presenter.__selector[player];
    element.value = selection;
};

nanogame.presenter.set_status = function(status){
    const element = nanogame.presenter.__status;
    element.innerHTML = "" ;
    element.innerHTML += status
};

nanogame.presenter.start = function(){

    nanogame.presenter.__observer = null;

    nanogame.presenter.__selector = []
    nanogame.presenter.__selector[nanogame.defs.white_player] = document.getElementById( "nanogame_white_selector_id" );
    nanogame.presenter.__selector [nanogame.defs.black_player] = document.getElementById( "nanogame_black_selector_id" );

    nanogame.presenter.__committer = []
    nanogame.presenter.__committer[nanogame.defs.white_player] = document.getElementById( "nanogame_white_ok_id" );
    nanogame.presenter.__committer[nanogame.defs.black_player] = document.getElementById( "nanogame_black_ok_id" );

    nanogame.presenter.__play = []
    nanogame.presenter.__play[nanogame.defs.white_player] = document.getElementById( "nanogame_white_play_id" );
    nanogame.presenter.__play[nanogame.defs.black_player] = document.getElementById( "nanogame_black_play_id" );

    nanogame.presenter.__score = []
    nanogame.presenter.__score[nanogame.defs.white_player] = document.getElementById( "nanogame_white_score_id" );
    nanogame.presenter.__score[nanogame.defs.black_player] = document.getElementById( "nanogame_black_score_id" );

    nanogame.presenter.__status = document.getElementById( "nanogame_game_status_id" );

    nanogame.presenter.enable_selector(nanogame.defs.white_player, false);
    nanogame.presenter.enable_selector(nanogame.defs.black_player, false);

    nanogame.presenter.enable_committer(nanogame.defs.white_player, false);
    nanogame.presenter.enable_committer(nanogame.defs.black_player, false);

    nanogame.debug.write_message( "nanogame.presenter.start(): done" );
};

nanogame.presenter.__enable_element = function(element, condition){
    element.disabled = ( ! condition );
};

nanogame.presenter.__notify_observer = function(){
    const observable = nanogame.presenter;
    nanogame.presenter.__observer.update_from_observable(observable);
};
//////////////////////////////////////////////////////////////////////////
