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

nanogame.presenter.change_role = function(player_index){
    const role = nanogame.presenter.get_role_selection(player_index);
    nanogame.debug.write_message( "nanogame.presenter.change_role(): player_index " + player_index + " has selected role " + role);

    const other_user_index = (player_index + 1) % 2;

    var other_user_role = "";
    if ( role === "Black" ) {
        other_user_role = "White";
    } else {
        other_user_role = "Black";
    }

    nanogame.presenter.set_role_check(player_index, true);
    nanogame.presenter.set_role_check(other_user_index, false);
    nanogame.presenter.set_role_selection(other_user_index, other_user_role);
};

nanogame.presenter.check_role = function(player_index){
    const role_check = nanogame.presenter.get_role_check(player_index);
    nanogame.debug.write_message( "nanogame.presenter.check_role(): player_index " + player_index + " has checked as " + role_check);
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

nanogame.presenter.get_role_selection = function(player_index){
    const element = nanogame.presenter.__user_role[player_index];
    const selection = element.value ;
    return selection;
};

nanogame.presenter.get_role_check = function(player_index){
    const element = nanogame.presenter.__user_check[player_index];
    const check = element.checked ;
    return check;
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

nanogame.presenter.set_client_name = function(player_name){
    const element = nanogame.presenter.__client_name;
    element.innerHTML = "" + player_name;
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

nanogame.presenter.set_role_check = function(player_index, condition){
    const element = nanogame.presenter.__user_check[player_index];
    element.checked = condition;
};

nanogame.presenter.set_role_options = function(player_index, options){
    const element = nanogame.presenter.__user_role[player_index];
    nanogame.presenter.__set_element_options (element, options);
};

nanogame.presenter.set_role_selection = function(player_index, selection){
    const element = nanogame.presenter.__user_role[player_index];
    element.value = selection;
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
    nanogame.presenter.__set_element_options (element, options);
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

nanogame.presenter.set_user_name = function(player_index, player_name){
    const element = nanogame.presenter.__user_name[player_index];
    element.innerHTML = "" + player_name;
};

nanogame.presenter.show_client_name = function(condition){
    const element = nanogame.presenter.__client_name;
    nanogame.presenter.__show_element(element, condition);
};

nanogame.presenter.show_roles_zone = function(condition){
    const element = nanogame.presenter.__roles_zone;
    nanogame.presenter.__show_element(element, condition);
};

nanogame.presenter.start = function(){

    nanogame.presenter.__client_name = document.getElementById( "nanogame_client_name_id" );

    nanogame.presenter.__roles_zone = document.getElementById( "nanogame_roles_div_id" );

    nanogame.presenter.__user_name = []
    nanogame.presenter.__user_name[0] = document.getElementById( "nanogame_user_name_0_id" );
    nanogame.presenter.__user_name[1] = document.getElementById( "nanogame_user_name_1_id" );

    nanogame.presenter.__user_role = []
    nanogame.presenter.__user_role[0] = document.getElementById( "nanogame_user_role_0_id" );
    nanogame.presenter.__user_role[1] = document.getElementById( "nanogame_user_role_1_id" );

    nanogame.presenter.__user_check = []
    nanogame.presenter.__user_check[0] = document.getElementById( "nanogame_user_check_0_id" );
    nanogame.presenter.__user_check[1] = document.getElementById( "nanogame_user_check_1_id" );

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

nanogame.presenter.__set_element_options = function(element, options){
    element.innerHTML = "" ;
    for ( const option of options ) {
        element.innerHTML += "<option value=" + "\"" +  option + "\"" + ">" + option + "</option>" ;
    }
};

nanogame.presenter.__show_element = function(element, condition){
    if ( condition ) {
        element.style.display = "inherit";
    } else {
        element.style.display = "none";
    }
};
//////////////////////////////////////////////////////////////////////////
