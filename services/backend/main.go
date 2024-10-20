package main

import (
	"log"

	"main.go/api"
	"main.go/config"
	"main.go/database"
)

func main() {
	postgresDB, err := database.NewPostgresDB()
	if err != nil {
		log.Fatal(err)
	}

	if err := postgresDB.Init(); err != nil {
		log.Fatal(err)
	}

	server := api.NewAPIServer(config.Configs.ServerPort, postgresDB)
	server.Run()
}
