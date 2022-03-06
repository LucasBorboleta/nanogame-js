# Design

## Introduction

The motivation is to implement step by step Nanogame in the BGA platform.

Because BGA is new to me, there is the need to check step by step my understanding and also my architecture, which could not be canonical.

## Objectives

Here are the objectives for the implementation of Nanogame:

- Implement all rules on Javascript ES5.
- Keep a very few variables and functions in PHP.
- Record the state of the Game in SQL as a JSON string.

- Possibility to select the side white/black at the beginning.

## Architecture

The management of the Game is distributed to the following modules:

* BGA :
  * The initial framework that starts the Game. 
* Presenter:
  * It displays the game and messages to players (some special status messages might be delegated to BGA)
  * It plays sounds.
  * It displays the allowed moves.
  * It retrieves the player decision.
* Game:
  * It knows the starting positions.
  * It knows if the game is terminated.
  * It knows who wins.
  * It knows the next possible moves.
* Broker :
  * It interacts with BGA.
  * It interacts with Game.
  * it interacts with Presenter

The sequence of the interactions is as follows:

* For each player browser, BGA creates the broker with the information `broker_player` of the player to be served.

*  From BGA, Broker receives a request as a triple `(game_game_terminated, game_exported_state, game_player)` to be understood as follows: 
  * If `game_game_terminated == True` then `game_exported_state` is expected not to be `None`and `game_player` is expected to be `None`:
    * Broker updates  Game with `game_exported_state`. 
    * Broker requests to Game the current positions to be displayed. 
    * Broker requests Presenter to render such positions.
  * If `game_game_terminated == False` and`game_exported_state == None` then `game_player` is expected no to be `None`:
    * Broker creates a new instance of Game. 
    * Broker requests to Game the current positions to be displayed. 
    * Broker requests Presenter to render such positions.
    * if the `game_player == broker_player`then:
      * Broker requests to Game the possible moves.
      * Broker requests Presenter to render such moves.
      * Broker requests Presenter to return chosen move by the active player
      * Broker updates Game with returned choice.
      * Broker requests Game to export its status as a triple `(game_game_terminated, Game_exported_state, Game_player)`.
      * Broker sends such triple to BGA.
      * BGA records the triple in its SQL database.
      * For each player browser, BGA sends such triple to each Broker.
  * If `game_game_terminated == False` and`game_exported` is not `None` then `game_player` is expected no to be `None`:
    * Broker updates Game with `game_exported_state`. 
    * Then the sequence continues as the previous one.
  
  ## States
  
  About states:
  
  - Registering-Players : waiting for two players ; third and subsequent players are just spectators.
  
  * Assigning-Roles : decision about who plays white or black.
  * Playing-Game : display the game state to all players and handle player decision ; at game termination this state is kept, but nothing append.

