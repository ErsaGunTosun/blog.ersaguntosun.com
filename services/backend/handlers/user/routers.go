package user

import (
	"fmt"
	"net/http"

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
