package jar

import (
	"encoding/json"
	"fmt"
	"net/http"
)

// AddMemoryHandler handles the addition of a new memory
func AddMemoryHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	if r.Method != http.MethodPost {
		http.Error(w, "Méthode non autorisée", http.StatusMethodNotAllowed)
		return
	}

	var mem Memory
	if err := json.NewDecoder(r.Body).Decode(&mem); err != nil {
		http.Error(w, "Erreur de décodage JSON", http.StatusBadRequest)
		return
	}

	fmt.Printf("📦 Données reçues : %+v\n", mem)

	if err := AddMemory(mem); err != nil {
		http.Error(w, fmt.Sprintf("Erreur lors de l'ajout de la mémoire : %v", err), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{
		"status":  "ok",
		"message": "Memory added successfully",
	})
}

func GetAllMemoriesHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	if r.Method != http.MethodGet {
		http.Error(w, "Méthode non autorisée", http.StatusMethodNotAllowed)
		return
	}

	memories, err := GetAllMemory()
	if err != nil {
		http.Error(w, fmt.Sprintf("Erreur lors de la récupération des mémoires : %v", err), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(memories)
}
