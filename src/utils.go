package main

import "time"


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


func getDay() int {
	now := time.Now()
	year := now.Year() - 2022
	yearDay := now.YearDay()
	return ((year * 366) + yearDay) % len(dictionary)
}