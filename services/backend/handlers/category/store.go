package category

import (
	"main.go/database"
	"main.go/types"
)

type CategoryStore struct {
	db *database.PostgresDB
}

func NewStore(db *database.PostgresDB) *CategoryStore {
	return &CategoryStore{db: db}
}

func (s *CategoryStore) GetCategories() ([]*types.Category, error) {
	return s.db.GetCategoriesDB()
}

func (s *CategoryStore) GetCategoryByID(id int) (*types.Category, error) {
	return s.db.GetCategoryByIDDB(id)
}

func (s *CategoryStore) CreateCategory(category *types.Category) error {
	return s.db.CreateCategoryDB(category)
}

func (s *CategoryStore) UpdateCategory(category *types.Category) error {
	return s.db.UpdateCategoryByIDDB(category)
}

func (s *CategoryStore) DeleteCategory(id int) error {
	return s.db.DeleteCategoryByIDDB(id)
}

func (s *CategoryStore) GetCategoriesByPostID(postID int) ([]*types.Category, error) {
	return s.db.GetCategoriesByPostIDDB(postID)
}

func (s *CategoryStore) GetPostsByCategoryID(categoryID int) ([]*types.Post, error) {
	return s.db.GetPostsByCategoryIDDB(categoryID)
}
func (s *CategoryStore) AddCategoryToPost(postID, categoryID int) error {
	return s.db.AddCategoryToPostDB(postID, categoryID)
}

func (s *CategoryStore) RemoveCategoryFromPost(postID, categoryID int) error {
	return s.db.RemoveCategoryFromPostDB(postID, categoryID)
}

func (s *CategoryStore) GetUserByID(userID int) (*types.User, error) {
	return s.db.GetUserByIDDB(userID)
}
