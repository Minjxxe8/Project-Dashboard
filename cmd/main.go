// main.go
package main

import (
	"log"
	"os"
	"os/signal"
	Project_Dashboard "project-dashboard"
	"project-dashboard/internal/auth"
	"project-dashboard/pkg/database"
	"syscall"
)

func main() {
	database.Init()

	auth.NewAuth()

	if auth.Store == nil {
		log.Fatal("Error: Gothic store is not initialized")
	} else {
		log.Println("Gothic store successfully initialized")
	}

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
