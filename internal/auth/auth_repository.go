package auth

import (
	"context"
	"project-dashboard/pkg/database"
)

func InsertUser(user User) error {
	ctx := context.Background()

	rows, err := database.DB.Query(ctx, "INSERT INTO users (username, email) VALUES ($1, $2) RETURNING id",
		user.Username, user.Email)
	if err != nil {
		return err
	}
	defer rows.Close()
	return nil
}

func GetUserByEmail(email string) (*User, error) {
	ctx := context.Background()

	row := database.DB.QueryRow(ctx, "SELECT username, email FROM users WHERE email = $1", email)
	var u User
	err := row.Scan(&u.Username, &u.Email, &u.Picture)
	if err != nil {
		return nil, err
	}
	return &u, nil
}
