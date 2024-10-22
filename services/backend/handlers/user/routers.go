package user

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
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
	router.HandleFunc("/auth/login", utils.MakeHTTPHandleFunc(h.loginHandler)).Methods(http.MethodPost)
	router.HandleFunc("/auth/register", utils.MakeHTTPHandleFunc(h.registerHandler)).Methods(http.MethodPost)
}

func (h *UserHandler) loginHandler(w http.ResponseWriter, r *http.Request) error {
	// Get all comments for a post
	return nil
}

func (h *UserHandler) registerHandler(w http.ResponseWriter, r *http.Request) error {

	var payload types.RegisterUserPayload

	if err := utils.ParseJSON(r, &payload); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		log.Println(err)
		return err
	}

	_, err := h.store.GetUserByEmail(payload.Email)

	if err == nil {
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("user with email %s already exists", payload.Email))
		return err
	}

	hashedPassword, err := utils.HashPassword(payload.Password)
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return err
	}

	err = h.store.CreateUser(&types.User{
		Username: payload.Username,
		Email:    payload.Email,
		Password: hashedPassword,
		Role:     "user",
	})

	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return err
	}

	utils.WriteJSON(w, http.StatusCreated, nil)
	return nil
}
