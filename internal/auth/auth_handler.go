package auth

import (
	"context"
	"fmt"
	"github.com/go-chi/chi/v5"
	"github.com/markbates/goth/gothic"
	"net/http"
)

func GetAuthCallback(w http.ResponseWriter, r *http.Request) {
	fmt.Println("get callback")
	provider := chi.URLParam(r, "provider")

	r = r.WithContext(context.WithValue(r.Context(), "provider", provider))

	user, err := gothic.CompleteUserAuth(w, r)
	if err != nil {
		fmt.Printf("Erreur d'authentification: %v\n", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	fmt.Println(user)

	userModel := User{
		Email:    user.Email,
		Username: user.UserID,
		Picture:  user.AvatarURL,
	}
	fmt.Printf("Utilisateur: %+v\n", userModel)
	fmt.Printf("Provider: %s\n", user.Provider)

	if !VerifyUser(&userModel) {
		http.Error(w, "Erreur lors de la vérification de l'utilisateur", http.StatusInternalServerError)
		return
	}

	err = SetSession(w, r, userModel.Email)
	if err != nil {
		fmt.Printf("Erreur lors de la création de la session: %v\n", err)
		http.Error(w, "Error when creating session", http.StatusInternalServerError)
		return
	}
	fmt.Println(userModel.Email)

	http.Redirect(w, r, "http://localhost:5173", http.StatusFound)

}

func GoogleAuthInitHandler(w http.ResponseWriter, r *http.Request) {
	provider := chi.URLParam(r, "provider")
	r = r.WithContext(context.WithValue(r.Context(), "provider", provider))

	gothic.BeginAuthHandler(w, r)
}
