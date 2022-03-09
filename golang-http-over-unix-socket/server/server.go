package main

import (
	"fmt"
	"log"
	"net"
	"net/http"
	"os"
)

func main() {
	if len(os.Args) < 2 {
		fmt.Fprintln(os.Stderr, "usage:", os.Args[0], "/path/to/sock [wwwroot]")
		os.Exit(0)
	}

	log.Println("[info] unix domain socket http server")

	socket := os.Args[1]

	root := "."
	if len(os.Args) > 2 {
		root = os.Args[2]
	}

	// A socket can only be bounded to once; delete and recreate the socket
	os.Remove(socket)

	server := http.Server{
		Handler: http.FileServer(http.Dir(root)),
	}

	unixListener, err := net.Listen("unix", socket)
	if err != nil {
		log.Fatal(err)
	}

	server.Serve(unixListener)
}
