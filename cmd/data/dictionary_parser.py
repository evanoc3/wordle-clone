#!/usr/bin/env python3

from pathlib import Path
from random import shuffle


def main():
	words: set[str] = set()

	# Read raw words file (recommended: https://github.com/dwyl/english-words/blob/master/words.txt, saved as `dictionary_raw.txt`)
	raw_words_file_path = Path(__file__).resolve().parent / "dictionary_raw.txt"
	with open(raw_words_file_path, "r") as raw_words_file:
		line = raw_words_file.readline().strip()
		while line:
			if len(line) == 5 and line.isalpha():
				words.add(f"{line.lower()}\n")
			line = raw_words_file.readline().strip()
	
	# Also make sure to include every possible word choice too (must have run the `word_choice_parser.py` script already)
	raw_words_file_path = Path(__file__).resolve().parent / "word_choices.txt"
	with open(raw_words_file_path, "r") as raw_words_file:
		line = raw_words_file.readline().strip()
		while line:
			if len(line) == 5 and line.isalpha():
				words.add(f"{line.lower()}\n")
			line = raw_words_file.readline().strip()

	words = sorted(list(words))

	# write out final list of words to `dictionary.txt`
	words_file_path = Path(__file__).resolve().parent / "dictionary.txt"
	with open(words_file_path, "w") as words_file:
		words_file.writelines(words)


if __name__ == "__main__":
	main()