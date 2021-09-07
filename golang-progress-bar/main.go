package main

import (
	"fmt"
	"os"
	"strconv"
	"sync"
	"time"
)

type ProgressBar struct {
	width       int
	total       int
	current     int
	completed   bool
	units       string
	refreshRate time.Duration
	begin       time.Time
	end         time.Time
}

func NewProgressBar(total int, units string) *ProgressBar {
	return &ProgressBar{
		width:       80,
		total:       total,
		current:     0,
		completed:   false,
		units:       units,
		refreshRate: 100 * time.Millisecond,
	}
}

func (p *ProgressBar) start(tick chan int) {

	p.begin = time.Now()

	go func() {
		for range tick {
			p.current = p.current + 1
		}
	}()

	for !p.completed {

		if p.current >= p.total {
			p.completed = true

			p.end = time.Now()
		}

		p.update()
	}
}

func (p *ProgressBar) update() {

	percent := p.current * 100 / p.total
	completedWidth := percent * p.width / 100
	remaining := p.width - completedWidth

	if p.current > 0 {
		fmt.Print("\r")
	}

	fmt.Print("[")
	for i := 0; i < completedWidth; i++ {
		fmt.Print("=")
	}
	if !p.completed {
		fmt.Printf("\b>")
	}
	for i := 0; i < remaining; i++ {
		fmt.Print("-")
	}
	fmt.Printf("] %3d/%d %s", p.current, p.total, p.units)

	if p.completed {
		fmt.Printf(" took %s", time.Duration(p.end.Sub(p.begin)).Round(time.Millisecond).String())
	}

	time.Sleep(p.refreshRate)

}

func main() {

	delay := 50 * time.Millisecond
	if len(os.Args) > 1 {
		d, err := strconv.Atoi(os.Args[1])
		if err == nil {
			delay = time.Duration(d * int(time.Millisecond))
		}
	}

	wg := sync.WaitGroup{}
	wg.Add(1)
	tick := make(chan int)
	defer close(tick)

	p := NewProgressBar(100, "")
	go func() {
		p.start(tick)
		wg.Done()
	}()

	for p.current < p.total {
		tick <- 1
		time.Sleep(delay)
	}

	wg.Wait()
	fmt.Println()

}
