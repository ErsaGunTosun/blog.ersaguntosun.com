package comment

import (
	"net/http"

	"github.com/gorilla/mux"
	"main.go/utils"
)

type CommentHandler struct {
}

func NewHandler() *CommentHandler {
	return &CommentHandler{}
}

func (h *CommentHandler) RegisterRoutes(router *mux.Router) {

	router.HandleFunc("/comments/{postID}", utils.MakeHTTPHandleFunc(h.GetCommentHandler)).Methods("GET")
	router.HandleFunc("/comments/{postID}", utils.MakeHTTPHandleFunc(h.CreateCommentHandler)).Methods("POST")
	router.HandleFunc("/comments/{id}", utils.MakeHTTPHandleFunc(h.UpdateCommentHandler)).Methods("PUT")
	router.HandleFunc("/comments/{id}", utils.MakeHTTPHandleFunc(h.DeleteCommentHandler)).Methods("DELETE")

}

func (h *CommentHandler) GetCommentHandler(w http.ResponseWriter, r *http.Request) error {
	// Get all comments for a post
	return nil
}

func (h *CommentHandler) CreateCommentHandler(w http.ResponseWriter, r *http.Request) error {
	// Create a comment for a post
	return nil
}

func (h *CommentHandler) UpdateCommentHandler(w http.ResponseWriter, r *http.Request) error {
	// Update a comment by ID
	return nil
}

func (h *CommentHandler) DeleteCommentHandler(w http.ResponseWriter, r *http.Request) error {
	// Delete a comment by ID
	return nil
}
