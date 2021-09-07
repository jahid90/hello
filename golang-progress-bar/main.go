package main

import (
	"fmt"
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
	mu          sync.Mutex
}

func NewProgressBar(total int, units string) *ProgressBar {
	return &ProgressBar{
		width:       80,
		total:       total,
		current:     0,
		completed:   false,
		units:       units,
		refreshRate: 100 * time.Millisecond,
		mu:          sync.Mutex{},
	}
}

func (p *ProgressBar) start(tick chan int) {

	go func() {
		for range tick {
			p.mu.Lock()
			p.current = p.current + 1
			p.mu.Unlock()
		}
	}()

	for !p.completed {

		if p.current >= p.total {
			p.mu.Lock()
			p.completed = true
			p.mu.Unlock()
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
		fmt.Print("#")
	}
	if !p.completed {
		fmt.Printf("\b>")
	}
	for i := 0; i < remaining; i++ {
		fmt.Print(" ")
	}
	fmt.Printf("] %d/%d %s", p.current, p.total, p.units)

	time.Sleep(p.refreshRate)

}

func main() {
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
		time.Sleep(50 * time.Millisecond)
	}

	wg.Wait()
	fmt.Println()

}
