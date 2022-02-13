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

nanogame.presenter.play_bling_sound = function(){
    nanogame.presenter.__bling_sound.currentTime = 0.0 * nanogame.presenter.__bling_sound.duration;
    nanogame.presenter.__bling_sound.volume = 0.8;
    nanogame.presenter.__bling_sound.play();
};

nanogame.presenter.play_clap_sound = function(){
    nanogame.presenter.__clap_sound.currentTime = 0.2 * nanogame.presenter.__clap_sound.duration;
    nanogame.presenter.__clap_sound.volume = 0.3;
    nanogame.presenter.__clap_sound.play();
};

nanogame.presenter.play_click_sound = function(){
    nanogame.presenter.__click_sound.currentTime = 0.4 * nanogame.presenter.__click_sound.duration;
    nanogame.presenter.__click_sound.volume = 1.0;
    nanogame.presenter.__click_sound.play();
};

nanogame.presenter.play_slide_sound = function(){
    nanogame.presenter.__slide_sound.currentTime = 0.2 * nanogame.presenter.__slide_sound.duration;
    nanogame.presenter.__slide_sound.volume = 0.5;
    nanogame.presenter.__slide_sound.play();
};

nanogame.presenter.set_observer = function(observer){
    nanogame.presenter.__observer = observer;
};

nanogame.presenter.set_play = function(player, play){
    const element = nanogame.presenter.__play[player];
    const old_style_display = element.style.display;
    const new_inner_html = "" + play;

    if ( element.innerHTML !== new_inner_html ) {
        element.innerHTML = new_inner_html;
        element.style.display = "none";

        const setter_delay = 100;
        let setter_timeout = null;

        setter_timeout = setTimeout( function(){
            clearTimeout(setter_timeout);
            element.style.display = old_style_display;
            }, setter_delay);
    }
};

nanogame.presenter.set_score = function(player, score){
    const element = nanogame.presenter.__score[player];
    const old_style_display = element.style.display;
    const new_inner_html = "" + score;

    if ( element.innerHTML !== new_inner_html ) {
        element.innerHTML = new_inner_html;
        element.style.display = "none";

        const setter_delay = 100;
        let setter_timeout = null;

        setter_timeout = setTimeout( function(){
            clearTimeout(setter_timeout);
            element.style.display = old_style_display;
            }, setter_delay);
    }
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

    nanogame.presenter.__bling_sound = document.getElementById( "nanogame_bling_sound_id" );
    nanogame.presenter.__clap_sound = document.getElementById( "nanogame_clap_sound_id" );
    nanogame.presenter.__click_sound = document.getElementById( "nanogame_click_sound_id" );
    nanogame.presenter.__slide_sound = document.getElementById( "nanogame_slide_sound_id" );

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
