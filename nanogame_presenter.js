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
nanogame.presenter.__initModuleCalled = false;

nanogame.presenter.__initModule = function(){

    if ( nanogame.presenter.__initModuleCalled ) return;
    nanogame.presenter.__initModuleCalled = true;

    // Init required modules
    nanogame.debug.__initModule();

    // Init inner classes
    // None

    nanogame.presenter.white_selector = document.getElementById( "nanogame_white_selector_id" );
    nanogame.presenter.black_selector = document.getElementById( "nanogame_black_selector_id" );

    nanogame.presenter.white_ok = document.getElementById( "nanogame_white_ok_id" );
    nanogame.presenter.black_ok = document.getElementById( "nanogame_black_ok_id" );

    nanogame.presenter.white_score = document.getElementById( "nanogame_white_score_id" );
    nanogame.presenter.black_score = document.getElementById( "nanogame_black_score_id" );

    nanogame.presenter.enable_element(nanogame.presenter.white_selector, true);
    nanogame.presenter.enable_element(nanogame.presenter.black_selector, true);

    nanogame.presenter.enable_element(nanogame.presenter.white_ok, true);
    nanogame.presenter.enable_element(nanogame.presenter.black_ok, true);

    nanogame.presenter.set_selector_options(nanogame.presenter.white_selector, [0, 1, 2] );
    nanogame.presenter.set_selector_options(nanogame.presenter.black_selector, [3, 4, 5] );

    nanogame.presenter.set_selector_selection(nanogame.presenter.white_selector, 1 );
    nanogame.presenter.set_selector_selection(nanogame.presenter.black_selector, 4 );

    nanogame.presenter.set_score(nanogame.presenter.white_score, 3);
    nanogame.presenter.set_score(nanogame.presenter.black_score, 6);

    nanogame.debug.writeMessage( "nanogame.presenter.__initModule(): done" );
};

nanogame.presenter.enable_element = function(element, condition){
    element.disabled = ( ! condition );
};

nanogame.presenter.white_select = function(){
    nanogame.debug.writeMessage( "nanogame.white_selector: done" );
};

nanogame.presenter.black_select = function(){
    nanogame.debug.writeMessage( "nanogame.black_selector: done" );
};

nanogame.presenter.white_confirm = function(){
    nanogame.debug.writeMessage( "nanogame.white_confirm: done" );
};

nanogame.presenter.black_confirm = function(){
    nanogame.debug.writeMessage( "nanogame.black_confirm: done" );
};

nanogame.presenter.get_selector_selection = function(element){
    const selection = element.value ;
    return selection;
};

nanogame.presenter.set_selector_selection = function(element, selection){
    element.value = selection;
};

nanogame.presenter.set_selector_options = function(element, options){
    for ( const option of options ) {
        element.innerHTML += "<option value=" + "\"" +  option + "\"" + ">" + option + "</option>" ;
    }
};

nanogame.presenter.set_score = function(element, score){
    element.innerHTML = "" + score;
};
//////////////////////////////////////////////////////////////////////////
