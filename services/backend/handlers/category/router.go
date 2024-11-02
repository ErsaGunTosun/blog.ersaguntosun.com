package category

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"main.go/auth"
	"main.go/types"
	"main.go/utils"
)

type CategoryHandler struct {
	store types.CategoryStore
}

func NewHandler(s types.CategoryStore) *CategoryHandler {
	return &CategoryHandler{
		store: s,
	}
}

func (h *CategoryHandler) RegisterRoutes(router *mux.Router) {
	router.HandleFunc("/categories", h.CategoriesHandler).Methods("GET")
	router.HandleFunc("/categories", h.CreateCategoryHandler).Methods("POST")
	router.HandleFunc("/categories/{id}", h.GetCategoryHandler).Methods("GET")
	router.HandleFunc("/categories/{posID}", h.GetCategoryByPostIDHandler).Methods("Get")
	router.HandleFunc("/categories/{id}", h.UpdateCategoryHandler).Methods("PUT")
	router.HandleFunc("/categories/{id}", h.DeleteCategoryHandler).Methods("DELETE")
}

func (h *CategoryHandler) CategoriesHandler(w http.ResponseWriter, r *http.Request) {
	categories, err := h.store.GetCategories()

	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	utils.WriteJSON(w, http.StatusOK, categories)
}

func (h *CategoryHandler) CreateCategoryHandler(w http.ResponseWriter, r *http.Request) {
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

	var payload types.CreateCategoryPayload

	if err := utils.ParseJSON(r, &payload); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	err = h.store.CreateCategory(&types.Category{
		Name: payload.Name,
	})

	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	utils.WriteJSON(w, http.StatusCreated, nil)
}

func (h *CategoryHandler) GetCategoryHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, ok := vars["id"]

	if !ok {
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("missing category ID"))
		return
	}

	categoryID, err := strconv.Atoi(id)

	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("invalid category ID"))
		return
	}

	category, err := h.store.GetCategoryByID(categoryID)

	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	utils.WriteJSON(w, http.StatusOK, category)
}

func (h *CategoryHandler) GetCategoryByPostIDHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, ok := vars["postID"]

	if !ok {
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("missing post ID"))
		return
	}

	postID, err := strconv.Atoi(id)

	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("invalid post ID"))
		return
	}

	categories, err := h.store.GetCategoriesByPostID(postID)

	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	utils.WriteJSON(w, http.StatusOK, categories)
}

func (h *CategoryHandler) UpdateCategoryHandler(w http.ResponseWriter, r *http.Request) {
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

	var payload types.UpdateCategoryPayload
	vars := mux.Vars(r)
	id, ok := vars["id"]

	if !ok {
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("missing category ID"))
		return
	}

	if err := utils.ParseJSON(r, &payload); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	categoryID, err := strconv.Atoi(id)

	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("invalid category ID"))
		return
	}

	err = h.store.UpdateCategory(&types.Category{
		ID:   categoryID,
		Name: payload.Name,
	})

	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	utils.WriteJSON(w, http.StatusOK, nil)
}

func (h *CategoryHandler) DeleteCategoryHandler(w http.ResponseWriter, r *http.Request) {
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

	vars := mux.Vars(r)
	id, ok := vars["id"]

	if !ok {
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("missing category ID"))
		return
	}

	categoryID, err := strconv.Atoi(id)

	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("invalid category ID"))
		return
	}

	err = h.store.DeleteCategory(categoryID)

	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	utils.WriteJSON(w, http.StatusOK, nil)
}
