package database

import (
	"github.com/joho/godotenv"
	"log"
)

func init() {
	err := godotenv.Load("pkg/config/.env")
	if err != nil {
		log.Fatalf("Erreur de chargement du fichier .env : %v", err)
	}
}
