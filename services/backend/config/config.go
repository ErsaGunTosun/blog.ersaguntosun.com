package config

import (
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

type Config struct {
	// Database
	DBPass string

	// Server
	ServerPort string

	// JWT
	JWTSecret string
	JWTExp    int
}

var Configs = initConfig()

func initConfig() Config {
	godotenv.Load("../../config/.env")
	return Config{
		DBPass:     getEnv("DB_PASS", "postgres"),
		ServerPort: getEnv("SERVER_PORT", "8080"),
		JWTSecret:  getEnv("JWT_SECRET,", "not-secret-key"),
		JWTExp:     int(getEnvInt("JWT_EXP", 3600*24)),
	}
}

func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}

func getEnvInt(key string, fallback int64) int64 {
	if value, ok := os.LookupEnv(key); ok {
		i, err := strconv.ParseInt(value, 10, 64)
		if err != nil {
			return fallback
		}

		return i
	}

	return fallback
}
