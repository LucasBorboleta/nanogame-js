# Nanogame-js

 Using JavaScript, **nanogame-js** implements a GUI and a rules engine for the **nanogame** boardgame. The intent is then to learn how to implement a game on the [Board Game Arena](https://fr.boardgamearena.com/) (BGA) and also to test some architecture principle.

The rules of **nanogame** are the following:

- Two players are involved: white and black.
- It is a turn-based game. White starts the play.
- Each player receives 5 cards randomly selected from a set of ten cards, that are numbered from 1 to 10. The received cards are visible for their owner, but are hidden to the opponent.
- On his turn, the white player selects one card which becomes visible to his opponent.
- The black player does the same.
- When the two selected cards are known the score is updated: +1 to the owner of the higher card.
- The game ends when all cards have been selected. The player with the highest score wins.

If you intent to derive or to sell either a text, a product or a software from this work, then read the [**LICENSE**](./docs/LICENSE.txt) and the  [**COPYRIGHT**](./docs/COPYRIGHT.md)  documents.
