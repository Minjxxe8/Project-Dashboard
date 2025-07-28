package database

import (
	"context"
	"github.com/jackc/pgx/v5"
	"github.com/joho/godotenv"
	"log"
	"os"
	Project_Dashboard "project-dashboard"
)

func Init() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Attention: .env non trouvé, s'assurer que les variables sont définies autrement")
	}

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

	Project_Dashboard.RunServer(conn)
}
