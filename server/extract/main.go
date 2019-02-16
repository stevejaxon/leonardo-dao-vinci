package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
)

var jsonFile = flag.String("json", "", "the source file")

func main() {
	flag.Parse()
	if *jsonFile == "" {
		log.Fatal("must define json input file")
	}

	content, err := ioutil.ReadFile(*jsonFile)
	if err != nil {
		log.Fatal(err)
	}

	m := make(map[string]interface{})
	err = json.Unmarshal(content, &m)
	if err != nil {
		log.Fatal(err)
	}

	extension := filepath.Ext(*jsonFile)
	base := (*jsonFile)[0 : len(*jsonFile)-len(extension)]
	dir := filepath.Dir(base)
	file := base[len(dir)+1 : len(base)]
	abiFile := file + ".abi"
	binFile := file + ".bin"

	abi, err := json.MarshalIndent(m["abi"], "", "  ")
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Writing abi to: %s\n", abiFile)
	ioutil.WriteFile(abiFile, abi, os.ModePerm)

	bytecode, err := json.MarshalIndent(m["bytecode"], "", "  ")
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Writing bin to: %s\n", binFile)
	ioutil.WriteFile(binFile, bytecode, os.ModePerm)

	//fmt.Printf("%v\n", string(abi))

}
