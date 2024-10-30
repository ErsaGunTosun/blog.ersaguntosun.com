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
	// Get a post by ID
	return nil, nil
}

func (s *PostStore) CreatePost(post *types.Post) error {
	return s.db.CreatePostDB(post)
}

func (s *PostStore) UpdatePost(post *types.Post) error {
	// Update a post by ID
	return nil
}

func (s *PostStore) DeletePost(id int) error {
	// Delete a post by ID
	return nil
}

func (s *PostStore) GetUserByID(userID int) (*types.User, error) {
	return s.db.GetUserByIDDB(userID)
}
