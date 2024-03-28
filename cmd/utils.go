package main


func containsByte(elems string, c byte) bool {
	for _, s := range elems {
		if c == byte(s) {
			return true
		}
	}
	return false
}


func containsString(elems []string, s string) bool {
	for _, elem := range elems {
		if s == elem {
			return true
		}
	}
	return false
}


func wordToLetterMap(word string) map[int]byte {
	letterMap := make(map[int]byte, 5)

	for i, c := range word {
		letterMap[i] = byte(c)
	}

	return letterMap
}


func mapContains(m map[int]byte, c byte) bool {
	for _, val := range m {
		if c == val {
			return true
		}
	}

	return false
}
