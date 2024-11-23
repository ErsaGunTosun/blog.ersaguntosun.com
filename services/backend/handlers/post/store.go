package post

import (
	"main.go/database"
	"main.go/types"
)

type PostStore struct {
	db *database.PostgresDB
}

func NewStore(db *database.PostgresDB) *PostStore {
	return &PostStore{db: db}
}

func (s *PostStore) GetPosts() ([]*types.Post, error) {
	return s.db.GetPostsDB()
}

func (s *PostStore) GetPostByID(id int) (*types.Post, error) {
	return s.db.GetPostByIDDB(id)
}

func (s *PostStore) CreatePost(post *types.Post) (int, error) {
	return s.db.CreatePostDB(post)
}

func (s *PostStore) UpdatePost(post *types.Post) error {
	return s.db.UpdatePostByIDDB(post)
}

func (s *PostStore) DeletePost(id int) error {
	return s.db.DeletePostByIDDB(id)
}

func (s *PostStore) GetUserByID(userID int) (*types.User, error) {
	return s.db.GetUserByIDDB(userID)
}

// category
func (s *PostStore) CreateCategory(category *types.Category) (int, error) {
	return s.db.CreateCategoryDB(category)
}

func (s *PostStore) GetCategoryByName(name string) (*types.Category, error) {
	return s.db.GetCategoryByNameDB(name)
}

func (s *PostStore) AddCategoryToPost(postID, categoryID int) error {
	return s.db.AddCategoryToPostDB(postID, categoryID)
}
