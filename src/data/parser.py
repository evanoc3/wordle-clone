#!/usr/bin/env python3

from pathlib import Path
from random import shuffle


def main():
	approved_words: list[str] = []

	# Raw words file sourced from https://github.com/first20hours/google-10000-english/blob/master/google-10000-english-no-swears.txt
	raw_words_file_path = Path(__file__).resolve().parent / "raw_words.txt"
	with open(raw_words_file_path, "r") as raw_words_file:
		line = raw_words_file.readline().strip()
		while line:
			if len(line) == 5 and line.isalpha():
				approved_words.append(f"{line}\n")
			line = raw_words_file.readline().strip()
		
	shuffle(approved_words)
	
	words_file_path = Path(__file__).resolve().parent / "words.txt"
	with open(words_file_path, "w") as words_file:
		words_file.writelines(approved_words)


if __name__ == "__main__":
	main()