package auth

import (
	"strconv"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"main.go/config"
)

func CreateJWT(secret []byte, userID int) (string, error) {
	expiration := time.Second * time.Duration(config.Configs.JWTExp)

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userID":    strconv.Itoa(int(userID)),
		"expiresAt": time.Now().Add(expiration).Unix(),
	})

	tokenString, err := token.SignedString(secret)
	if err != nil {
		return "", err
	}

	return tokenString, err
}
