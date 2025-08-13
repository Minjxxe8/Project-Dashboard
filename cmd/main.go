// main.go
package main

import (
	Project_Dashboard "project-dashboard"
	"project-dashboard/pkg/database"
)

func main() {
	database.Init()
	Project_Dashboard.RunServer(database.DB)
}
