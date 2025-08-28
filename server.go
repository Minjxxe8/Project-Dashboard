package Project_Dashboard

import (
	"encoding/json"
	"github.com/go-chi/chi/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"log"
	"net/http"
	"project-dashboard/internal/auth"
	"project-dashboard/internal/jar"
	"project-dashboard/internal/reviews"
)

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func RunServer(pool *pgxpool.Pool) {
	r := chi.NewRouter()

	r.Use(corsMiddleware)

	r.Get("/ping", func(w http.ResponseWriter, r *http.Request) {
		json.NewEncoder(w).Encode(map[string]string{"message": "pong"})
	})

	// Google Auth Handlers
	r.Get("/auth/{provider}", auth.GoogleAuthInitHandler)
	r.Get("/auth/{provider}/callback", auth.GetAuthCallback)

	r.Get("/auth/me", auth.GetCurrentUser)
	r.Get("/auth/logout", auth.LogoutHandler)

	// Jars Handlers
	r.Get("/api/memories/all", jar.GetAllMemoriesHandler)
	r.Post("/api/memories", jar.AddMemoryHandler)

	// Reviews Handlers
	r.Get("/api/reviews/all", reviews.GetAllReviewsHandler)
	r.Post("/api/reviews", reviews.AddReviewHandler)

	log.Println("Serveur démarré sur : http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}
