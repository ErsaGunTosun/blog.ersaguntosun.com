package auth

import (
	"fmt"
	"net/http"
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

func ValidateJWT(tokenString string) (*jwt.Token, error) {
	return jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(config.Configs.JWTSecret), nil
	})
}

func AuthUserJWT(w http.ResponseWriter, r *http.Request) (int, error) {
	headerToken := r.Header.Get("Authorization")
	cookieToken, err := r.Cookie("token")
	if err != nil {
		return 0, fmt.Errorf("unauthorized")
	}

	if headerToken != cookieToken.Value {
		return 0, fmt.Errorf("unauthorized")
	}

	token, err := ValidateJWT(cookieToken.Value)

	if err != nil {
		return 0, fmt.Errorf("unauthorized")
	}
	if !token.Valid {
		return 0, fmt.Errorf("unauthorized")
	}
	claims := token.Claims.(jwt.MapClaims)
	str := claims["userID"].(string)
	userID, err := strconv.Atoi(str)

	if err != nil {
		return 0, fmt.Errorf("unauthorized")
	}

	return userID, nil
}
