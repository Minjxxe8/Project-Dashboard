package reviews

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func AddReviewHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	if r.Method != http.MethodPost {
		http.Error(w, "Méthode non autorisée", http.StatusMethodNotAllowed)
		return
	}

	var review Review
	if err := json.NewDecoder(r.Body).Decode(&review); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	fmt.Printf("📦 Données reçues : %+v\n", review)

	if err := AddReview(review); err != nil {
		http.Error(w, fmt.Sprintf("Erreur lors de l'ajout de la review : %v", err), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{
		"status":  "ok",
		"message": "Memory added successfully",
	})
}

func GetAllReviewsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	if r.Method != http.MethodGet {
		http.Error(w, "Méthode non autorisée", http.StatusMethodNotAllowed)
		return
	}

	reviews, err := GetAllReview()
	if err != nil {
		http.Error(w, fmt.Sprintf("Erreur lors de la récupération des reviews : %v", err), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(reviews)
}
