package auth

type User struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Picture  string `json:"picture"`
}
