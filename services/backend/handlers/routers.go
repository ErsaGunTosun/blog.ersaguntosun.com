package handlers

import (
	"net/http"

	"github.com/gorilla/mux"
)

type Handler struct {
}
type apiFunc func(w http.ResponseWriter, r *http.Request) error

func NewHandler() *Handler {
	return &Handler{}
}

func MakeHTTPHandleFunc(f apiFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if err := f(w, r); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	}
}

func (h *Handler) RegisterRoutes(router *mux.Router) {

	router.HandleFunc("/posts", MakeHTTPHandleFunc(h.PostsHandler)).Methods("GET")
	router.HandleFunc("/posts", MakeHTTPHandleFunc(h.CreatePostHandler)).Methods("POST")
	router.HandleFunc("/posts/{id}", MakeHTTPHandleFunc(h.GetPostHandler)).Methods("GET")
	router.HandleFunc("/posts/{id}", MakeHTTPHandleFunc(h.UpdatePostHandler)).Methods("PUT")
	router.HandleFunc("/posts/{id}", MakeHTTPHandleFunc(h.DeletePostHandler)).Methods("DELETE")

	router.HandleFunc("/comments/{postID}", MakeHTTPHandleFunc(h.GetCommentHandler)).Methods("GET")
	router.HandleFunc("/comments/{postID}", MakeHTTPHandleFunc(h.CreateCommentHandler)).Methods("POST")
	router.HandleFunc("/comments/{id}", MakeHTTPHandleFunc(h.UpdateCommentHandler)).Methods("PUT")
	router.HandleFunc("/comments/{id}", MakeHTTPHandleFunc(h.DeleteCommentHandler)).Methods("DELETE")

	router.HandleFunc("/auth/login", MakeHTTPHandleFunc(h.loginHandler)).Methods("Post")
}
