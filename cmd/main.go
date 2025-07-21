// main.go
package main

import (
	"context"
	"log"
	"os"

	"github.com/jackc/pgx/v5"
)

func main() {
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		log.Fatal("DATABASE_URL est vide, vérifie ton .env")
	}

	conn, err := pgx.Connect(context.Background(), dsn)
	if err != nil {
		log.Fatalf("Échec de connexion à la base : %v", err)
	}
	defer conn.Close(context.Background())

	var version string
	if err := conn.QueryRow(context.Background(), "SELECT version()").Scan(&version); err != nil {
		log.Fatalf("Requête échouée : %v", err)
	}

	log.Println("Connecté à :", version)
}
