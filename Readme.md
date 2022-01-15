# Wordle clone

A web app which replicates the gameplay and functionality of [Wordle](https://www.powerlanguage.co.uk/wordle).

## Features:

* **Responsive**: designed for both desktop and mobile screens,
* **Input**: both physical and on-screen keyboard supported,
* **Theme**: dark theme support (for users with dark theme enabled in their OS/browser),
* **Persistance**: maintains current game state across page reloads, and records past days state (using localStorage),
* **Analysis**: View gameplay statistics and your solution distribution graph,


## Setup

Before you can run the app, you must provide two text files: one from which the app will determine whether a word is valid or not, and the other from which the app will choose a new word for eath day from. These two text files are both in the same format: one 5-letter word per line, and should be located at `src/data/dictionary.txt` and `src/data/word_choices.txt` respectively.

The repo also includes two scripts which can each generate one of the the required files from a larger, unprocessed (raw) text file, the instructions for how to source which are commented on in each respective script.
