package handlers

import (
	"github.com/gorilla/mux"
	"main.go/utils"
)

type Handler struct {
}

func NewHandler() *Handler {
	return &Handler{}
}

func (h *Handler) RegisterRoutes(router *mux.Router) {

	router.HandleFunc("/posts", utils.MakeHTTPHandleFunc(h.PostsHandler)).Methods("GET")
	router.HandleFunc("/posts", utils.MakeHTTPHandleFunc(h.CreatePostHandler)).Methods("POST")
	router.HandleFunc("/posts/{id}", utils.MakeHTTPHandleFunc(h.GetPostHandler)).Methods("GET")
	router.HandleFunc("/posts/{id}", utils.MakeHTTPHandleFunc(h.UpdatePostHandler)).Methods("PUT")
	router.HandleFunc("/posts/{id}", utils.MakeHTTPHandleFunc(h.DeletePostHandler)).Methods("DELETE")

	router.HandleFunc("/comments/{postID}", utils.MakeHTTPHandleFunc(h.GetCommentHandler)).Methods("GET")
	router.HandleFunc("/comments/{postID}", utils.MakeHTTPHandleFunc(h.CreateCommentHandler)).Methods("POST")
	router.HandleFunc("/comments/{id}", utils.MakeHTTPHandleFunc(h.UpdateCommentHandler)).Methods("PUT")
	router.HandleFunc("/comments/{id}", utils.MakeHTTPHandleFunc(h.DeleteCommentHandler)).Methods("DELETE")

	router.HandleFunc("/auth/login", utils.MakeHTTPHandleFunc(h.loginHandler)).Methods("Post")
}
