package main

import (
	"log"

	"main.go/api"
	"main.go/database"
)

func main() {
	postgresDB, err := database.NewPostgresDB()
	if err != nil {
		log.Fatal(err)
	}

	server := api.NewAPIServer(":8080", postgresDB)
	server.Run()
}
