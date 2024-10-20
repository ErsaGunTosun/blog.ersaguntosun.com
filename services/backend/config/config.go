package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	// Database
	DBPass string

	// Server
	ServerPort string
}

var Configs = initConfig()

func initConfig() Config {
	godotenv.Load("../../config/.env")
	return Config{
		DBPass:     getEnv("DB_PASS", "postgres"),
		ServerPort: getEnv("SERVER_PORT", "8080"),
	}
}

func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}
