# Design

## Introduction

The motivation is to implement step by step NANOGame in the BGA platform.

Because BGA is new to me, there is the need to check step by step my understanding and also my architecture which could not be canonical.

## Objectives

Here are the objectives for the implementation of NANOGame :

- Implement all rules on Javascript ES5.
- Keep a very few variables and functions in PHP.
- Record the state of the Game in SQL as a JSON string.

- Possibility to select the side white/black at the beginning.

## Architecture

The management of the Game is distributed to the following modules:

* BGA :
  * The initial framework that starts the Game. 
* Presenter:
  * It displays the Game and messages to players (some kind of messages might be delegated to BGA)
  * It triggers sounds.
  * It displays the allowed moves.
  * It retrieves the player decision.
* Game:
  * It knows the starting positions.
  * It knows if the Game is terminated.
  * It knows who wins.
  * It knows the next moves.
* Broker :
  * It interacts with BGA.
  * It interacts with Game.
  * it interacts with Presenter

The sequence of the interactions is as follows:

* For each player browser, BGA creates the broker with the information `broker_player` of the player to be served.
*  From BGA, Broker receives a request as a triple `(Game_is_terminated, Game_exported_state, Game_player)` to be understood as follows: 
  * If `Game_is_terminated == True` then `Game_exported_state` is expected not to be `None`and `Game_player` is expected to be `None`:
    * Broker updates the Game with `Game_exported_state`. 
    * Broker requests to Game the current positions to be displayed. 
    * Broker requests Presenter to render such positions.
  * If `Game_is_terminated == False` and`Game_exported_state == None` then `Game_player` is expected no to be `None`:
    * Broker creates a new Game. 
    * Broker requests to Game the current positions to be displayed. 
    * Broker requests Presenter to render such positions.
    * if the `Game_player == broker_player`then:
      * Broker requests to Game the possible moves.
      * Broker requests Presenter to render such moves.
      * Broker requests Presenter to return chosen move by the active player
      * Broker updates Game with returned choice.
      * Broker requests Game to export its status as a triple (Game_is_terminated, Game_exported_state, Game_player)
      * Broker sends such triple to BGA.
      * BGA records the triple in its SQL database.
      * For each player browser, BGA sends such triple to each Broker.
  * If `Game_is_terminated == False` and`Game_exported` is not `None` then `Game_player` is expected no to be `None`:
    * Broker updates the Game with `Game_exported_state`. 
    * Then the sequence continues as the previous one.

