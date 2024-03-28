#!/usr/bin/env python3

from pathlib import Path
from random import shuffle


def main():
	approved_words: set[str] = set()

	# Raw words file (recommeded: https://github.com/first20hours/google-10000-english/blob/master/google-10000-english-no-swears.txt, saved locally as `word_choices_raw.txt`)
	raw_words_file_path = Path(__file__).resolve().parent / "word_choices_raw.txt"
	with open(raw_words_file_path, "r") as raw_words_file:
		line = raw_words_file.readline().strip()
		while line:
			if len(line) == 5 and line.isalpha():
				approved_words.add(f"{line.lower()}\n")
			line = raw_words_file.readline().strip()

	# Shuffle word list so they are ordered randomly, this way the app can just choose the next line each day and get a random word	
	approved_words = list(approved_words)
	shuffle(approved_words)
	
	# Write output to `word_choices.txt`
	words_file_path = Path(__file__).resolve().parent / "word_choices.txt"
	with open(words_file_path, "w") as words_file:
		words_file.writelines(approved_words)


if __name__ == "__main__":
	main()