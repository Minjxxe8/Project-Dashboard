package auth

import (
	"fmt"
	"github.com/gorilla/sessions"
	"github.com/joho/godotenv"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/google"
	"log"
	"net/http"
	"os"
)

const (
	sessionKey  = "RandomKeyForAuth"
	MaxAge      = 86400 * 30
	isProd      = false
	sessionName = "DashboardSession"
)

var Store *sessions.CookieStore

func NewAuth() {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Printf("Erreur loading .env: %v\n", err)
		log.Fatal("Error loading .env")
	}

	googleClientID := os.Getenv("GOOGLE_CLIENT_ID")
	googleClientSecret := os.Getenv("GOOGLE_CLIENT_SECRET")

	if googleClientID == "" {
		log.Fatal("GOOGLE_CLIENT_ID est vide")
	}
	if googleClientSecret == "" {
		log.Fatal("GOOGLE_CLIENT_SECRET est vide")
	}

	Store = sessions.NewCookieStore([]byte(sessionKey))

	if Store == nil {
		log.Fatal("ERREUR CRITIQUE: Store est nil après création")
	}

	Store.MaxAge(MaxAge)
	Store.Options.Path = "/"
	Store.Options.HttpOnly = true
	Store.Options.Secure = isProd
	Store.Options.SameSite = http.SameSiteLaxMode

	gothic.Store = Store

	goth.UseProviders(
		google.New(googleClientID, googleClientSecret, "http://localhost:8080/auth/google/callback", "email"))
}
