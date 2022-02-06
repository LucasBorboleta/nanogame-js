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

    // Init inner classes
    // None

    nanogame.debug.write_message( "nanogame.presenter.init_module(): done" );
};

nanogame.presenter.start = function(){

    nanogame.presenter.__observer = null;

    nanogame.presenter.__white_selector = document.getElementById( "nanogame_white_selector_id" );
    nanogame.presenter.__black_selector = document.getElementById( "nanogame_black_selector_id" );

    nanogame.presenter.__white_ok = document.getElementById( "nanogame_white_ok_id" );
    nanogame.presenter.__black_ok = document.getElementById( "nanogame_black_ok_id" );

    nanogame.presenter.__white_score = document.getElementById( "nanogame_white_score_id" );
    nanogame.presenter.__black_score = document.getElementById( "nanogame_black_score_id" );

    nanogame.presenter.__enable_element(nanogame.presenter.__white_selector, true);
    nanogame.presenter.__enable_element(nanogame.presenter.__black_selector, true);

    nanogame.presenter.__enable_element(nanogame.presenter.__white_ok, true);
    nanogame.presenter.__enable_element(nanogame.presenter.__black_ok, true);

    nanogame.presenter.__set_selector_options(nanogame.presenter.__white_selector, [0, 1, 2] );
    nanogame.presenter.__set_selector_options(nanogame.presenter.__black_selector, [3, 4, 5] );

    nanogame.presenter.__set_selector_selection(nanogame.presenter.__white_selector, 1 );
    nanogame.presenter.__set_selector_selection(nanogame.presenter.__black_selector, 4 );

    nanogame.presenter.__set_score(nanogame.presenter.__white_score, 3);
    nanogame.presenter.__set_score(nanogame.presenter.__black_score, 6);

    nanogame.debug.write_message( "nanogame.presenter.start(): done" );
};

nanogame.presenter.__enable_element = function(element, condition){
    element.disabled = ( ! condition );
};

nanogame.presenter.__get_selector_selection = function(element){
    const selection = element.value ;
    return selection;
};

nanogame.presenter.__set_selector_selection = function(element, selection){
    element.value = selection;
};

nanogame.presenter.__set_selector_options = function(element, options){
    for ( const option of options ) {
        element.innerHTML += "<option value=" + "\"" +  option + "\"" + ">" + option + "</option>" ;
    }
};

nanogame.presenter.__set_score = function(element, score){
    element.innerHTML = "" + score;
};

nanogame.presenter.confirm = function(){
    nanogame.debug.write_message( "nanogame.presenter.confirm: ..." );
    nanogame.presenter.__notify_observer();
};

nanogame.presenter.set_observer = function(observer){
    nanogame.presenter.__observer = observer;
};

nanogame.presenter.__notify_observer = function(){
    const observable = nanogame.presenter;
    nanogame.presenter.__observer.update_from_observable(observable);
};
//////////////////////////////////////////////////////////////////////////
