package user

import (
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
	router.HandleFunc("/auth/login", utils.MakeHTTPHandleFunc(h.loginHandler)).Methods("Post")
}

func (h *UserHandler) loginHandler(w http.ResponseWriter, r *http.Request) error {
	// Get all comments for a post
	return nil
}
