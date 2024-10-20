package post

import (
	"net/http"

	"github.com/gorilla/mux"
	"main.go/utils"
)

type PostHandler struct {
}

func NewHandler() *PostHandler {
	return &PostHandler{}
}

func (h *PostHandler) RegisterRoutes(router *mux.Router) {

	router.HandleFunc("/posts", utils.MakeHTTPHandleFunc(h.PostsHandler)).Methods("GET")
	router.HandleFunc("/posts", utils.MakeHTTPHandleFunc(h.CreatePostHandler)).Methods("POST")
	router.HandleFunc("/posts/{id}", utils.MakeHTTPHandleFunc(h.GetPostHandler)).Methods("GET")
	router.HandleFunc("/posts/{id}", utils.MakeHTTPHandleFunc(h.UpdatePostHandler)).Methods("PUT")
	router.HandleFunc("/posts/{id}", utils.MakeHTTPHandleFunc(h.DeletePostHandler)).Methods("DELETE")

}

func (h *PostHandler) PostsHandler(w http.ResponseWriter, r *http.Request) error {
	// Get all posts
	return nil
}

func (h *PostHandler) CreatePostHandler(w http.ResponseWriter, r *http.Request) error {
	// Create a post
	return nil
}

func (h *PostHandler) GetPostHandler(w http.ResponseWriter, r *http.Request) error {
	// Get a post by ID
	return nil
}

func (h *PostHandler) UpdatePostHandler(w http.ResponseWriter, r *http.Request) error {
	// Update a post by ID
	return nil
}

func (h *PostHandler) DeletePostHandler(w http.ResponseWriter, r *http.Request) error {
	// Delete a post by ID
	return nil
}
