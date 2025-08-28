package auth

import (
	"encoding/json"
	"fmt"
	"github.com/markbates/goth/gothic"
	"net/http"
)

func SetSession(w http.ResponseWriter, r *http.Request, userEmail string) error {
	fmt.Printf("=== SetSession for: %s ===\n", userEmail)
	fmt.Printf("Store in SetSession: %p\n", Store)

	session, err := Store.Get(r, sessionName)
	if err != nil {
		return err
	}
	session.Values["user_email"] = userEmail
	session.Values["authenticated"] = true
	return session.Save(r, w)
}

func GetCurrentUser(w http.ResponseWriter, r *http.Request) {
	session, err := gothic.Store.Get(r, sessionName)
	if err != nil {
		fmt.Printf("Erreur session: %v\n", err)
		http.Error(w, "Session error", http.StatusInternalServerError)
		return
	}

	fmt.Printf("Session values: %+v\n", session.Values)

	authenticated, ok := session.Values["authenticated"].(bool)
	fmt.Printf("Authenticated: %v, OK: %v\n", authenticated, ok)

	if !ok || !authenticated {
		fmt.Println("Utilisateur non authentifié")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"authenticated": false,
		})
		return
	}

	userEmail, _ := session.Values["user_email"].(string)
	fmt.Printf("Utilisateur authentifié: %s\n", userEmail)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"authenticated": true,
		"email":         userEmail,
	})
}

func LogoutHandler(w http.ResponseWriter, r *http.Request) {
	session, err := gothic.Store.Get(r, sessionName)
	if err != nil {
		http.Error(w, "Session error", http.StatusInternalServerError)
		return
	}

	session.Values = make(map[interface{}]interface{})
	session.Options.MaxAge = -1

	err = session.Save(r, w)
	if err != nil {
		http.Error(w, "Erreur lors de la déconnexion", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"message": "Déconnecté avec succès"})
}
