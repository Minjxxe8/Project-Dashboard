// main.go
package main

import (
	"log"
	"os"
	"os/signal"
	Project_Dashboard "project-dashboard"
	"project-dashboard/pkg/database"
	"syscall"
)

func main() {
	database.Init()
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)

	go func() {
		<-c
		log.Println("Fermeture de l'application...")
		database.Close()
		os.Exit(0)
	}()

	Project_Dashboard.RunServer(database.DB)
}
