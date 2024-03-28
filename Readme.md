# Wordle clone

A web app which replicates the gameplay and functionality of [Wordle](https://www.nytimes.com/games/wordle/index.html).

## To do

- [x] **Responsive**: works well on both desktop and phone screen sizes,
- [x] **Input**: allows input from the on-screen keyboard, and on laptops, the physical keyboard too,
- [x] **Theme**: dark-theme automatically enabled if the user's OS or browser specifies it,
- [x] **Persistence**: Current and past game progress is stored locally, and will persist across page reloads (using LocalStorage),
- [x] **Analysis**: Popup containing current and past gameplay statistics, and a graph of your solution distribution,
- [ ] **Share**: button which copies an emoji representation of the current guesses to the clipboard,
- [ ] **Hard mode**: in which all your previously unearthed clues must be used in each subsequent guesses


## Setup

Before you can run the app, you must provide two text files: one from which the app will determine whether a word is valid or not, and the other from which the app will choose a new word for eath day from. These two text files are both in the same format: one 5-letter word per line, and should be located at `cmd/data/dictionary.txt` and `cmd/data/word_choices.txt` respectively.

The repo also includes two scripts which can each generate one of the the required files from a larger, unprocessed (raw) text file, the instructions for how to source which are commented on in each respective script.

# Running the app

If you want to run the app in **debug** mode, you can simply run `go run github.com/evanoc3/wordle/cmd` on the command-line from the root directory of this project. This will begin the app's HTTP server on port `8080`. You can then visit `http://localhost:8080` in your browser to interact with the app.

The build the app for **release**, run `make` on the command-line from the root directory of this project. This will produce a standalone executable at `out/wordle` which you can then run to start the app.

The **difference between debug and release** is that in debug, the contents of the dictionary file, word-choice file, and static HTML, JS, and CSS bundle files are read directly from the disk. This means that if you make changes to the CSS file, for example, then you simply need to reload the page in the browser to see your changes appear. You _must_ however, run the debug version from the root directory of the project or else the relative paths it uses to read the files from the disk will not find their targets. In the release build, the contents of those files gets embedded directly into the binary at compile time. Meaning that making changes to any of those files will require re-compiling the binary in order to see those changes. The upside of this is that the binary can be run located anywhere in the file system regardless of where those files are, or if they even exist. It will run just fine, since the contents it needs are already embedded inside it.
