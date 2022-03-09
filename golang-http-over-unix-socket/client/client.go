package main

import (
	"context"
	"flag"
	"fmt"
	"io"
	"log"
	"net"
	"net/http"
	"os"
	"strings"
)

func main() {
	post := flag.String("d", "", "data to post")
	help := flag.Bool("h", false, "show help")
	flag.Parse()

	if *help || len(flag.Args()) != 2 {
		fmt.Fprintln(os.Stderr, "usage:", os.Args[0], "[-d data] /path/to/sock /uri")
		flag.PrintDefaults()
		os.Exit(0)
	}

	log.Println("[info] unix domain socket http client")

	socket := flag.Args()[0]
	uri := flag.Args()[1]

	client := http.Client{
		Transport: &http.Transport{
			DialContext: func(ctx context.Context, _, _ string) (net.Conn, error) {
				dialer := net.Dialer{}
				return dialer.DialContext(ctx, "unix", socket)
			},
		},
	}

	var response *http.Response
	var err error

	if len(*post) == 0 {
		response, err = client.Get("http://unix" + uri)
	} else {
		response, err = client.Post("http://unix"+uri, "application/octet-stream", strings.NewReader(*post))
	}

	if err != nil {
		log.Fatal(err)
	}

	io.Copy(os.Stdout, response.Body)
}
