package post

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"main.go/auth"
	"main.go/types"
	"main.go/utils"
)

type PostHandler struct {
	store types.PostStore
}

func NewHandler(s types.PostStore) *PostHandler {
	return &PostHandler{
		store: s,
	}
}

func (h *PostHandler) RegisterRoutes(router *mux.Router) {
	router.HandleFunc("/posts", h.PostsHandler).Methods("GET")
	router.HandleFunc("/posts", h.CreatePostHandler).Methods("POST")
	router.HandleFunc("/posts/{id}", h.GetPostHandler).Methods("GET")
	router.HandleFunc("/posts/{id}", h.UpdatePostHandler).Methods("PUT")
	router.HandleFunc("/posts/{id}", h.DeletePostHandler).Methods("DELETE")

}

func (h *PostHandler) PostsHandler(w http.ResponseWriter, r *http.Request) {
	posts, err := h.store.GetPosts()

	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	utils.WriteJSON(w, http.StatusOK, posts)
}

func (h *PostHandler) CreatePostHandler(w http.ResponseWriter, r *http.Request) {
	userID, err := auth.AuthUserJWT(w, r)

	if err != nil {
		utils.WriteError(w, http.StatusUnauthorized, err)
		utils.DeleteToken(w)
		return
	}

	_, err = h.store.GetUserByID(userID)

	if err != nil {
		utils.WriteError(w, http.StatusUnauthorized, fmt.Errorf("unauthorized"))
		utils.DeleteToken(w)
		return
	}

	//
	var payload types.CreatePostPayload

	if err := utils.ParseJSON(r, &payload); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	err = h.store.CreatePost(&types.Post{
		Title:    payload.Title,
		Content:  payload.Content,
		AuthorID: userID,
	})

	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	utils.WriteJSON(w, http.StatusCreated, nil)

}

func (h *PostHandler) GetPostHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, ok := vars["id"]

	if !ok {
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("missing post ID"))
		return
	}

	postID, err := strconv.Atoi(id)
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("invalid product ID"))
		return
	}

	post, err := h.store.GetPostByID(postID)

	if err != nil {
		utils.WriteError(w, http.StatusNotFound, err)
		return
	}

	utils.WriteJSON(w, http.StatusOK, post)
}

func (h *PostHandler) UpdatePostHandler(w http.ResponseWriter, r *http.Request) {
	userID, err := auth.AuthUserJWT(w, r)

	if err != nil {
		utils.WriteError(w, http.StatusUnauthorized, err)
		utils.DeleteToken(w)
		return
	}

	_, err = h.store.GetUserByID(userID)

	if err != nil {
		utils.WriteError(w, http.StatusUnauthorized, fmt.Errorf("unauthorized"))
		utils.DeleteToken(w)
		return
	}

	//
	vars := mux.Vars(r)
	id, ok := vars["id"]

	if !ok {
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("missing post ID"))
		return
	}

	postID, err := strconv.Atoi(id)
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("invalid post ID"))
		return
	}

	var payload types.UpdatePostPayload

	if err := utils.ParseJSON(r, &payload); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	err = h.store.UpdatePost(&types.Post{
		ID:      postID,
		Title:   payload.Title,
		Content: payload.Content,
	})
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	utils.WriteJSON(w, http.StatusCreated, nil)

}

func (h *PostHandler) DeletePostHandler(w http.ResponseWriter, r *http.Request) {
	userID, err := auth.AuthUserJWT(w, r)

	if err != nil {
		utils.WriteError(w, http.StatusUnauthorized, err)
		utils.DeleteToken(w)
		return
	}

	_, err = h.store.GetUserByID(userID)

	if err != nil {
		utils.WriteError(w, http.StatusUnauthorized, fmt.Errorf("unauthorized"))
		utils.DeleteToken(w)
		return
	}

	//
	vars := mux.Vars(r)
	id, ok := vars["id"]

	if !ok {
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("missing post ID"))
		return
	}

	postID, err := strconv.Atoi(id)
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("invalid post ID"))
		return
	}

	err = h.store.DeletePost(postID)

	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	utils.WriteJSON(w, http.StatusOK, nil)
}
