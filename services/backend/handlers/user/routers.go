package user

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/gorilla/mux"
	"main.go/auth"
	"main.go/config"
	"main.go/types"
	"main.go/utils"
)

type UserHandler struct {
	store types.UserStore
}

func NewHandler(s types.UserStore) *UserHandler {
	return &UserHandler{
		store: s,
	}
}

func (h *UserHandler) RegisterRoutes(router *mux.Router) {
	router.HandleFunc("/auth/login", h.loginHandler).Methods(http.MethodPost)
	router.HandleFunc("/auth/register", h.registerHandler).Methods(http.MethodPost)
	router.HandleFunc("/auth/verify", h.verifyHandler).Methods(http.MethodGet)
	router.HandleFunc("/auth/logout", h.logoutHandler).Methods(http.MethodGet)
}

func (h *UserHandler) loginHandler(w http.ResponseWriter, r *http.Request) {
	var payload types.LoginUserPayload

	if err := utils.ParseJSON(r, &payload); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	user, err := h.store.GetUserByEmail(payload.Email)
	if err != nil {
		utils.WriteError(w, http.StatusNotFound, fmt.Errorf("not found invalid emial or password"))
		return
	}

	if !utils.CheckPasswordHash(payload.Password, user.Password) {
		utils.WriteError(w, http.StatusUnauthorized, fmt.Errorf("not found invalid emial or password"))
		return
	}

	secret := []byte(config.Configs.JWTSecret)
	token, err := auth.CreateJWT(secret, user.ID)

	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	cookie := &http.Cookie{
		Name:     "token",
		Value:    token,
		Expires:  time.Now().Add(time.Second * time.Duration(config.Configs.JWTExp)),
		HttpOnly: true,
		Secure:   true,
		Path:     "/",
	}
	http.SetCookie(w, cookie)
	r.AddCookie(cookie)

	utils.WriteJSON(w, http.StatusOK, map[string]string{"token": token})
}

func (h *UserHandler) registerHandler(w http.ResponseWriter, r *http.Request) {

	var payload types.RegisterUserPayload

	if err := utils.ParseJSON(r, &payload); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	_, err := h.store.GetUserByEmail(payload.Email)

	if err == nil {
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("user with email %s already exists", payload.Email))
		return
	}

	hashedPassword, err := utils.HashPassword(payload.Password)
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	err = h.store.CreateUser(&types.User{
		Username: payload.Username,
		Email:    payload.Email,
		Password: hashedPassword,
		Role:     "user",
	})

	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	utils.WriteJSON(w, http.StatusCreated, nil)
}

func (h *UserHandler) verifyHandler(w http.ResponseWriter, r *http.Request) {
	headerToken := r.Header.Get("Authorization")
	cookieToken, err := r.Cookie("token")
	if err != nil {
		utils.WriteError(w, http.StatusUnauthorized, fmt.Errorf("not authorized"))
		return
	}

	if headerToken != cookieToken.Value {
		utils.WriteError(w, http.StatusUnauthorized, fmt.Errorf("not authorized"))

		return
	}

	token, err := auth.ValidateJWT(cookieToken.Value)

	if err != nil {
		utils.WriteError(w, http.StatusUnauthorized, fmt.Errorf("not authorized"))

		return
	}
	if !token.Valid {
		utils.WriteError(w, http.StatusUnauthorized, fmt.Errorf("not authorized"))

		return
	}

	claims := token.Claims.(jwt.MapClaims)
	str := claims["userID"].(string)
	userID, err := strconv.Atoi(str)

	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		utils.DeleteToken(w)
		return
	}

	_, err = h.store.GetUserByID(userID)

	if err != nil {
		utils.WriteError(w, http.StatusUnauthorized, fmt.Errorf("not authorized"))
		utils.DeleteToken(w)
		return
	}

	utils.WriteJSON(w, http.StatusOK, nil)
}

func (h *UserHandler) logoutHandler(w http.ResponseWriter, r *http.Request) {
	utils.DeleteToken(w)
}
