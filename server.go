package Project_Dashboard

import (
	"encoding/json"
	"github.com/jackc/pgx/v5/pgxpool"
	"log"
	"net/http"
	"project-dashboard/internal/jar"
	"project-dashboard/internal/reviews"
)

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

func RunServer(pool *pgxpool.Pool) {
	mux := http.NewServeMux()

	mux.HandleFunc("/ping", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		json.NewEncoder(w).Encode(map[string]string{"message": "pong"})
	})

	// Jars Handlers
	mux.HandleFunc("/api/memories", jar.AddMemoryHandler)
	mux.HandleFunc("/api/memories/all", jar.GetAllMemoriesHandler)

	// Reviews Handlers
	mux.HandleFunc("/api/reviews", reviews.AddReviewHandler)
	mux.HandleFunc("/api/reviews/all", reviews.GetAllReviewsHandler)

	handler := corsMiddleware(mux)

	log.Println("Serveur démarré sur : http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
}
