package main


func containsByte(elems []byte, c byte) bool {
	for _, s := range elems {
		if c == s {
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
