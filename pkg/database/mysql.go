package database

import (
	"context"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
	"log"
	"os"
	"time"
)

var DB *pgxpool.Pool

func Init() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Attention: .env non trouvé, s'assurer que les variables sont définies autrement")
	}

	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		log.Fatal("DATABASE_URL est vide, vérifie ton .env")
	}

	config, err := pgxpool.ParseConfig(dsn)
	if err != nil {
		log.Fatalf("Erreur config pool : %v", err)
	}

	config.MaxConns = 10
	config.MinConns = 2
	config.MaxConnLifetime = time.Hour
	config.MaxConnIdleTime = time.Minute * 30

	DB, err = pgxpool.NewWithConfig(context.Background(), config)
	if err != nil {
		log.Fatalf("Échec de connexion à la base : %v", err)
	}

	var version string
	if err := DB.QueryRow(context.Background(), "SELECT version()").Scan(&version); err != nil {
		log.Fatalf("Requête échouée : %v", err)
	}

	log.Println("Connecté à :", version)

}

func Close() {
	if DB != nil {
		DB.Close()
	}
}
