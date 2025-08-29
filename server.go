package Project_Dashboard

import (
	"encoding/json"
	"fmt"
	"github.com/jackc/pgx/v5"
	"log"
	"net/http"
)

type Memory struct {
	Name    string `json:"name"`
	Date    string `json:"date"`
	Content string `json:"content"`
	Title   string `json:"title"`
	Emotion string `json:"emotion"`
	Jar     string `json:"jar"`
}

func handleMemoryPost(w http.ResponseWriter, r *http.Request) {
	fmt.Println("➡️ Requête reçue sur /api/memories")

	if r.Method != http.MethodPost {
		http.Error(w, "Méthode non autorisée", http.StatusMethodNotAllowed)
		return
	}

	var mem Memory
	if err := json.NewDecoder(r.Body).Decode(&mem); err != nil {
		http.Error(w, "Erreur de décodage JSON", http.StatusBadRequest)
		return
	}

	fmt.Printf("📦 Mémoire reçue : %+v\n", mem)

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func RunServer(conn *pgx.Conn) {
	mux := http.NewServeMux()

	//Les routes
	mux.HandleFunc("/api/memories", handleMemoryPost)

	handler := corsMiddleware(mux)

	log.Println("Serveur démarré sur : http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
}
