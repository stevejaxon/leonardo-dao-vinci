package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	bindAddress := "localhost:8080"
	http.Handle("/images/", http.StripPrefix("/images/", http.FileServer(http.Dir("images"))))
	fmt.Printf("Serving images at %s/images\n", bindAddress)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
