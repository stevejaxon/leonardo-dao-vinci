package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
)

var (
	iteration = 1
	// maps image number to a set of user adresses that voted for it
	votes = make(map[int]map[string]struct{})
)

type voteMessage struct {
	UserAddress string `json:"user_address"`
	Period      int    `json:"period"`
	Images      []int  `json:"images"`
}

func main() {

	content, err := ioutil.ReadFile("iteration")
	if err == nil {
		iteration, err = strconv.Atoi(string(content))
		if err != nil {
			log.Fatalf("expecting integer defined in iteration file, instead got %s", string(content))
		}
	}

	v := &voteMessage{
		UserAddress: "0x931d387731bbbc988b312206c74f77d004d6b84b",
		Period:      2,
		Images:      []int{2, 5, 6, 7, 8},
	}
	data, err := json.Marshal(v)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("%s\n", string(data))

	bindAddress := "localhost:8080"
	http.Handle("/images/", http.StripPrefix("/images/", http.FileServer(http.Dir("images"))))
	http.HandleFunc("/iteration", handleIteration)
	http.HandleFunc("/vote", handleVotes)

	fmt.Printf("Serving images at %s/images\n", bindAddress)
	fmt.Printf("Serving iteration at %s/iteration\n", bindAddress)
	fmt.Printf("Accepting votes at %s/vote\n", bindAddress)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func handleIteration(w http.ResponseWriter, r *http.Request) {
	data, err := json.Marshal(strconv.Itoa(iteration))
	if err != nil {
		http.Error(w, "Could not marshal period", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(data)
}

func handleVotes(w http.ResponseWriter, r *http.Request) {
	content, err := ioutil.ReadAll(r.Body)
	v := &voteMessage{}
	err = json.Unmarshal(content, v)
	if err != nil {
		http.Error(w, "Could not unmarshal votes message", http.StatusBadRequest)
		return
	}

	// Verify that this user has not voted so far in this iteration
	for _, voters := range votes {
		_, ok := voters[v.UserAddress]
		if ok {
			http.Error(w, fmt.Sprintf("User %q has already voted in this iteration", v.UserAddress), http.StatusBadRequest)
			return
		}
	}

	// Add the votes for this user
	for _, i := range v.Images {
		voters, ok := votes[i]
		if !ok {
			voters = make(map[string]struct{})
			votes[i] = voters
		}
		voters[v.UserAddress] = struct{}{}
	}
	w.WriteHeader(http.StatusOK)
}
