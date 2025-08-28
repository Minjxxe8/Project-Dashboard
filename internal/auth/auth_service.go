package auth

import "log"

func VerifyUser(user *User) bool {
	existingUser, err := GetUserByEmail(user.Email)
	if existingUser == nil {
		err = InsertUser(*user)
		if err != nil {
			log.Println("Error inserting user:", err)
			return false
		}
		return true
	}
	return true
}
